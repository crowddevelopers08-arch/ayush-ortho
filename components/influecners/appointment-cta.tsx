import { ArrowRight, CalendarDays, CheckCircle2, Phone } from "lucide-react";

const primaryButton =
  "group relative inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#e13e20] px-5 font-['Rubik',sans-serif] text-[13px] font-normal text-white no-underline shadow-[0_8px_22px_rgba(225,62,32,.25)] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:before:translate-x-[350%] sm:h-[52px] sm:min-w-[205px] sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm";

export default function AppointmentCta() {
  return (
    <section className="bg-white px-3 max-sm:pb-10 pb-24 max-sm:pt-0 pt-5 font-[var(--font-geist)] sm:px-7 sm:py-6 lg:px-12 lg:py-8">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#fff5f2_0%,#fff_48%,#f4f8f5_100%)] px-4 py-8 shadow-[0_15px_45px_rgba(50,64,57,.09)] sm:rounded-[30px] sm:px-10 sm:py-12 lg:px-16 lg:py-14">
        <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full border-[38px] border-[#e13e20]/5 sm:-right-16 sm:-top-24 sm:h-72 sm:w-72 sm:border-[45px]" />
        <div className="pointer-events-none absolute -bottom-28 left-[42%] h-64 w-64 rounded-full border-[36px] border-[#2d755b]/5" />

        <div className="relative z-1 grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fde4de] px-3 py-2 text-[10px] font-semibold tracking-[.45px] text-[#c9361c] sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[.7px]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> STILL SUFFERING FROM PAIN?
            </div>
            <h2 className="mt-4 max-w-[650px] text-[28px] leading-[1.12] font-semibold tracking-[-.65px] text-[#142544] sm:mt-5 sm:text-[40px] sm:leading-[1.15] sm:tracking-[-.8px] lg:text-[47px]">
              You Don&apos;t Have to<br className="hidden sm:block" /> Keep Ignoring It.
            </h2>
            <p className="mt-3.5 max-w-[650px] text-[13px] leading-6 text-[#68758a] sm:mt-5 sm:text-base sm:leading-7">
              Take the first step towards understanding your condition and exploring suitable treatment options.
            </p>
          </div>

          <div className="rounded-[18px] border border-white bg-white/90 p-4 backdrop-blur-sm sm:rounded-[24px] sm:p-8 sm:shadow-none">
            <h3 className="text-[21px] leading-[1.25] font-semibold text-[#142544] sm:text-[29px]">Book Your Appointment With <span className="text-[#e13e20]">Ayush Ortho Today</span></h3>
            <p className="mt-3 text-[13px] leading-6 text-[#6c7787] sm:mt-4 sm:text-[15px]">Our team will assess your concern and guide you towards an appropriate treatment approach.</p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
              <a href="#appointment" className={primaryButton}>
                <CalendarDays className="relative z-10 h-5 w-5" /><span className="relative z-10">Book Appointment</span><ArrowRight className="relative z-10 h-4 w-4" />
              </a>
              <a href="tel:+919150010387" className="inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full border-2 border-[#e13e20] bg-white px-5 font-['Rubik',sans-serif] text-[13px] text-[#e13e20] no-underline transition hover:bg-[#fff3f0] sm:h-[52px] sm:w-auto sm:min-w-[170px] sm:gap-2.5 sm:px-6 sm:text-sm">
                <Phone className="h-5 w-5" /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
