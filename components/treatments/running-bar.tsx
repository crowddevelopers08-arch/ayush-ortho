import { runningBarItems } from "./data";

export default function RunningBar() {
  // Each copy is wider than large screens; two copies let the -50% translate loop seamlessly.
  const track = [...runningBarItems, ...runningBarItems, ...runningBarItems];

  return (
    <div className="overflow-hidden bg-[#e13e20] py-2.5 text-white" aria-label={runningBarItems.join(", ")}>
      <div className="flex w-max animate-[treatments-marquee_28s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {track.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap text-[13px] font-medium tracking-[.6px] uppercase sm:text-sm">
                <span className="px-5 sm:px-7">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
