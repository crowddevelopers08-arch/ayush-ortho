import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import BookingForm from "./booking-form";
import { BOOKING_ANCHOR, LOGO_URL, PRIMARY_PHONE, PRIMARY_PHONE_HREF } from "./data";
import HeroImageSlider from "./hero-image-slider";

const trustItems = ["5000+ Patients Treated", "More than 20,000+", "16+ Years of experience"];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-[#fff1ec] via-[#fffcfa] to-[#f2f5fb]">
      <header className="flex w-full items-center justify-between px-4 py-4 sm:px-6 md:px-10 xl:px-16 2xl:px-24">
        <img src={LOGO_URL} alt="Ayush Ortho" className="h-10 w-auto sm:h-12" />
        <a
          href={PRIMARY_PHONE_HREF}
          className="inline-flex items-center gap-2 rounded-full border border-[#142544]/15 bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#142544] backdrop-blur transition hover:bg-white"
        >
          <Phone className="h-4 w-4 text-[#e13e20]" />
          <span className="max-sm:hidden">{PRIMARY_PHONE}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </header>

      <div className="w-full px-4 pt-4 pb-10 sm:px-6 sm:pb-12 md:px-10 md:pb-14 lg:pt-8 lg:pb-20 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_260px_340px] lg:items-stretch lg:gap-8 xl:grid-cols-[1fr_320px_390px] xl:gap-12 2xl:grid-cols-[1fr_380px_430px] 2xl:gap-16">
          {/* LEFT */}
          <div className="flex min-w-0 flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e13e20]/30 bg-[#e13e20]/[.07] px-3.5 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#e13e20]" />
              <span className="text-[11px] font-semibold text-[#142544] sm:text-xs">#1 Ortho Clinic in Chennai</span>
            </div>

            <h1 className="text-[26px] leading-[1.18] font-extrabold text-[#142544] sm:text-[32px] md:text-[38px] lg:text-[32px] xl:text-[42px] 2xl:text-[54px]">
              Ayush Ortho <span className="text-[#e13e20]">Integrated Treatment</span>
              <span className="mt-2 block text-[15px] leading-snug font-semibold text-[#142544]/80 sm:text-lg lg:text-[17px] xl:text-xl 2xl:text-2xl">
                Ayurveda, Varma Therapy, Chiropractic Care and OMT
              </span>
            </h1>

            {/* Mobile / tablet arch image — between heading and paragraph */}
            <div className="mt-7 block w-[220px] sm:w-[260px] lg:hidden">
              <HeroImageSlider className="h-[290px] sm:h-[340px]" />
            </div>

            <p className="mt-6 max-w-[480px] text-sm leading-[1.8] text-[#142544]/70 sm:text-[15px] lg:mt-4 lg:max-w-[620px] 2xl:text-lg">
              Get personalised integrated care for knee, back, neck, shoulder and other musculoskeletal concerns.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={BOOKING_ANCHOR}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e13e20] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(225,62,32,.3)] transition hover:bg-[#c9361c] sm:w-auto"
              >
                Book Now
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href={PRIMARY_PHONE_HREF}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#142544]/20 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#142544] backdrop-blur-sm transition hover:bg-white sm:w-auto"
              >
                <Phone className="h-4 w-4 text-[#e13e20]" /> Call {PRIMARY_PHONE}
              </a>
            </div>

            {/* Trust marquee */}
            <div className="mt-6 w-full max-w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] lg:max-w-[620px]">
              <div className="flex w-max animate-[paid-lp-marquee_14s_linear_infinite] motion-reduce:animate-none">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1}>
                    {[...trustItems, ...trustItems].map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#142544]/[.06] px-3 py-1.5 text-[11px] font-semibold text-[#142544] sm:text-xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#e13e20]" />
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: arch image — desktop only */}
          <div className="hidden lg:flex lg:items-end lg:justify-center">
            <HeroImageSlider className="h-[420px] xl:h-[480px] 2xl:h-[540px]" />
          </div>

          {/* RIGHT: form card */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
