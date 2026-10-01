"use client";

import { CheckCircle2, ChevronDown, Loader2, Phone } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, branches, painConcerns, painDurations } from "./data";

type Status = "idle" | "submitting" | "success" | "error";

const branchNames = branches.map((b) => b.name);

const labelClass = "mb-1.5 block text-[10px] font-bold tracking-[.16em] text-white uppercase";
const fieldClass =
  "w-full rounded-full bg-white/10 px-4 py-2.5 text-[13px] text-white outline-none transition placeholder:text-white/35 focus:bg-white/[.16] focus:ring-2 focus:ring-[#e13e20]/60";

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
      <label htmlFor={`paid-lp-${name}`} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={`paid-lp-${name}`}
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

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", phone: "", painConcern: "", duration: "", branch: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value }));
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!form.painConcern) return setError("Please select your pain concern.");
    if (!form.duration) return setError("Please select how long you have had the pain.");
    if (!form.branch) return setError("Please select your preferred branch.");

    setStatus("submitting");
    try {
      const response = await fetch("/api/paid-lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), source: window.location.href }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError((err instanceof Error && err.message) || "Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <div id="book-appointment" className="scroll-mt-6 rounded-[1.5rem] bg-[#142544] p-5 shadow-[0_24px_60px_rgba(20,37,68,.28)] sm:p-6 xl:p-7">
      {status === "success" ? (
        <div className="flex flex-col items-center py-10 text-center text-white">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-[#5ed49a]">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <h3 className="mt-5 text-xl font-bold">Thank you, {form.name.trim()}!</h3>
          <p className="mt-2 max-w-[280px] text-sm leading-6 text-white/70">
            Your appointment request for <span className="font-semibold text-white">{form.branch}</span> has been received. Our team will call
            you shortly.
          </p>
          <a href={PRIMARY_PHONE_HREF} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff8a70]">
            <Phone className="h-4 w-4" /> {PRIMARY_PHONE}
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="mb-5 text-center text-lg leading-tight font-extrabold text-white xl:text-xl">Book Your Appointment</h3>

          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="paid-lp-name" className={labelClass}>
                Name
              </label>
              <input
                id="paid-lp-name"
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="paid-lp-phone" className={labelClass}>
                Mobile
              </label>
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 transition focus-within:bg-white/[.16] focus-within:ring-2 focus-within:ring-[#e13e20]/60">
                <span className="shrink-0 text-[13px] font-semibold text-white/55">+91</span>
                <span className="shrink-0 text-white/20">|</span>
                <input
                  id="paid-lp-phone"
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
              placeholder="Select pain concern"
              options={painConcerns}
              onChange={handleChange}
            />
            <SelectField
              label="Duration"
              name="duration"
              value={form.duration}
              placeholder="Select duration"
              options={painDurations}
              onChange={handleChange}
            />
            <SelectField
              label="Branch"
              name="branch"
              value={form.branch}
              placeholder="Select nearest branch"
              options={branchNames}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p role="alert" className="mt-3 text-center text-xs font-semibold text-[#ff8a70]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#e13e20] py-3.5 text-[13px] font-bold tracking-[.1em] text-white uppercase transition hover:bg-[#c9361c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
              </>
            ) : (
              "Book Your Appointment"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
