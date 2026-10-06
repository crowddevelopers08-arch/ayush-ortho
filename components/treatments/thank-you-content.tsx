"use client";

import { ArrowLeft, CalendarCheck, CheckCircle2, Clock, MapPin, PhoneCall, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { LOGO_URL, THANK_YOU_STORAGE_KEY, branches } from "./data";

type Booking = { name: string; branch: string; paymentId: string };

const nextSteps = [
  { Icon: PhoneCall, title: "We call you", text: "Our team will call you shortly to confirm a convenient date and time." },
  { Icon: CalendarCheck, title: "Visit the clinic", text: "Come to your chosen branch for your first consultation and assessment." },
  { Icon: Stethoscope, title: "Your treatment plan", text: "Your doctor will recommend a personalised plan based on the assessment." },
];

export default function ThankYouContent() {
  // Read after mount: sessionStorage doesn't exist during server rendering.
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(THANK_YOU_STORAGE_KEY);
      if (saved) setBooking(JSON.parse(saved));
    } catch {
      // Storage blocked or malformed — show the generic message.
    }
  }, []);

  const branch = branches.find((b) => b.name === booking?.branch);
  const paid = Boolean(booking?.paymentId);

  return (
    <section className="min-h-[70vh] bg-gradient-to-br from-[#fff1ec] via-[#fffcfa] to-[#f2f5fb] px-4 pb-14 sm:px-6 sm:pb-20">
      <header className="mx-auto flex max-w-[1040px] items-center justify-between py-3 sm:py-4">
        <img src={LOGO_URL} alt="Ayush Ortho" className="h-10 w-auto sm:h-12" />
        <a href="/treatments" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#142544] hover:text-[#e13e20]">
          <ArrowLeft className="h-4 w-4" /> Back
        </a>
      </header>

      <div className="mx-auto mt-4 max-w-[720px] sm:mt-8">
        <div className="rounded-[1.5rem] bg-[#142544] px-5 py-9 text-center text-white shadow-[0_24px_60px_rgba(20,37,68,.28)] sm:px-10 sm:py-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/10 text-[#5ed49a] sm:h-20 sm:w-20">
            <CheckCircle2 className="h-9 w-9 sm:h-11 sm:w-11" />
          </span>

          <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{booking?.name ? `Thank you, ${booking.name}!` : "Thank you!"}</h1>

          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            {paid ? (
              <>
                Your payment was successful and your booking
                {booking?.branch && (
                  <>
                    {" "}
                    for <span className="font-semibold text-white">{booking.branch}</span>
                  </>
                )}{" "}
                is confirmed. Our team will call you shortly to fix your slot.
              </>
            ) : (
              <>
                Your appointment request
                {booking?.branch && (
                  <>
                    {" "}
                    for <span className="font-semibold text-white">{booking.branch}</span>
                  </>
                )}{" "}
                has been received. Our team will call you shortly.
              </>
            )}
          </p>

          {paid && (
            <p className="mt-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/70">
              Payment ID: <span className="font-semibold text-white">{booking?.paymentId}</span>
            </p>
          )}

          {branch && (
            <div className="mx-auto mt-6 max-w-[460px] rounded-2xl bg-white/5 p-4 text-left text-sm ring-1 ring-white/10">
              <p className="font-semibold text-white">{branch.name}</p>
              <p className="mt-2 flex gap-2 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a70]" />
                {branch.address}
              </p>
              <p className="mt-1.5 flex gap-2 text-white/70">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a70]" />
                {branch.timings}
              </p>
            </div>
          )}
        </div>

        <h2 className="mt-10 text-center text-lg font-semibold text-[#142544] sm:text-xl">What happens next</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {nextSteps.map(({ Icon, title, text }, i) => (
            <li key={title} className="rounded-2xl border border-[#e3e7ee] bg-white p-5 text-center sm:text-left">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-[#fde4de] text-[#e13e20] sm:mx-0">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[15px] font-semibold text-[#142544]">
                {i + 1}. {title}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-[#5b677a]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
