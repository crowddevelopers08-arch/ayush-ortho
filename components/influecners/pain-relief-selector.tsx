"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const painAreas = [
  { label: "Knee Pain", iconPath: "/pain-icons/knee-pain.svg" },
  { label: "Back Pain", iconPath: "/pain-icons/back-pain.svg" },
  { label: "Neck Pain", iconPath: "/pain-icons/neck-pain.svg" },
  { label: "Shoulder Pain", iconPath: "/pain-icons/shoulder-pain.svg" },
  { label: "Hip Pain", iconPath: "/pain-icons/hip-pain.svg" },
  { label: "Ankle Pain", iconPath: "/pain-icons/ankle-pain.svg" },
];

const benefits = [
  { title: "Personalized", subtitle: "Assessment", iconPath: "/benefit-icons/personalized-assessment.svg" },
  { title: "Advanced", subtitle: "Therapy", iconPath: "/benefit-icons/advanced-therapy.svg" },
  { title: "Surgery-Free", subtitle: "Treatment", iconPath: "/benefit-icons/surgery-free-treatment.svg" },
  { title: "Faster", subtitle: "Recovery", iconPath: "/benefit-icons/faster-recovery.svg" },
];

export default function PainReliefSelector() {
  const [activePain, setActivePain] = useState("Knee Pain");

  return (
    <section className="bg-white px-4 py-12 font-[var(--font-geist)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#fff,#fbfcfa)] shadow-[0_12px_45px_rgba(45,72,61,.08)] lg:grid-cols-[1.12fr_.62fr_1.05fr_.72fr]">
        <div className="relative min-h-[460px] p-8 sm:p-10">
          <h2 className="relative z-10 text-[34px] leading-[1.05] font-semibold tracking-[-1px] text-black"><span className="text-[#176747]">FIND RELIEF </span><br />FOR YOUR PAIN</h2>
          <p className="relative z-10 mt-7 max-w-[210px] text-sm leading-7 text-[#606964]">We understand that every type of pain requires a different approach. Our team evaluates your condition and recommends a suitable treatment plan.</p>
          <a href="#treatments" className="relative z-10 mt-7 inline-flex h-11 items-center gap-5 rounded-full border-2 border-[#6b9a87] px-5 text-xs font-semibold text-[#245f48] no-underline shadow-sm">Explore Treatments <ArrowRight className="h-4 w-4" /></a>
          <div className="pointer-events-none absolute inset-y-4 right-0 flex w-[55%] items-center justify-center">
            <span className="absolute bottom-[12%] h-28 w-28 rounded-full border border-[#dceadd] shadow-[0_0_0_18px_rgba(224,238,226,.32),0_0_0_38px_rgba(224,238,226,.18)]" />
            <img src="/pain-body-map.png" alt="Rear anatomical body showing common pain locations" className="relative z-1 h-[94%] w-full object-contain" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 border-y border-[#edf1ee] bg-white/80 p-5 lg:border-x lg:border-y-0">
          {painAreas.map(({ label, iconPath }) => {
            const active = activePain === label;
            return <button key={label} type="button" onClick={() => setActivePain(label)} className={`flex h-[54px] items-center gap-4 rounded-full px-4 text-left text-sm font-medium transition ${active ? "bg-[#20aa5a] text-white shadow-[0_7px_18px_rgba(32,170,90,.22)]" : "bg-transparent text-[#303733] hover:bg-[#f2f7f3]"}`}>
              <span className={`relative grid h-9 w-9 place-items-center rounded-full ${active ? "bg-white/15" : "bg-[#f2f7f3] text-[#668b7b]"}`}>
                <img src={iconPath} alt="" className="pointer-events-none h-5 w-5 object-contain" />
              </span>{label}
            </button>;
          })}
        </div>

        <div className="flex items-center justify-center p-7">
          <div className="relative aspect-[1.04] w-full max-w-[390px] overflow-hidden rounded-[20px] bg-[#ddd] shadow-lg">
            <img src="/knee-pain-closeup.png" alt={`${activePain} treatment focus`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
              {["25% 45%", "63% 42%", "79% 45%"].map((position, index) => <span key={position} className="h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-white bg-white shadow-md"><img src="/ayush-influencer-treatment.png" alt={`Treatment preview ${index + 1}`} className="h-full w-full object-cover" style={{ objectPosition: position }} /></span>)}
            </div>
          </div>
        </div>

        <div className="m-5 flex flex-col justify-center gap-8 rounded-[20px] bg-white px-7 py-8 shadow-[0_8px_28px_rgba(41,65,55,.08)]">
          {benefits.map(({ title, subtitle, iconPath }) => <article key={title} className="flex items-center gap-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f4f8f4]"><img src={iconPath} alt="" className="h-7 w-7 object-contain" /></span><div><strong className="block text-sm font-semibold text-[#303733]">{title}</strong><small className="mt-1 block text-xs text-[#5f6964]">{subtitle}</small></div></article>)}
        </div>
      </div>
    </section>
  );
}
