"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  Navigation,
  Phone,
  Play,
  Send,
  Users,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const treatments = [
  "Knee Pain",
  "Back Pain",
  "Neck Pain",
  "Shoulder Pain",
  "Joint Pain",
];
const stories = ["@sri_deepthi", "@fitness_chandru", "@foodies_divya"];
const greenButton =
  "group relative inline-flex h-[46px] min-w-[150px] items-center justify-center gap-2 overflow-hidden rounded-full border-0 bg-[#e13e20] px-5 text-center font-['Rubik',sans-serif] text-sm font-normal whitespace-nowrap text-white no-underline transition-colors duration-200 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:text-[#ffccbc] hover:before:translate-x-[350%] focus:text-[#ffccbc] max-[480px]:min-w-[140px] max-[480px]:px-4 max-[480px]:text-sm max-[360px]:min-w-[120px] max-[360px]:gap-1.5 max-[360px]:px-3 max-[360px]:text-xs";

// Replace this demo URL with the clinic's original Google Maps embed URL later.
const clinicMapEmbedUrl =
  "https://www.google.com/maps?q=Ayush%20Ortho%20Clinic%2C%20No.%2015%2C%202nd%20Main%20Road%2C%20Opposite%20Nolambur%20Bus%20Stand%2C%20Mogappair%20West%2C%20Chennai%20600037&z=17&output=embed";

function CountUp({ end, suffix = "", decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let hasRun = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun) return;
      hasRun = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(end);
        observer.disconnect();
        return;
      }

      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1600, 1);
        setValue(end * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(animate);
        else setValue(end);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

function Logo() {
  return (
    <a
      href="#"
      className="flex min-w-[250px] items-center no-underline max-sm:min-w-0"
    >
      <img
        src="https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png"
        alt="Ayush Ortho"
        className="h-[60px] w-[170px] object-contain max-sm:h-10 max-sm:w-[120px]"
      />
    </a>
  );
}

export default function InfluencerHero() {
  return (
    <main className="min-h-screen bg-white font-[var(--font-geist)] text-black">
      <header className="relative z-20 flex h-[72px] items-center justify-between border-b border-[#edf0ee] bg-white px-7 max-sm:h-[70px] max-sm:px-4">
        <Logo />
        <nav className="flex h-full items-center gap-9 max-[1100px]:hidden">
          {[
            "Home",
            "Treatments",
            "Influencer Stories",
            "Our Doctors",
            "About Us",
            "Contact Us",
          ].map((x, i) => (
            <a
              key={x}
              href={`#${x}`}
              className={`relative flex h-full items-center whitespace-nowrap text-sm font-medium no-underline ${i === 0 ? "text-[#e13e20] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[#e13e20]" : "text-black"}`}
            >
              {x}
            </a>
          ))}
        </nav>
        <a
          href="#appointment"
          className={`${greenButton} h-10 px-4 text-[13px] max-sm:min-w-12 max-sm:w-12 max-sm:px-0 max-sm:text-[0px]`}
        >
          <CalendarDays size={16} />
          <span>Book Appointment</span>
        </a>
      </header>

      <section className="relative h-[calc(100vh-72px)] min-h-[620px] overflow-hidden bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.97)_34%,rgba(255,255,255,.35)_70%,rgba(157,211,255,.38)_100%)] max-sm:h-auto max-sm:min-h-0 max-sm:px-[17px] max-sm:py-8">
        <div className="absolute inset-y-0 right-0 left-[39%] overflow-hidden bg-[#edf5f2] max-sm:left-0">
          <iframe
            src={clinicMapEmbedUrl}
            title="Ayush Ortho clinic area map"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full scale-[1.03] border-0 opacity-75 grayscale-[15%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/35 to-sky-100/20 max-sm:bg-white/65" />
        </div>

        <div className="absolute left-[4%] top-[5%] z-5 w-[650px] max-[1100px]:left-[3%] max-[1100px]:w-[55%] max-sm:relative max-sm:left-auto max-sm:top-auto max-sm:w-auto">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#fddfd7] bg-white/90 py-1.5 pr-4 pl-2 text-xs font-medium shadow-lg">
            <div className="flex">
              {[38, 49, 60, 71].map((p, i) => (
                <span
                  key={p}
                  className={`${i ? "-ml-2" : ""} h-6 w-6 rounded-full border-2 border-white bg-[url('/ayush-influencer-treatment.png')] bg-[length:360%]`}
                  style={{ backgroundPosition: `${p}% 34%` }}
                />
              ))}
            </div>
            Trusted Orthopedic Care for Long-Term Pain Relief
          </div>
          <h1 className="my-5 mb-4 text-2xl leading-tight font-medium text-[#e13e20] sm:text-3xl md:text-4xl lg:text-[44px] lg:leading-[1.12] xl:text-[48px]">
            Get Relief From Pain.
            <br />
            <em className="not-italic">Move With Confidence.</em>
          </h1>
          <p className="mb-4 max-w-[610px] text-sm leading-[1.5] text-black sm:text-sm md:text-[15px]">
            Are you struggling with Knee Pain, Back Pain, Neck Pain, Shoulder
            Pain or Joint Pain?
            <br />
            <br />
            At Ayush Ortho, we focus on understanding the root cause of your
            pain and recommending a personalised, surgery-free treatment
            approach based on your condition.
            <br />
            <br />
            <strong>
              Personalised Care | Advanced Therapy | Focus on Long-Term Relief
            </strong>
          </p>
          <div className="flex gap-2.5 max-[1100px]:flex-wrap max-sm:gap-3">
            {treatments.map((x) => (
              <span
                key={x}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#fddfd7] px-3 py-1.5 text-xs font-medium text-black"
              >
                <i className="grid h-4 w-4 place-items-center rounded-full text-[#e13e20]">
                  <Check size={13} strokeWidth={3} />
                </i>
                {x}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3 max-sm:grid">
            <a href="#appointment" className={greenButton}>
              <CalendarDays size={18} />
              Book Your Appointment
              <ArrowRight size={17} />
            </a>
            <a href="tel:+919150010387" className={greenButton}>
              <Phone size={18} />
              Call Us Now
            </a>
          </div>
          <div className="mt-6 grid w-[700px] grid-cols-4 max-[1100px]:w-[165%] max-sm:mt-7 max-sm:w-auto max-sm:grid-cols-2 max-sm:gap-2">
            <article className="flex h-20 items-center gap-3 rounded-l-2xl border-r border-[#fddfd7] bg-white/95 p-3 shadow-lg max-sm:rounded-xl">
              <span className="text-3xl font-black text-[#4285f4]">G</span>
              <div>
                <strong className="block text-xl font-medium text-[#e13e20]">
                  <CountUp end={4.9} decimals={1} />
                </strong>
                <div className="text-[10px] text-[#ffad14]">★★★★★</div>
                <small className="text-[10px] text-black/80">
                  Google Rating
                </small>
              </div>
            </article>
            {[
              { v: 5000, l: "Happy Patients", I: Users },
              { v: 30, l: "Real Patient Stories", I: Play },
              { v: 15, l: "Expert Therapists", I: Users },
            ].map(({ v, l, I }) => (
              <article
                key={l}
                className="flex h-20 items-center gap-2.5 border-r border-[#fddfd7] bg-white/95 p-3 shadow-lg last:rounded-r-2xl max-sm:rounded-xl"
              >
                <I className="h-8 w-8 text-[#e13e20] opacity-60" />
                <div>
                  <strong className="block text-xl font-medium text-[#e13e20]">
                    <CountUp end={v} suffix="+" />
                  </strong>
                  <small className="whitespace-nowrap text-[10px] text-black/80">
                    {l}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="absolute left-[51%] top-[24%] z-6 w-[236px] max-[1100px]:hidden">
          <div className="flex h-[78px] justify-center pt-1" aria-hidden="true">
            <span className="relative block h-[52px] w-[52px] -rotate-45 rounded-[50%_50%_50%_0] bg-[#e13e20] shadow-[0_8px_12px_rgba(0,0,0,.35)]">
              <i className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </span>
          </div>
          <div className="rounded-[18px] bg-white/95 p-5 text-[11px] font-medium leading-5 shadow-xl">
            <h2 className="mb-2 text-[17px]">Ayush Ortho Clinic</h2>
            <div>
              <b className="text-[#ffad14]">4.9 ★★★★★</b>{" "}
              <span className="text-black/80">(512)</span>
            </div>
            <p className="my-3">
              No. 15, 2nd Main Rd, Opp. to
              <br />
              Nolambur Bus Stand.
              <br />
              Mogappair West, Chennai - 600037
            </p>
            <p className="mb-3">
              <b className="text-[#e13e20]">Open</b> · Closes 9 PM
            </p>
            <a
              href="https://maps.google.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#e13e20] px-4 py-2 text-white no-underline"
            >
              Get Directions <Navigation size={15} />
            </a>
          </div>
        </aside>

        <aside className="absolute right-[3%] top-[4%] z-7 w-[332px] max-[1100px]:right-[2%] max-sm:relative max-sm:right-auto max-sm:top-auto max-sm:mt-7 max-sm:w-full">
          <div className="relative h-[480px] overflow-hidden rounded-2xl bg-[#222] shadow-2xl after:absolute after:inset-0 after:bg-[linear-gradient(#0009,transparent_21%,transparent_63%,#0007)] max-sm:h-[500px]">
            <img
              src="/ayush-influencer-treatment.png"
              alt="Ayush Ortho therapist helping a patient"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-3 right-3 left-3 z-2 flex items-center text-[10px] text-white">
              <span className="mr-2 h-8 w-8 rounded-full border-2 border-white bg-[url('/ayush-influencer-treatment.png')] bg-cover" />
              <div className="flex flex-col">
                <b>iamkarthickk</b>
                <small>312K Followers</small>
              </div>
              <button className="ml-auto flex gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-2">
                <Play size={13} fill="white" />
                Watch Reels
              </button>
            </div>
            <div className="absolute left-[53px] top-[105px] z-2 text-[22px] font-medium text-[#e13e20]">
              AYUSH ORTHO
            </div>
            <div className="absolute right-3 bottom-6 z-2 flex flex-col items-center gap-4 text-[8px] text-white">
              <span>
                <Heart fill="white" />
                12.5K
              </span>
              <span>
                <MessageCircle />
                128
              </span>
              <Send />
              <Volume2 />
            </div>
          </div>
          <div className="mt-2 grid h-28 grid-cols-[repeat(3,1fr)_86px] gap-2 max-sm:grid-cols-[repeat(3,1fr)_70px]">
            {stories.map((x, i) => (
              <article
                key={x}
                className="overflow-hidden rounded-xl bg-white text-[7px] shadow-lg"
              >
                <div
                  className="h-[72px] bg-[url('/ayush-influencer-treatment.png')] bg-[length:320%]"
                  style={{ backgroundPosition: `${i * 31 + 24}% 37%` }}
                />
                <b className="block px-2 pt-1">{x}</b>
                <small className="px-2 text-black/80">
                  ● {i ? "350K" : "380K"}
                </small>
              </article>
            ))}
            <a
              href="#stories"
              className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#e13e20] to-[#b92f18] text-white no-underline"
            >
              <strong className="text-2xl font-medium">+<CountUp end={27} /></strong>
              <small>More Stories</small>
              <ChevronRight size={15} />
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
