"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";
import Carousel from "./carousel";
import { videoIds } from "./data";

// Shows the YouTube thumbnail and only loads the player on click, so the embeds
// don't slow down the page for ad traffic.
function LiteYouTube({
  id,
  index,
  playing,
  onPlay,
}: {
  id: string;
  index: number;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#0d1a33] shadow-[0_16px_40px_rgba(0,0,0,.35)] ring-1 ring-white/10">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={`Ayush Ortho patient video ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play patient video ${index + 1}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e13e20] text-white shadow-[0_0_0_10px_rgba(225,62,32,.25)] transition group-hover:scale-110 sm:h-16 sm:w-16">
            <Play className="ml-1 h-6 w-6 fill-white sm:h-7 sm:w-7" />
          </span>
        </button>
      )}
    </div>
  );
}

export default function VideoSection() {
  // Only one video plays at a time; sliding away stops it.
  const [playingId, setPlayingId] = useState<string | null>(null);
  const stopPlayback = useCallback(() => setPlayingId(null), []);

  return (
    <section className="bg-[#0d1a33] px-4 py-14 text-white sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <span className="text-[13px] font-semibold tracking-[1.5px] text-[#ff8a70] uppercase">Patient Videos</span>
          <h2 className="mt-3 text-[26px] leading-tight font-semibold sm:text-[34px] lg:text-[40px]">Hear From Our Patients</h2>
        </div>

        <div className="mt-10 sm:mt-12">
          <Carousel
            label="Patient videos"
            tone="dark"
            onSlideChange={stopPlayback}
            slides={videoIds.map((id, i) => (
              <LiteYouTube key={id} id={id} index={i} playing={playingId === id} onPlay={() => setPlayingId(id)} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
