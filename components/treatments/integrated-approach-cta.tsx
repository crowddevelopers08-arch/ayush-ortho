import { ArrowRight, Plus } from "lucide-react";
import { BOOKING_ANCHOR, integratedApproach } from "./data";

export default function IntegratedApproachCta() {
  return (
    <section className="bg-white px-4 py-3 sm:px-6 sm:py-6">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#e13e20_0%,#c9361c_55%,#9e2a15_100%)] px-4 py-6 text-white sm:rounded-[28px] sm:px-10 sm:py-12 lg:px-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 left-[38%] h-64 w-64 rounded-full border-[36px] border-white/5" />

        <div className="relative flex flex-col items-center gap-5 text-center sm:gap-7 lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[1.2px] text-white/80 uppercase sm:text-sm">Integrated Treatment Approach</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 sm:gap-2 lg:justify-start">
              {integratedApproach.map((item, i) => (
                <span key={item} className="flex items-center gap-1.5 sm:gap-2">
                  {i > 0 && <Plus className="h-3.5 w-3.5 text-white/70 sm:h-4 sm:w-4" />}
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap ring-1 ring-white/25 backdrop-blur sm:px-4 sm:py-2 sm:text-base">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <a
            href={BOOKING_ANCHOR}
            className="group inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[#c9361c] shadow-[0_12px_30px_rgba(0,0,0,.18)] transition hover:bg-[#fff3f0] sm:w-auto sm:px-7 sm:text-[15px]"
          >
            Try Our Integrated Treatment Today
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
