"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { useState } from "react";
import Carousel from "./carousel";
import { googleReviews } from "./data";

const CLAMP_AT = 220;

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({ url, name, text }: (typeof googleReviews)[number]) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > CLAMP_AT;

  return (
    <article className="relative flex h-full flex-col rounded-[22px] border border-[#e3e7ee] bg-white p-5 transition hover:border-[#e13e20]/30 sm:p-6">
      <Quote className="absolute top-5 right-5 h-9 w-9 fill-[#fde4de] text-[#fde4de]" />

      <div className="flex items-center gap-3 pr-12">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#142544] text-lg font-semibold text-white">
          {name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-[#142544]">{name}</p>
          <p className="flex items-center gap-1.5 text-xs text-[#68758a]">
            <GoogleMark className="h-3.5 w-3.5" /> Google review
          </p>
        </div>
      </div>

      <p className={`mt-4 text-[14.5px] leading-[1.7] whitespace-pre-line text-[#3d4a5f] ${isLong && !expanded ? "line-clamp-5" : ""}`}>
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-[13px] font-semibold text-[#142544] underline decoration-[#e13e20]/40 underline-offset-4 hover:decoration-[#e13e20]"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-auto inline-flex items-center gap-1 self-start pt-5 text-[13px] font-semibold text-[#e13e20]"
      >
        Read on Google
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
}

export default function TestimonialSection() {
  return (
    <section className="bg-[#f7f8fa] px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#142544] shadow-sm ring-1 ring-[#e3e7ee]">
            <GoogleMark className="h-4 w-4" /> Google Reviews
          </span>
          <h2 className="mt-4 text-[26px] leading-tight font-semibold text-[#142544] sm:text-[34px] lg:text-[38px]">What Our Patients Say</h2>
        </div>

        <div className="mt-10">
          <Carousel
            label="Patient reviews"
            slides={googleReviews.map((review) => (
              <ReviewCard key={review.url} {...review} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
