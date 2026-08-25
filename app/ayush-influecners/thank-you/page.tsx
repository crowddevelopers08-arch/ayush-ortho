import { Thankheader } from "@/components/influecners/thankheader";
import { ArrowRight, CalendarCheck, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";

const nextSteps = [
  {
    icon: PhoneCall,
    title: "We'll call you shortly",
    description: "Our care team reaches out within 24 hours to understand your concern and confirm a slot.",
  },
  {
    icon: CalendarCheck,
    title: "Assessment gets scheduled",
    description: "Pick a time that works for you — in-clinic or online, whichever you're comfortable with.",
  },
  {
    icon: MessageCircle,
    title: "Get a personalised plan",
    description: "Walk away with clarity on what's causing your concern and what treatment actually fits you.",
  },
];

const heroButtonStyle =
  "group relative inline-flex h-[46px] min-w-[150px] items-center justify-center gap-2 overflow-hidden rounded-full border-0 bg-[#e13e20] px-6 text-center font-['Rubik',sans-serif] text-sm font-normal whitespace-nowrap text-white! no-underline transition-colors duration-200 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:text-[#ffccbc]! hover:before:translate-x-[350%] focus:text-[#ffccbc]! max-[480px]:h-11 max-[480px]:px-5 max-[480px]:text-xs";

export default function ThankYouPage() {
  return (
    
    <main className="min-h-screen bg-white font-[var(--font-geist)] text-black">
        <Thankheader />
      <section className="mx-auto flex min-h-screen max-w-[760px] flex-col justify-center px-5 pb-7 pt-24 text-center sm:px-8 lg:pb-5 lg:pt-20">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e13e20]/10 sm:h-16 sm:w-16">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#e13e20] sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e13e20] sm:text-xs">Request received</p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-[-.4px] sm:text-[34px]">
          Thank you for reaching out to Ayush Ortho.
        </h1>
        <p className="mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-black/65 sm:text-[15px]">
          Your assessment request has been noted. Here&apos;s exactly what happens next.
        </p>

        <div className="mt-7 grid gap-3 text-left sm:grid-cols-3 sm:gap-4">
          {nextSteps.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className="relative rounded-[14px] border border-[#eceef1] bg-white p-4 shadow-[0_8px_22px_rgba(15,30,61,0.06)]">
              <span className="absolute right-3 top-3 text-[10px] font-semibold text-black/25">{String(index + 1).padStart(2, "0")}</span>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e13e20]/10">
                <Icon className="h-[18px] w-[18px] text-[#e13e20]" strokeWidth={1.8} />
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug">{title}</h3>
              <p className="mt-1.5 text-xs leading-[1.55] text-black/60">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
          <Link href="/ayush-influecners" className={heroButtonStyle}>
            <span className="relative z-10">Back to Home</span>
            <ArrowRight className="relative z-10 h-4 w-4" />
          </Link>
          <a href="tel:+911234567890" className="text-[13.5px] font-medium text-black/70 underline underline-offset-4 hover:text-[#e13e20]">
            Or call us directly: +91 12345 67890
          </a>
        </div>

        <p className="mt-6 text-[11px] text-black/40">
          Didn&apos;t mean to submit this? No action needed — we won&apos;t reach out without your confirmation on call.
        </p>
      </section>
    </main>
  );
}
