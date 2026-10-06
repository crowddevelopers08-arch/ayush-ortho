import { TREATMENTS_FORM, basicAuth, paiseToRupees, razorpayKeys } from "@/lib/razorpay";
import { createdOnStamp, postToTeleCRM } from "@/lib/telecrm";

// Set on the Razorpay payment's notes once its details are in TeleCRM, so the
// verify route and the webhook (which can both see the same payment) never post twice.
const CRM_SYNCED_NOTE = "crm_synced";

interface FullPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  vpa?: string | null;
  bank?: string | null;
  wallet?: string | null;
  fee?: number | null;
  tax?: number | null;
  international?: boolean;
  created_at?: number;
  error_description?: string | null;
  error_reason?: string | null;
  card?: { network?: string; last4?: string; type?: string; issuer?: string | null } | null;
  acquirer_data?: Record<string, string | null>;
  notes?: Record<string, string>;
}

async function razorpay(path: string, init?: RequestInit) {
  const keys = razorpayKeys();
  if (!keys) throw new Error("Razorpay keys are not set");
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: { Authorization: basicAuth(keys.keyId, keys.keySecret), "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Razorpay HTTP ${res.status}`);
  return res.json();
}

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const istTime = (unix?: number) =>
  unix
    ? new Date(unix * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })
    : "";

/** How the visitor paid, e.g. "upi (name@okhdfc)" or "card (Visa •••• 1234, credit)". */
function methodDetail(p: FullPayment) {
  const method = p.method || "Not specified";
  if (p.method === "upi" && p.vpa) return `${method} (${p.vpa})`;
  if (p.method === "card" && p.card) {
    const card = [p.card.network, p.card.last4 && `•••• ${p.card.last4}`].filter(Boolean).join(" ");
    return `${method} (${[card, p.card.type].filter(Boolean).join(", ")})`;
  }
  if (p.method === "netbanking" && p.bank) return `${method} (${p.bank})`;
  if (p.method === "wallet" && p.wallet) return `${method} (${p.wallet})`;
  return method;
}

function crmPayload(p: FullPayment) {
  const notes = p.notes ?? {};
  const paid = p.status === "captured" || p.status === "authorized";
  const amount = `${p.currency} ${paiseToRupees(p.amount)}`;
  // Same 10-digit number as the original lead, so TeleCRM files this under that lead.
  const phone = (notes.phone || p.contact || "").replace(/\D/g, "").slice(-10);
  const email = notes.email || p.email || "";
  const acquirer = p.acquirer_data ?? {};
  const reference = acquirer.upi_transaction_id || acquirer.rrn || acquirer.bank_transaction_id || acquirer.auth_code;

  const lines = [
    `Payment status: ${titleCase(p.status)}`,
    `Amount: ${amount}`,
    `Name: ${notes.name || "Not specified"}`,
    `Phone: ${phone ? `+91${phone}` : "Not specified"}`,
    `Email: ${email || "Not specified"}`,
    `Razorpay Payment ID: ${p.id}`,
    `Razorpay Order ID: ${p.order_id}`,
    `Method: ${methodDetail(p)}`,
    reference && `Bank Reference: ${reference}`,
    p.created_at && `Paid On: ${istTime(p.created_at)}`,
    typeof p.fee === "number" && `Razorpay Fee: ${p.currency} ${paiseToRupees(p.fee)}${typeof p.tax === "number" ? ` (incl. GST ${paiseToRupees(p.tax)})` : ""}`,
    !paid && p.error_description && `Failure Reason: ${p.error_description}`,
    `Pain Concern: ${notes.painConcern || "Not specified"}`,
    `Preferred Branch: ${notes.branch || "Not specified"}`,
    `Lead Source: ${notes.source || "Not specified"}`,
  ].filter(Boolean) as string[];

  return {
    fields: {
      Id: "",
      name: notes.name || "Razorpay customer",
      email,
      phone,
      city_1: notes.branch || "",
      Country: "India",
      LeadID: "",
      CreatedOn: createdOnStamp(),
      "Lead Stage": "",
      "Lead Status": "new",
      "Lead Request Type": "consultation-payment",
      PageName: notes.source || TREATMENTS_FORM,
      Source_URL: notes.source || "",
      Area_of_Pain: notes.painConcern || "",
      FormName: TREATMENTS_FORM,
      Lead_Source: notes.source || "",
      Source: notes.source || "",
    },
    // Same order as the other Razorpay leads in TeleCRM (it shows the last note on top).
    actions: lines.map((text) => ({ type: "SYSTEM_NOTE", text })),
  };
}

/**
 * Sends one treatments-page payment to TeleCRM with every useful detail from
 * Razorpay. Safe to call from both the verify route and the webhook: it re-reads
 * the payment and skips it if already synced.
 */
export async function syncPaymentToTeleCRM(paymentId: string): Promise<"ok" | "skipped" | "not-ours"> {
  const payment: FullPayment = await razorpay(`/payments/${encodeURIComponent(paymentId)}?expand[]=card`);
  if (payment.notes?.form !== TREATMENTS_FORM) return "not-ours";
  if (payment.notes?.[CRM_SYNCED_NOTE] === "1") return "skipped";

  await postToTeleCRM(crmPayload(payment));

  try {
    // Razorpay replaces the whole notes object, so send the existing notes back too.
    await razorpay(`/payments/${encodeURIComponent(paymentId)}`, {
      method: "PATCH",
      body: JSON.stringify({ notes: { ...payment.notes, [CRM_SYNCED_NOTE]: "1" } }),
    });
  } catch (err) {
    // Worst case the other path posts the same notes again; the payment itself is fine.
    console.error("[TeleCRM payment sync] Could not mark payment as synced:", err instanceof Error ? err.message : err);
  }
  return "ok";
}
