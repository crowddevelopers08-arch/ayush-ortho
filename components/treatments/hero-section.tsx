import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { BOOKING_ANCHOR, LOGO_URL } from "./data";
import PatientVideoCarousel from "./patient-video-carousel";

const trustItems = ["5000+ Patients Treated", "More than 20,000+", "16+ Years of experience"];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-[#fff1ec] via-[#fffcfa] to-[#f2f5fb]">
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-8">
        <img src={LOGO_URL} alt="Ayush Ortho" className="h-10 w-auto sm:h-12" />
        <a
          href={BOOKING_ANCHOR}
          className="inline-flex items-center gap-2 rounded-full bg-[#e13e20] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(225,62,32,.28)] transition hover:bg-[#c9361c] sm:px-5"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Now
        </a>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-2 pb-8 sm:px-6 sm:pt-4 sm:pb-12 md:px-10 md:pb-14 lg:px-8 lg:pt-6 lg:pb-16">
        {/* Three blocks: text, video, CTAs. On phones they stack in that order, so the video
            sits between the paragraph and the buttons. On desktop the text and CTAs share the
            left column (the empty first/last rows centre them vertically) and the video spans
            the right column. */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[1fr_390px] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          <div className="flex min-w-0 flex-col items-center text-center lg:col-start-1 lg:row-start-2 lg:items-start lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e13e20]/30 bg-[#e13e20]/[.07] px-3.5 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#e13e20]" />
              <span className="text-[11px] font-semibold text-[#142544] sm:text-xs lg:text-sm">#1 Ortho Clinic in TamilNadu</span>
            </div>

            <h1 className="text-[26px] leading-[1.18] font-extrabold text-[#142544] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[58px] 2xl:text-[64px]">
              Ayush Ortho <span className="text-[#e13e20]">Integrated Treatment</span>
              <span className="mt-2 block text-[15px] leading-snug font-semibold text-[#142544]/80 sm:text-lg lg:text-[22px] xl:text-2xl">
                Ayurveda, Varma Therapy, Chiropractic Care and OMT
              </span>
            </h1>

            <p className="mt-4 max-w-[480px] text-sm leading-[1.7] sm:mt-6 sm:leading-[1.8] text-[#142544]/70 sm:text-[15px] lg:mt-5 lg:max-w-[600px] lg:text-lg xl:text-[19px]">
              Get personalised integrated care for knee, back, neck, shoulder and other musculoskeletal concerns.
            </p>
          </div>

          {/* Patient video carousel */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
            <PatientVideoCarousel />
          </div>

          <div className="flex min-w-0 flex-col items-center lg:col-start-1 lg:row-start-3 lg:mt-6 lg:items-start">
            <div className="flex w-full flex-col gap-2.5 sm:gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={BOOKING_ANCHOR}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e13e20] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(225,62,32,.3)] transition hover:bg-[#c9361c] sm:w-auto lg:px-9 lg:py-4 lg:text-base"
              >
                Book Now
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>

            {/* Trust badges */}
            <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3 lg:justify-start">
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#142544]/[.06] px-3 py-1.5 text-[11px] font-semibold text-[#142544] sm:text-xs lg:px-4 lg:py-2 lg:text-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#e13e20]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
