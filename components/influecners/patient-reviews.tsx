"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    review: "Amazing experience! The therapy and care I received helped me avoid surgery. Highly recommended!",
    name: "Karthik R",
    location: "Chennai",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main1.jpg",
  },
  {
    review: "Professional team, advanced treatment, and visible results. Thank you Ayush Ortho!",
    name: "Priya S",
    location: "Tambaram",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main2.jpg",
  },
  {
    review: "I had severe back pain for years. Now I’m pain-free and back to my routine!",
    name: "Vignesh V",
    location: "Avadi",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main3.jpg",
  },
  {
    review: "Best orthopedic care I’ve experienced. Friendly staff and great support!",
    name: "Deepa M",
    location: "Mogappair",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main4.jpg",
  },
  {
    review: "The doctors explained my condition clearly and the treatment helped me return to daily activities.",
    name: "Arun K",
    location: "Anna Nagar",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/main5.jpg",
  },
];

function GoogleMark() {
  return <span className="bg-[conic-gradient(from_-45deg,#4285f4_0_25%,#34a853_0_48%,#fbbc05_0_73%,#ea4335_0)] bg-clip-text text-[26px] font-black text-transparent">G</span>;
}

export default function PatientReviews() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setPage(current => {
        const next = (current + 1) % 3;
        const carousel = carouselRef.current;
        if (carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          carousel.scrollTo({
            left: next === 0 ? 0 : Math.min(next * 320, maxScroll),
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const move = (direction: number) => {
    carouselRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
    setPage(current => Math.max(0, Math.min(2, current + direction)));
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-12 font-[var(--font-geist)] sm:px-7 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex items-center justify-between gap-5 px-2 sm:px-7">
          <h2 className="text-[26px] uppercase font-semibold tracking-[-.4px] text-black sm:text-[30px]">What Our <span className="text-[#e13e20]">Patients Say</span></h2>
          <a href="#all-reviews" className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#e13e20] no-underline sm:text-sm">View All Reviews <ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="relative px-2 sm:px-7" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div ref={carouselRef} className="grid snap-x snap-mandatory grid-flow-col auto-cols-[98%] gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[48%] lg:auto-cols-[calc((100%-72px)/4)]">
            {reviews.map(({ review, name, location, image }) => (
              <article key={name} className="flex min-h-[220px] snap-start flex-col rounded-[16px] border border-[#e9eeeb] bg-white px-6 py-5 shadow-[0_5px_20px_rgba(37,61,51,.07)]">
                <div className="flex items-center gap-3"><GoogleMark /><span className="text-[18px] tracking-[3px] text-[#ffad16]">★★★★★</span></div>
                <p className="mt-3 flex-1 text-[14px] leading-[1.55] font-medium text-[#303532] sm:text-[15px]">{review}</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={image} alt={name} className="h-10 w-10 rounded-full border border-[#dfe6e1] object-cover" />
                  <div><strong className="block text-xs font-semibold text-[#2f3431]">{name}</strong><small className="mt-0.5 block text-[10px] text-[#65706a]">{location}</small></div>
                </div>
              </article>
            ))}
          </div>

        </div>

        <div className="mt-3 flex items-center justify-center gap-4" aria-label="Review carousel pagination">
          <button type="button" aria-label="Previous reviews" onClick={() => move(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#f2d8d2] bg-white text-[#e13e20] shadow-[0_4px_12px_rgba(35,63,51,.1)] transition hover:scale-105"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map(index => <button key={index} type="button" aria-label={`Go to review page ${index + 1}`} onClick={() => { setPage(index); carouselRef.current?.scrollTo({ left: index * 640, behavior: "smooth" }); }} className={`h-1.5 rounded-full transition-all ${page === index ? "w-8 bg-[#e13e20]" : "w-5 bg-[#f0d9d4]"}`} />)}
          </div>
          <button type="button" aria-label="Next reviews" onClick={() => move(1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#f2d8d2] bg-white text-[#e13e20] shadow-[0_4px_12px_rgba(35,63,51,.1)] transition hover:scale-105"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
