import crypto from "crypto";

// Every order created by the treatments page carries this in its notes. The Razorpay account
// may be shared with other sites, so the webhook uses it to ignore their payments.
export const TREATMENTS_FORM = "treatments";

export function razorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return keyId && keySecret ? { keyId, keySecret } : null;
}

/** Booking fee in rupees, set on the server so it cannot be tampered with from the browser. */
export function bookingFeeRupees() {
  const rupees = Number(process.env.RAZORPAY_SESSION_AMOUNT);
  return Number.isFinite(rupees) && rupees > 0 ? rupees : null;
}

export function basicAuth(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

/** Constant-time check of a Razorpay HMAC-SHA256 signature. */
export function hmacMatches(data: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
}

export async function fetchPayment(paymentId: string, keyId: string, keySecret: string): Promise<RazorpayPayment> {
  const res = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: basicAuth(keyId, keySecret) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Razorpay HTTP ${res.status}`);
  return res.json();
}

export const paiseToRupees = (paise: number) => (paise / 100).toFixed(2);
