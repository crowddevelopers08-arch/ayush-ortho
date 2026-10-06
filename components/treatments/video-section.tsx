"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";
import Carousel from "./carousel";
import { patientVideos } from "./data";

type PatientVideo = (typeof patientVideos)[number];

// Shows a poster frame and only loads the MP4 on click, so the videos
// don't slow down the page for ad traffic.
function VideoCard({
  video,
  playing,
  onPlay,
  onEnd,
}: {
  video: PatientVideo;
  playing: boolean;
  onPlay: () => void;
  onEnd: () => void;
}) {
  const label = `${video.name} – ${video.concern}`;

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[20px] sm:max-w-none bg-[#0d1a33] shadow-[0_16px_40px_rgba(0,0,0,.35)] ring-1 ring-white/10">
      {playing ? (
        <video
          src={video.src}
          poster={video.poster}
          title={`Patient video: ${label}`}
          controls
          autoPlay
          playsInline
          onEnded={onEnd}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      ) : (
        <button type="button" onClick={onPlay} aria-label={`Play patient video: ${label}`} className="group absolute inset-0 h-full w-full">
          <img
            src={video.poster}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e13e20] text-white shadow-[0_0_0_10px_rgba(225,62,32,.25)] transition group-hover:scale-110 sm:h-16 sm:w-16">
            <Play className="ml-1 h-6 w-6 fill-white sm:h-7 sm:w-7" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left">
            <span className="block text-base font-semibold text-white">{video.name}</span>
            <span className="mt-0.5 block text-xs font-medium tracking-[1px] text-[#ff8a70] uppercase">{video.concern}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function VideoSection() {
  // Only one video plays at a time; sliding away stops it.
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const stopPlayback = useCallback(() => setPlayingSrc(null), []);

  return (
    <section className="bg-[#0d1a33] px-4 py-9 text-white sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1040px]">
        <div className="text-center">
          <span className="text-[13px] font-semibold tracking-[1.5px] text-[#ff8a70] uppercase">Patient Videos</span>
          <h2 className="mt-3 text-[26px] leading-tight font-semibold sm:text-[34px] lg:text-[40px]">Hear From Our Patients</h2>
        </div>

        <div className="mt-6 sm:mt-12">
          <Carousel
            label="Patient videos"
            tone="dark"
            // One video per slide on phones, two on tablets, all three side by side on desktop.
            slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
            onSlideChange={stopPlayback}
            paused={playingSrc !== null}
            slides={patientVideos.map((video) => (
              <VideoCard
                key={video.src}
                video={video}
                playing={playingSrc === video.src}
                onPlay={() => setPlayingSrc(video.src)}
                onEnd={stopPlayback}
              />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
