"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { patientVideos } from "./data";

// Each video gets up to this much playback before the next one comes forward.
// It counts playback time, so pausing the video also pauses the rotation.
const ROTATE_AFTER_SECONDS = 45;

// Where each card sits relative to the active one: in front, or tucked behind on either
// side and tilted outwards. Rotation animates with the slide when a card moves.
const positions = {
  center: "z-20 translate-x-0 rotate-0 scale-100 opacity-100",
  right: "z-10 translate-x-[34%] rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80",
  left: "z-10 -translate-x-[34%] -rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80",
  hidden: "z-0 scale-75 opacity-0 pointer-events-none",
};

function slotFor(index: number, active: number, count: number): keyof typeof positions {
  const offset = (index - active + count) % count;
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === count - 1) return "left";
  return "hidden";
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * Stacked patient-video carousel for the hero: the active video plays in front with
 * sound, the neighbours peek out behind it, and the next video comes forward after
 * 45s of playback (or when the video ends).
 */
export default function PatientVideoCarousel() {
  const count = patientVideos.length;
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  // True when the browser refused unmuted autoplay and we fell back to muted.
  const forcedMute = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
      setTime(0);
      setDuration(0);
    },
    [count],
  );

  // Start each new video with sound. Browsers block unmuted autoplay until the visitor
  // has interacted with the page; if blocked, play muted instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    // Pick up anything that happened before React attached its event handlers.
    setPlaying(!video.paused);
    if (video.readyState >= 1 && Number.isFinite(video.duration)) setDuration(video.duration);
    video.play().catch(() => {
      forcedMute.current = true;
      video.muted = true;
      setMuted(true);
      video.play().catch(() => setPlaying(false));
    });
    // Only on a new video; mute toggles are handled by the button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Turn the sound on at the visitor's next interaction if we had to start muted.
  // That same tap shouldn't also pause the video or flip the mute button back off.
  // Clicks land after the pointer is released, so ignore toggles for a short window.
  const ignoreToggleUntil = useRef(0);
  useEffect(() => {
    const unmute = (e: Event) => {
      if (!forcedMute.current) return;
      if (e.target instanceof Element && e.target.closest("[data-mute-toggle]")) return;
      forcedMute.current = false;
      const video = videoRef.current;
      if (video) video.muted = false;
      setMuted(false);
      ignoreToggleUntil.current = Date.now() + 1000;
    };
    window.addEventListener("pointerdown", unmute);
    window.addEventListener("keydown", unmute);
    return () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || Date.now() < ignoreToggleUntil.current) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    forcedMute.current = false;
    const next = !muted;
    if (video) video.muted = next;
    setMuted(next);
  };

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = seconds;
  };

  const arrow =
    "absolute top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#d9dee7] bg-white text-[#142544] shadow-sm transition hover:border-[#e13e20] hover:bg-[#e13e20] hover:text-white";
  const controlButton =
    "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#e13e20]";

  return (
    <div className="relative py-4 lg:w-[460px]" role="region" aria-roledescription="carousel" aria-label="Patient videos">
      <div className="relative mx-auto aspect-[9/16] w-[230px] sm:w-[300px]">
        {patientVideos.map((video, i) => {
          const slot = slotFor(i, active, count);
          const label = `${video.name} – ${video.concern}`;
          return (
            <div
              key={video.src}
              aria-hidden={slot !== "center"}
              className={`absolute inset-0 overflow-hidden rounded-[22px] bg-[#0d1a33] shadow-[0_14px_34px_rgba(20,37,68,.28)] ring-1 ring-black/5 transition-all duration-700 ease-out ${positions[slot]}`}
            >
              {slot === "center" ? (
                <>
                  <video
                    ref={videoRef}
                    src={video.src}
                    poster={video.poster}
                    title={`Patient video: ${label}`}
                    autoPlay
                    playsInline
                    preload="metadata"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onTimeUpdate={(e) => {
                      // Autoplay can start before React attaches onPlay/onLoadedMetadata,
                      // so read the real state from the element on every tick too.
                      const el = e.currentTarget;
                      const t = el.currentTime;
                      setTime(t);
                      setPlaying(!el.paused);
                      if (Number.isFinite(el.duration)) setDuration(el.duration);
                      if (count > 1 && t >= ROTATE_AFTER_SECONDS) goTo(active + 1);
                    }}
                    onEnded={() => goTo(active + 1)}
                    onClick={togglePlay}
                    className="absolute inset-0 h-full w-full cursor-pointer bg-black object-cover"
                  />

                  {!playing && (
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label="Play video"
                      className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e13e20] text-white shadow-[0_0_0_10px_rgba(225,62,32,.25)] transition hover:scale-110"
                    >
                      <Play className="ml-1 h-6 w-6 fill-white" />
                    </button>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pt-12 pb-3">
                    <p className="text-[15px] leading-tight font-semibold text-white">{video.name}</p>
                    <p className="mt-0.5 text-[11px] font-medium tracking-[1px] text-[#ff8a70] uppercase">{video.concern}</p>

                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={Math.min(time, duration || 0)}
                      onChange={(e) => seek(Number(e.target.value))}
                      aria-label="Seek video"
                      className="mt-2.5 h-1 w-full cursor-pointer accent-[#e13e20]"
                    />

                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className={controlButton}>
                        {playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="ml-0.5 h-4 w-4 fill-white" />}
                      </button>
                      <span className="text-xs font-medium text-white/85 tabular-nums">
                        {formatTime(time)} / {formatTime(duration)}
                      </span>
                      <button
                        type="button"
                        onClick={toggleMute}
                        data-mute-toggle
                        aria-label={muted ? "Unmute video" : "Mute video"}
                        className={`${controlButton} ml-auto`}
                      >
                        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  tabIndex={slot === "hidden" ? -1 : 0}
                  onClick={() => goTo(i)}
                  aria-label={`Show patient video: ${label}`}
                  className="absolute inset-0 h-full w-full"
                >
                  <img src={video.poster} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous video" className={`${arrow} left-0`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next video" className={`${arrow} right-0`}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
