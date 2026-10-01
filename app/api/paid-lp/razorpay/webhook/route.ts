export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PAID_LP_FORM, RazorpayPayment, hmacMatches, paiseToRupees } from "@/lib/razorpay";
import { createdOnStamp, postToTeleCRM } from "@/lib/telecrm";

/**
 * Razorpay calls this server-to-server once a payment settles. It is the reliable
 * half of the flow: the browser callback is lost if the visitor closes the tab
 * mid-payment, but this still fires, so every paid booking reaches the DB and TeleCRM.
 *
 * Configure in Razorpay → Settings → Webhooks:
 *   URL     https://<your-domain>/api/paid-lp/razorpay/webhook
 *   Secret  RAZORPAY_WEBHOOK_SECRET
 *   Events  payment.captured, payment.failed
 */

function crmPayload(payment: RazorpayPayment, paid: boolean) {
  const notes = payment.notes ?? {};
  const amount = `${payment.currency} ${paiseToRupees(payment.amount)}`;
  const phone = (notes.phone || payment.contact || "").replace(/\D/g, "").slice(-10);
  const status = paid ? "Paid" : "Payment Failed";

  return {
    fields: {
      Id: "",
      name: notes.name || "Razorpay customer",
      email: payment.email || "",
      phone,
      city_1: notes.branch || "",
      Country: "India",
      LeadID: "",
      CreatedOn: createdOnStamp(),
      "Lead Stage": paid ? "Booking Fee Paid" : "Booking Payment Failed",
      "Lead Status": "new",
      "Lead Request Type": "consultation-payment",
      PageName: notes.source || PAID_LP_FORM,
      Source_URL: notes.source || "",
      Area_of_Pain: notes.painConcern || "",
      FormName: PAID_LP_FORM,
      Lead_Source: notes.source || "",
      Source: notes.source || "",
    },
    actions: [
      { type: "SYSTEM_NOTE", text: `Booking payment: ${status} – ${amount}` },
      { type: "SYSTEM_NOTE", text: `Razorpay Payment ID: ${payment.id}` },
      { type: "SYSTEM_NOTE", text: `Razorpay Order ID: ${payment.order_id}` },
      { type: "SYSTEM_NOTE", text: `Method: ${payment.method || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Preferred Branch: ${notes.branch || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Website Lead ID: ${notes.leadId || "Not specified"}` },
    ],
  };
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Razorpay webhook] RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  // The signature covers the exact bytes Razorpay sent, so read raw text before parsing.
  const rawBody = await req.text();
  if (!hmacMatches(rawBody, signature, secret)) {
    console.error("[Razorpay webhook] Signature mismatch — request rejected");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const event = body.event || "";
  const payment = body.payload?.payment?.entity;

  // Acknowledge everything we don't act on with 200 so Razorpay stops retrying —
  // including payments from other sites sharing this Razorpay account.
  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json({ received: true, ignored: event });
  }
  if (!payment?.id || payment.notes?.form !== PAID_LP_FORM) {
    return NextResponse.json({ received: true, ignored: "not a paid-lp payment" });
  }

  const paid = event === "payment.captured";

  let db: "ok" | "failed" | "skipped" = "skipped";
  if (paid && payment.notes?.leadId) {
    try {
      await prisma.lead.updateMany({
        where: { id: payment.notes.leadId, formName: PAID_LP_FORM },
        data: { status: "CONVERTED" },
      });
      db = "ok";
    } catch (err) {
      db = "failed";
      console.error("[Razorpay webhook DB] Error:", err instanceof Error ? err.message : err);
    }
  }

  let crm: "ok" | "failed" = "ok";
  try {
    await postToTeleCRM(crmPayload(payment, paid));
  } catch (err) {
    crm = "failed";
    console.error("[Razorpay webhook TeleCRM] Error:", err instanceof Error ? err.message : err);
  }

  // Always 200 on a verified event; an error would make Razorpay retry and duplicate records.
  return NextResponse.json({ received: true, event, paymentId: payment.id, db, crm });
}
