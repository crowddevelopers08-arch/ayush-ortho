"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const painAreas = [
  { label: "Knee Pain", iconPath: "/icons-1.png" },
  { label: "Back Pain", iconPath: "/icons-2.png" },
  { label: "Neck Pain", iconPath: "/icons-3.png" },
  { label: "Shoulder Pain", iconPath: "/icons-4.png" },
  { label: "Hip Pain", iconPath: "/icons-5.png" },
  { label: "Ankle Pain", iconPath: "/icons-6.png" },
];

const benefits = [
  { title: "Personalized", subtitle: "Assessment", iconPath: "/p-icons-1.png" },
  { title: "Advanced", subtitle: "Therapy", iconPath: "/p-icons-2.png" },
  { title: "Surgery-Free", subtitle: "Treatment", iconPath: "/p-icons-3.png" },
  { title: "Faster", subtitle: "Recovery", iconPath: "/p-icons-4.png" },
];

export default function PainReliefSelector() {
  const [activePain, setActivePain] = useState("Knee Pain");

  return (
    <section className="bg-white px-3 py-0 font-[var(--font-geist)] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[22px] bg-[linear-gradient(115deg,#fff,#fbfcfa)] sm:rounded-[28px] lg:grid-cols-[1.12fr_.62fr_1.05fr_.72fr]">
        <div className="relative min-h-[610px] p-6 sm:min-h-[650px] sm:p-8 lg:min-h-[460px] lg:p-8">
          <h2 className="relative z-10 text-[29px] leading-[1.08] font-semibold tracking-[-.8px] text-black sm:text-[34px]"><span className="text-[#e13e20]">FIND RELIEF </span><br />FOR YOUR PAIN</h2>
          <p className="relative z-10 mt-5 max-w-full text-sm leading-6 text-[#606964] lg:mt-7 lg:max-w-[210px] lg:leading-7">We understand that every type of pain requires a different approach. Our team evaluates your condition and recommends a suitable treatment plan.</p>
          <a href="#treatments" className="relative z-10 mt-7 hidden h-11 items-center gap-5 rounded-full border-2 border-[#e13e20] px-5 text-xs font-semibold text-[#e13e20] no-underline shadow-sm lg:inline-flex">Explore Treatments <ArrowRight className="h-4 w-4" /></a>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[340px] items-center justify-center lg:inset-y-4 lg:right-0 lg:left-auto lg:h-auto lg:w-[55%]">
            <span className="absolute bottom-[12%] h-24 w-24 rounded-full border border-[#dceadd] shadow-[0_0_0_16px_rgba(224,238,226,.32),0_0_0_32px_rgba(224,238,226,.18)] lg:h-28 lg:w-28" />
            <img src="/pain-body-map.png" alt="Rear anatomical body showing common pain locations" className="relative z-1 h-full w-full object-contain lg:h-[94%]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-y border-[#edf1ee] bg-white/80 p-4 sm:p-5 lg:flex lg:flex-col lg:justify-center lg:border-x lg:border-y-0">
          {painAreas.map(({ label, iconPath }) => {
            const active = activePain === label;
            return <button key={label} type="button" onClick={() => setActivePain(label)} className={`flex h-[48px] min-w-0 items-center gap-2 rounded-full px-2.5 text-left text-[11px] font-medium transition sm:h-[52px] sm:gap-3 sm:px-3 sm:text-xs lg:h-[54px] lg:gap-4 lg:px-4 lg:text-sm ${active ? "bg-[#e13e20] text-white shadow-[0_7px_18px_rgba(225,62,32,.22)]" : "bg-transparent text-[#303733] hover:bg-[#fff1ed]"}`}>
              <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full sm:h-9 sm:w-9 ${active ? "bg-white shadow-sm" : "bg-[#f2f7f3]"}`}>
                <img src={iconPath} alt="" className="pointer-events-none h-7 w-7 object-contain transition sm:h-8 sm:w-8" />
              </span>{label}
            </button>;
          })}
        </div>

        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-7">
          <div className="relative aspect-[1.04] w-full max-w-[390px] overflow-hidden rounded-[20px] bg-[#ddd] shadow-lg">
            <img src="/knee-pain-closeup.png" alt={`${activePain} treatment focus`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
              {["25% 45%", "63% 42%", "79% 45%"].map((position, index) => <span key={position} className="h-[58px] w-[58px] overflow-hidden rounded-full border-2 border-white bg-white shadow-md sm:h-[72px] sm:w-[72px]"><img src="/ayush-influencer-treatment.png" alt={`Treatment preview ${index + 1}`} className="h-full w-full object-cover" style={{ objectPosition: position }} /></span>)}
            </div>
          </div>
        </div>

        <div className="m-4 grid grid-cols-2 gap-5 rounded-[20px] bg-white px-4 py-6 shadow-[0_8px_28px_rgba(41,65,55,.08)] sm:m-5 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:gap-8 lg:px-7 lg:py-8">
          {benefits.map(({ title, subtitle, iconPath }) => <article key={title} className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left lg:gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fff0ec] lg:h-12 lg:w-12"><img src={iconPath} alt="" className="h-7 w-7 object-contain [filter:brightness(0)_saturate(100%)_invert(31%)_sepia(98%)_saturate(2100%)_hue-rotate(353deg)_brightness(94%)] lg:h-8 lg:w-8" /></span><div><strong className="block text-xs font-semibold text-[#303733] sm:text-sm">{title}</strong><small className="mt-1 block text-[10px] text-[#5f6964] sm:text-xs">{subtitle}</small></div></article>)}
        </div>

        <div className="flex justify-center px-4 pb-7 lg:hidden">
          <a href="#treatments" className="inline-flex h-11 items-center gap-4 rounded-full border-2 border-[#e13e20] px-6 text-xs font-semibold text-[#e13e20] no-underline shadow-sm">Explore Treatments <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
