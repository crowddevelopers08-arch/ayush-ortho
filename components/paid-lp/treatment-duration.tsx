import { CalendarDays } from "lucide-react";
import { treatmentPlans } from "./data";

export default function TreatmentDuration() {
  return (
    <section className="bg-[#f7f8fa] px-4 py-9 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="text-[13px] font-semibold tracking-[1.5px] text-[#e13e20] uppercase">Treatment Duration Plan</span>
          <h2 className="mt-3 text-[26px] leading-tight font-semibold text-[#142544] sm:text-[34px] lg:text-[40px]">How long you&apos;ll be with us</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#5b677a] sm:text-base">
            Your plan is decided at the first consultation, after the assessment — not before it.
          </p>
        </div>

        {/* Stacked on mobile, side-by-side rows on tablet, three columns on desktop. */}
        <div className="relative mx-auto mt-6 grid max-w-[760px] gap-4 sm:mt-14 sm:gap-5 lg:max-w-none lg:grid-cols-3 lg:gap-6">
          <div className="pointer-events-none absolute top-[82px] right-[16%] left-[16%] hidden h-0.5 bg-[repeating-linear-gradient(90deg,#e13e20_0_8px,transparent_8px_16px)] opacity-40 lg:block" />

          {treatmentPlans.map(({ days, title, description }, i) => {
            const featured = i === treatmentPlans.length - 1;
            return (
              <article
                key={days}
                className={`relative flex flex-col items-center gap-4 rounded-[24px] p-5 text-center transition duration-300 hover:-translate-y-1.5 sm:flex-row sm:items-center sm:gap-6 sm:p-7 sm:text-left lg:flex-col lg:text-center ${
                  featured
                    ? "bg-[#142544] text-white shadow-[0_24px_50px_rgba(20,37,68,.28)]"
                    : "border border-[#e3e7ee] bg-white text-[#142544] hover:shadow-[0_20px_44px_rgba(20,37,68,.10)]"
                }`}
              >
                <div
                  className={`relative grid h-24 w-24 shrink-0 place-items-center rounded-full sm:h-[108px] sm:w-[108px] ${
                    featured ? "bg-[#e13e20]" : "bg-[#fde4de]"
                  }`}
                >
                  <div className="text-center leading-none">
                    <span className={`block text-[34px] font-bold sm:text-[40px] ${featured ? "text-white" : "text-[#e13e20]"}`}>{days}</span>
                    <span className={`mt-1 block text-xs font-semibold tracking-[1.5px] uppercase ${featured ? "text-white/85" : "text-[#c9361c]"}`}>
                      days
                    </span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-center sm:items-start lg:items-center">
                  <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                  <p className={`mt-2.5 text-[14.5px] leading-6 ${featured ? "text-white/75" : "text-[#5b677a]"}`}>{description}</p>

                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      featured ? "bg-white/10 text-white" : "bg-[#f7f8fa] text-[#142544]"
                    }`}
                  >
                    <CalendarDays className="h-3.5 w-3.5" /> {days} days
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
