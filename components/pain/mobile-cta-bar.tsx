import { CalendarCheck } from "lucide-react";
import { BOOKING_ANCHOR } from "./data";

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e3e7ee] bg-white/95 p-2.5 shadow-[0_-8px_24px_rgba(20,37,68,.12)] backdrop-blur sm:hidden">
      <a
        href={BOOKING_ANCHOR}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#e13e20] text-[15px] font-semibold text-white"
      >
        <CalendarCheck className="h-4.5 w-4.5" /> Book Now
      </a>
    </div>
  );
}
