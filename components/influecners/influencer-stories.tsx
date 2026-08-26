"use client";

import {
  Accessibility,
  ArrowRight,
  CircleOff,
  Clock3,
  MapPin,
  Play,
  UsersRound,
} from "lucide-react";
import { useRef } from "react";

// const trustItems = [
//   { value: "5000+", label: "Patients Treated", icon: Accessibility },
//   { value: "30+", label: "Influencer Stories", icon: UsersRound },
//   { value: "15+", label: "Expert Therapists", icon: MapPin },
//   { value: "Surgery-Free", label: "Treatment Focus", icon: CircleOff },
//   { value: "12+", label: "Years of Excellence", icon: Clock3 },
// ];

const stories = [
  {
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main1.jpg",
    views: "145K Views",
  },
  {
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main2.jpg",
    views: "99K Views",
  },
  {
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main3.jpg",
    views: "78K Views",
  },
  {
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main4.jpg",
    views: "112K Views",
  },
  {
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main5.jpg",
    views: "89K Views",
  },
];

const heroButtonStyle =
  "group relative inline-flex h-[46px] min-w-[150px] items-center justify-center gap-2 overflow-hidden rounded-full border-0 bg-[#e13e20] px-5 text-center font-['Rubik',sans-serif] text-sm font-normal whitespace-nowrap text-white! no-underline transition-colors duration-200 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:text-[#ffccbc]! hover:before:translate-x-[350%] focus:text-[#ffccbc]! max-[480px]:h-10 max-[480px]:min-w-[140px] max-[480px]:px-4 max-[480px]:text-xs";

export default function InfluencerStories() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    carouselRef.current?.scrollBy({
      left: direction * 230,
      behavior: "smooth",
    });

  return (
    <section
      id="real-stories"
      className="bg-white px-4 max-sm:pb-5 pb-12 pt-0 font-[var(--font-geist)] text-black sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* <div className="grid min-h-[112px] grid-cols-2 overflow-hidden rounded-t-[22px] bg-[linear-gradient(110deg,#f5f7f5,#fafbf9)] px-4 py-5 sm:grid-cols-3 lg:grid-cols-5 lg:px-8 lg:py-0">
          {trustItems.map(({ value, label, icon: Icon }, index) => (
            <article key={label} className={`flex items-center justify-center gap-4 px-3 ${index ? "lg:border-l lg:border-[#dfe6e1]" : ""}`}>
              <Icon className="h-9 w-9 shrink-0 text-[#557f6e]" strokeWidth={1.6} />
              <div>
                <strong className={`${value === "Surgery-Free" ? "text-sm" : "text-xl"} block font-semibold text-[#174d3a]`}>{value}</strong>
                <small className="mt-1 block whitespace-nowrap text-[10px] text-[#637069]">{label}</small>
              </div>
            </article>
          ))}
        </div> */}

        <div className="px-3 pt-5 sm:px-7 lg:pt-12">
          <div className="mb-6 flex flex-col gap-4 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="mb-0 text-[26px] font-semibold tracking-[-.6px] text-black sm:text-[30px]">
                REAL STORIES.{" "}
                <span className="text-[#e13e20]">REAL RELIEF.</span>
              </h2>
              <p className="text-[13px] leading-snug tracking-[-.1px] text-black/70 sm:text-base lg:text-lg">
                See how patients have shared their experiences and recovery
                journeys with Ayush Ortho.
              </p>
            </div>
            <a
              href="#all-stories"
              className={`${heroButtonStyle} !hidden sm:!inline-flex`}
            >
              <span className="relative z-10">View All Stories</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
            </a>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous stories"
              onClick={() => move(-1)}
              className="absolute left-1 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#e8ece9] bg-white/95 text-[#5b8977] shadow-md backdrop-blur-sm transition hover:scale-105 sm:left-0 sm:-translate-x-1/2 lg:h-11 lg:w-11"
            >
              <ArrowRight className="h-4 w-4 rotate-180 lg:h-5 lg:w-5" />
            </button>

            <div
              ref={carouselRef}
              className="grid snap-x snap-mandatory grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[calc(50%-10px)] sm:gap-5 md:auto-cols-[30%] lg:auto-cols-[calc((100%-80px)/5)]"
            >
              {stories.map(({ image, views }, index) => (
                <article
                  key={image}
                  className="group relative aspect-[.8] snap-start overflow-hidden rounded-[15px] bg-[#ddd] shadow-sm"
                >
                  <img
                    src={image}
                    alt={`Ayush Ortho patient story ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <button
                    type="button"
                    aria-label={`Play patient story ${index + 1}`}
                    className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/90 bg-black/15 text-white backdrop-blur-[1px] transition group-hover:scale-110 sm:h-11 sm:w-11"
                  >
                    <Play
                      className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5"
                      fill="white"
                    />
                  </button>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-semibold text-white sm:bottom-3 sm:left-3 sm:text-[10px]">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4" fill="white" />
                    {views}
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next stories"
              onClick={() => move(1)}
              className="absolute right-1 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#e8ece9] bg-white/95 text-[#5b8977] shadow-md backdrop-blur-sm transition hover:scale-105 sm:right-0 sm:translate-x-1/2 lg:h-11 lg:w-11"
            >
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>

          <a
            href="#all-stories"
            className={`${heroButtonStyle} mt-6 w-full sm:!hidden`}
          >
            <span className="relative z-10">View All Stories</span>
            <ArrowRight className="relative z-10 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
