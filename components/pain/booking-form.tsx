"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { THANK_YOU_PATH, THANK_YOU_STORAGE_KEY, branches, painConcerns } from "./data";

type Status = "idle" | "submitting" | "redirecting" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const busyLabels: Partial<Record<Status, string>> = {
  submitting: "Submitting…",
  redirecting: "Redirecting…",
};

const branchNames = branches.map((b) => b.name);

const labelClass = "mb-1.5 block text-[10px] font-bold tracking-[.16em] text-white uppercase";
const fieldClass =
  "h-[42px] w-full rounded-full bg-white/10 px-4 text-[13px] text-white outline-none transition placeholder:text-white/35 focus:bg-white/[.16] focus:ring-2 focus:ring-[#e13e20]/60";

function SelectField({
  label,
  name,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={`pain-${name}`} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={`pain-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          className={`${fieldClass} appearance-none pr-10 ${value ? "text-white" : "text-white/45"}`}
        >
          <option value="" disabled className="text-[#142544]">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-[#142544]">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/45" />
      </div>
    </div>
  );
}

// Saves the lead (database + TeleCRM via /api/pain) and sends the visitor to the
// thank-you page. No payment step on this page.
export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", painConcern: "", branch: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  // Load the thank-you page in advance so the redirect after submitting is instant.
  useEffect(() => {
    router.prefetch(THANK_YOU_PATH);
  }, [router]);

  const busy = status !== "idle" && status !== "error";

  // Hands the booking details to the thank-you page through sessionStorage, so the
  // visitor's name never appears in the URL (or in analytics that log URLs).
  const goToThankYou = () => {
    setStatus("redirecting");
    try {
      sessionStorage.setItem(THANK_YOU_STORAGE_KEY, JSON.stringify({ name: form.name.trim(), branch: form.branch, paymentId: "" }));
    } catch {
      // Storage blocked (private mode) — the thank-you page falls back to a generic message.
    }
    router.push(THANK_YOU_PATH);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value }));
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setError("");

    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!EMAIL_PATTERN.test(form.email.trim())) return setError("Please enter a valid email address.");
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!form.painConcern) return setError("Please select your pain concern.");
    if (!form.branch) return setError("Please select your preferred branch.");

    setStatus("submitting");
    try {
      const response = await fetch("/api/pain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), email: form.email.trim(), source: window.location.href }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.leadId) throw new Error(data?.error);
      goToThankYou();
    } catch (err) {
      setStatus("error");
      setError((err instanceof Error && err.message) || "Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <div id="book-appointment" className="scroll-mt-6 rounded-[1.5rem] bg-[#142544] p-5 shadow-[0_24px_60px_rgba(20,37,68,.28)] sm:p-7 lg:p-8">
      <form onSubmit={handleSubmit} noValidate>
        <h3 className="mb-5 text-center text-lg leading-tight font-extrabold text-white sm:mb-6 sm:text-2xl">Book Your Appointment</h3>

        {/* Stacked on phones, 2 per row on tablets, 3 on laptops, all in one row on wide screens. */}
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <div>
            <label htmlFor="pain-name" className={labelClass}>
              Name
            </label>
            <input
              id="pain-name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="pain-email" className={labelClass}>
              Email
            </label>
            <input
              id="pain-email"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              maxLength={120}
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="pain-phone" className={labelClass}>
              Mobile
            </label>
            <div className="flex h-[42px] items-center gap-1.5 rounded-full bg-white/10 px-4 transition focus-within:bg-white/[.16] focus-within:ring-2 focus-within:ring-[#e13e20]/60">
              <span className="shrink-0 text-[13px] font-semibold text-white/55">+91</span>
              <span className="shrink-0 text-white/20">|</span>
              <input
                id="pain-phone"
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          <SelectField
            label="Pain Concern"
            name="painConcern"
            value={form.painConcern}
            placeholder="Pain concern"
            options={painConcerns}
            onChange={handleChange}
          />
          <SelectField
            label="Branch"
            name="branch"
            value={form.branch}
            placeholder="Nearest branch"
            options={branchNames}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={busy}
            className="flex h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#e13e20] px-4 text-[13px] font-bold tracking-[.06em] whitespace-nowrap text-white uppercase transition hover:bg-[#c9361c] disabled:cursor-not-allowed disabled:opacity-70 max-sm:mt-2"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {busyLabels[status]}
              </>
            ) : (
              "Book Now"
            )}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-center text-xs font-semibold text-[#ff8a70]">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
