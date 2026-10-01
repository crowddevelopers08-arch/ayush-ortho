import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { LOGO_URL, branches, toTelHref } from "./data";

export default function BranchesFooter() {
  return (
    <footer className="bg-[#0d1a33] text-white">
      <div className="mx-auto max-w-[1240px] px-4 pt-14 pb-10 sm:px-6 sm:pt-16 lg:pt-20">
        <div className="text-center">
          <span className="text-[13px] font-semibold tracking-[1.5px] text-[#ff8a70] uppercase">Visit Us</span>
          <h2 className="mt-3 text-[26px] leading-tight font-semibold sm:text-[34px] lg:text-[40px]">Our Branches Across Tamilnadu</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {branches.map(({ name, timings, address, phone }) => (
            <article
              key={name}
              className="flex min-w-0 flex-col rounded-[22px] border border-white/10 bg-white/[.04] p-5 transition sm:p-6 hover:border-[#e13e20]/50 hover:bg-white/[.07]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e13e20]">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{name}</h3>

              <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/70">
                <li className="flex gap-2.5">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-[#ff8a70]" />
                  {timings}
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ff8a70]" />
                  {address}
                </li>
                <li>
                  <a href={toTelHref(phone)} className="flex gap-2.5 font-medium text-white hover:text-[#ff8a70]">
                    <Phone className="mt-1 h-4 w-4 shrink-0 text-[#ff8a70]" />
                    {phone}
                  </a>
                </li>
              </ul>

              <div className="mt-auto pt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold transition hover:border-[#e13e20] hover:bg-[#e13e20]"
                >
                  <Navigation className="h-4 w-4" /> Get Directions
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-4 py-6 pb-24 text-[13px] text-white/60 sm:flex-row sm:px-6 sm:pb-6">
          <span className="rounded-lg bg-white px-2.5 py-1">
            <img src={LOGO_URL} alt="Ayush Ortho" className="h-8 w-auto" />
          </span>
          <p>© {new Date().getFullYear()} Ayush Ortho | All Rights Reserved</p>
          <a href="/privacy-policy" className="font-medium text-white/80 hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
