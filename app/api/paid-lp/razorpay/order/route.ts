export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PAID_LP_FORM, basicAuth, bookingFeeRupees, razorpayKeys } from "@/lib/razorpay";

const NOT_CONFIGURED = "Online payment is not available right now. Please call us to book.";

// Creates a Razorpay order for a lead the paid LP form has already saved. The amount
// comes from the server env and the payer details from the database, never the browser.
export async function POST(req: NextRequest) {
  const keys = razorpayKeys();
  const fee = bookingFeeRupees();
  if (!keys || fee === null) {
    console.error("[Razorpay order] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET / RAZORPAY_SESSION_AMOUNT not set");
    return NextResponse.json({ error: NOT_CONFIGURED }, { status: 500 });
  }

  let leadId = "";
  try {
    const body = await req.json();
    if (typeof body?.leadId === "string") leadId = body.leadId.slice(0, 40);
  } catch {
    // handled below
  }

  const lead = leadId
    ? await prisma.lead.findFirst({ where: { id: leadId, formName: PAID_LP_FORM } })
    : null;
  if (!lead) {
    return NextResponse.json({ error: "Please submit the booking form first." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: basicAuth(keys.keyId, keys.keySecret), "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(fee * 100),
        currency: "INR",
        receipt: `ao_${lead.id}`.slice(0, 40), // Razorpay caps receipt at 40 chars
        notes: {
          product: "Ayush Ortho Appointment Booking",
          form: PAID_LP_FORM,
          leadId: lead.id,
          name: lead.name,
          phone: lead.phone,
          painConcern: lead.areaOfPain ?? "",
          branch: lead.city ?? "",
          source: (lead.source ?? "").slice(0, 200),
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const order = await res.json();
    if (!res.ok) throw new Error(order?.error?.description || `Razorpay HTTP ${res.status}`);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keys.keyId, // publishable key — safe to expose to the browser
      prefill: { name: lead.name, contact: `+91${lead.phone}` },
    });
  } catch (err) {
    console.error("[Razorpay order] Error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
