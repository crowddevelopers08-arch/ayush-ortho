"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";

type CarouselProps = {
  slides: ReactNode[];
  label: string;
  // Tailwind flex-basis classes controlling how many slides show per breakpoint.
  slideClassName?: string;
  tone?: "light" | "dark";
  onSlideChange?: () => void;
  autoplayDelay?: number;
  // Lets a parent hold autoplay, e.g. while a video in a slide is playing.
  paused?: boolean;
};

export default function Carousel({
  slides,
  label,
  slideClassName = "basis-full sm:basis-1/2 lg:basis-1/3",
  tone = "light",
  onSlideChange,
  autoplayDelay = 4000,
  paused = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interaction, setInteraction] = useState(0);

  // Autoplay: one slide every `autoplayDelay`. The timer restarts whenever the slide
  // changes or the visitor touches the carousel, so manual swipes get a full interval.
  useEffect(() => {
    if (!emblaApi || snapCount < 2 || paused || hovered || focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => emblaApi.scrollNext(), autoplayDelay);
    return () => clearTimeout(timer);
  }, [emblaApi, snapCount, paused, hovered, focused, selected, interaction, autoplayDelay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    onSlideChange?.();
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    const onReInit = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      setSelected(emblaApi.selectedScrollSnap());
    };
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi, onSelect]);

  const dark = tone === "dark";
  const arrowButton = `grid h-11 w-11 shrink-0 place-items-center rounded-full border transition hover:border-[#e13e20] hover:bg-[#e13e20] hover:text-white ${
    dark ? "border-white/20 bg-white/5 text-white" : "border-[#d9dee7] bg-white text-[#142544] shadow-sm"
  }`;

  const prevButton = (
    <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide" className={arrowButton}>
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
  const nextButton = (
    <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next slide" className={arrowButton}>
      <ChevronRight className="h-5 w-5" />
    </button>
  );
  const dots = (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: snapCount }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => emblaApi?.scrollTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === selected}
          className={`h-2 rounded-full transition-all ${
            i === selected ? "w-7 bg-[#e13e20]" : dark ? "w-2 bg-white/30 hover:bg-white/50" : "w-2 bg-[#cfd5df] hover:bg-[#aab3c2]"
          }`}
        />
      ))}
    </div>
  );

  const viewport = (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="-ml-4 flex touch-pan-y sm:-ml-5">
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={`min-w-0 shrink-0 grow-0 pl-4 sm:pl-5 ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onPointerDown={() => setInteraction((n) => n + 1)}
    >
      {viewport}
      {snapCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4 sm:mt-8 sm:gap-5">
          {prevButton}
          {dots}
          {nextButton}
        </div>
      )}
    </div>
  );
}
