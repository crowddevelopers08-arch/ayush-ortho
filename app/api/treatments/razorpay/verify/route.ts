export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { syncPaymentToTeleCRM } from "@/lib/treatments-payment-crm";
import { TREATMENTS_FORM, fetchPayment, hmacMatches, razorpayKeys } from "@/lib/razorpay";

const UNVERIFIED = "We could not verify this payment. If money was deducted, please call us.";

// Called by the browser after Razorpay Checkout succeeds. Razorpay signs
// `order_id|payment_id` with the key secret; recomputing it proves the callback
// was not faked. The lead to update is read from the order's notes, not the request.
export async function POST(req: NextRequest) {
  const keys = razorpayKeys();
  if (!keys) return NextResponse.json({ error: "Payments are not configured." }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
  const orderId = read("razorpay_order_id");
  const paymentId = read("razorpay_payment_id");
  const signature = read("razorpay_signature");

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Incomplete payment details." }, { status: 400 });
  }

  if (!hmacMatches(`${orderId}|${paymentId}`, signature, keys.keySecret)) {
    console.error("[Razorpay verify] Signature mismatch for order", orderId);
    return NextResponse.json({ verified: false, error: UNVERIFIED }, { status: 400 });
  }

  try {
    const payment = await fetchPayment(paymentId, keys.keyId, keys.keySecret);
    if (payment.order_id !== orderId || payment.notes?.form !== TREATMENTS_FORM) {
      return NextResponse.json({ verified: false, error: UNVERIFIED }, { status: 400 });
    }
    if (payment.status !== "captured" && payment.status !== "authorized") {
      return NextResponse.json({ verified: false, error: `Payment is ${payment.status}. Please try again.` }, { status: 400 });
    }

    // Idempotent: the webhook may already have marked this lead.
    if (payment.notes?.leadId) {
      await prisma.lead.updateMany({
        where: { id: payment.notes.leadId, formName: TREATMENTS_FORM },
        data: { status: "CONVERTED" },
      });
    }
  } catch (err) {
    // The signature already proves the payment is genuine, so don't fail the visitor
    // over a lookup or database error — the webhook will update the lead.
    console.error("[Razorpay verify] Post-verification update failed:", err instanceof Error ? err.message : err);
  }

  // Send the payment details to TeleCRM now rather than relying only on the webhook,
  // which never reaches localhost and is lost if it isn't configured.
  try {
    await syncPaymentToTeleCRM(paymentId);
  } catch (err) {
    console.error("[Razorpay verify] TeleCRM payment sync failed:", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ verified: true, paymentId, orderId });
}
