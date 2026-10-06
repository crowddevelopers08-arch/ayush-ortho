"use client";

import { useEffect, useState } from "react";
import { heroImages } from "./data";

const INTERVAL_MS = 3500;

// Arch-framed photo that cross-fades through the treatment images one by one.
export default function HeroImageSlider({ className }: { className: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % heroImages.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [active]); // restarting on change keeps a full interval after a manual dot click

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 -m-6 rounded-full bg-[#fbd5cb] opacity-60 blur-3xl" />
      <div className={`relative w-full overflow-hidden rounded-t-full border-[3px] border-[#f4b8a8] bg-[#fde4de] ${className}`}>
        {heroImages.map(({ src, alt, position }, i) => (
          <img
            key={src}
            src={src}
            alt={i === active ? alt : ""}
            aria-hidden={i !== active}
            loading={i === 0 ? "eager" : "lazy"}
            style={{ objectPosition: position }}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
              i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-3.5 flex justify-center gap-1.5">
          {heroImages.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
