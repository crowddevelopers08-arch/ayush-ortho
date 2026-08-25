"use client";

import { CalendarDays, PhoneCall, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ContactActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const closeForm = () => {
    if (isSubmitting) return;
    setSubmitError("");
    setIsFormOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/influecners-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          areaOfPain: String(formData.get("concern") || "").trim(),
          source: window.location.href,
          consent: true,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit your request.");
      }

      form.reset();
      setIsFormOpen(false);
      window.location.assign("/ayush-influecners/thank-you");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const updateVisibility = () => {
      const stories = document.getElementById("real-stories");
      if (!stories) return;
      setIsVisible(stories.getBoundingClientRect().top <= window.innerHeight * 0.85);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const openFormFromPageCta = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      const link = clickedElement.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const opensContactForm =
        href === "#appointment" ||
        href === "#consultation" ||
        href.startsWith("tel:");

      if (!opensContactForm) return;
      event.preventDefault();
      setIsFormOpen(true);
    };

    document.addEventListener("click", openFormFromPageCta);
    return () => document.removeEventListener("click", openFormFromPageCta);
  }, []);

  return (
    <>
    <section className={`fixed inset-x-0 bottom-0 z-50 bg-transparent px-2 pb-2 pt-2 font-[var(--font-geist)] transition duration-300 sm:px-7 sm:pb-3 lg:px-6 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
      <div className="mx-auto grid max-w-[850px] grid-cols-3 overflow-hidden rounded-[20px] border border-[#e8ece9] bg-white shadow-[0_7px_22px_rgba(32,58,47,.17)] sm:rounded-[24px]">
        <button type="button" onClick={() => setIsFormOpen(true)} className="group flex min-h-[68px] flex-col items-center justify-center gap-1 px-1 py-2 text-center transition hover:bg-[#f7fbf8] sm:min-h-[72px] sm:flex-row sm:gap-4 sm:px-5 sm:py-3 sm:text-left">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fff0ec] text-[#e13e20] transition group-hover:scale-105 sm:h-10 sm:w-10"><FaWhatsapp className="h-4 w-4 sm:h-6 sm:w-6" /></span>
          <span><strong className="block text-[9px] font-semibold text-[#e13e20] sm:text-[15px]">Chat on WhatsApp</strong><small className="mt-1 hidden text-[10px] text-[#59655f] sm:block">Get assistance from our team.</small></span>
        </button>

        <button type="button" onClick={() => setIsFormOpen(true)} className="group flex min-h-[68px] flex-col items-center justify-center gap-1 bg-[linear-gradient(135deg,#e13e20,#b92f18)] px-1 py-2 text-center text-white shadow-[0_6px_18px_rgba(225,62,32,.23)] transition hover:brightness-105 sm:min-h-[72px] sm:flex-row sm:gap-4 sm:rounded-[17px] sm:px-5 sm:py-3 sm:text-left">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/12 sm:h-10 sm:w-10"><CalendarDays className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.8} /></span>
          <span><strong className="block text-[9px] font-semibold sm:text-[15px]">Book Appointment</strong><small className="mt-1 hidden text-[10px] text-white/80 sm:block">Schedule your visit today.</small></span>
        </button>

        <button type="button" onClick={() => setIsFormOpen(true)} className="group flex min-h-[68px] flex-col items-center justify-center gap-1 px-1 py-2 text-center transition hover:bg-[#f7fbf8] sm:min-h-[72px] sm:flex-row sm:gap-4 sm:px-5 sm:py-3 sm:text-left">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fff0ec] text-[#e13e20] transition group-hover:scale-105 sm:h-10 sm:w-10"><PhoneCall className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.8} /></span>
          <span><strong className="block text-[9px] font-semibold text-[#e13e20] sm:text-[15px]">Call Us Now</strong><small className="mt-1 hidden text-[10px] text-[#59655f] sm:block">Speak with our team directly.</small></span>
        </button>
      </div>
    </section>

    {isFormOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6 font-[var(--font-geist)] backdrop-blur-[3px]" role="dialog" aria-modal="true" aria-labelledby="contact-form-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}>
        <div className="relative w-full max-w-[480px] rounded-[26px] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:p-8">
          <button type="button" aria-label="Close form" onClick={closeForm} disabled={isSubmitting} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#f4f6f5] text-[#33433c] transition hover:bg-[#e9eeeb] disabled:cursor-not-allowed disabled:opacity-50"><X className="h-5 w-5" /></button>
          <div className="pr-10">
            <span className="text-xs font-semibold uppercase tracking-[1px] text-[#e13e20]">Ayush Ortho</span>
            <h2 id="contact-form-title" className="mt-2 text-[27px] font-semibold text-[#142544]">How Can We Help You?</h2>
            <p className="mt-2 text-sm leading-6 text-[#6b7582]">Share your details and our team will contact you shortly.</p>
          </div>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-1.5 text-xs font-semibold text-[#33423b]">Name
              <input name="name" type="text" required placeholder="Enter your name" className="h-12 rounded-xl border border-[#dfe6e2] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#a1aaa5] focus:border-[#e13e20] focus:ring-2 focus:ring-[#e13e20]/10" />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[#33423b]">Phone Number
              <input name="phone" type="tel" required inputMode="tel" placeholder="Enter your phone number" className="h-12 rounded-xl border border-[#dfe6e2] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#a1aaa5] focus:border-[#e13e20] focus:ring-2 focus:ring-[#e13e20]/10" />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[#33423b]">Email
              <input name="email" type="email" required placeholder="Enter your email address" className="h-12 rounded-xl border border-[#dfe6e2] bg-white px-4 text-sm font-normal outline-none transition placeholder:text-[#a1aaa5] focus:border-[#e13e20] focus:ring-2 focus:ring-[#e13e20]/10" />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[#33423b]">Concern
              <select name="concern" required defaultValue="" className="h-12 rounded-xl border border-[#dfe6e2] bg-white px-4 text-sm font-normal text-[#4f5b55] outline-none transition focus:border-[#e13e20] focus:ring-2 focus:ring-[#e13e20]/10">
                <option value="" disabled>Select your concern</option>
                <option>Knee Pain</option><option>Back Pain</option><option>Neck Pain</option><option>Shoulder Pain</option><option>Hip Pain</option><option>Ankle Pain</option><option>Joint Stiffness</option><option>Sports Injury</option><option>Other</option>
              </select>
            </label>
            {submitError && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{submitError}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#e13e20,#b92f18)] px-6 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(225,62,32,.22)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-65">
              {isSubmitting ? "Submitting..." : "Submit Request"} {!isSubmitting && <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
