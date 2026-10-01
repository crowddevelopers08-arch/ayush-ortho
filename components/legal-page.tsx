import { ReactNode } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { Thankheader } from "@/components/thankheader";

export type LegalSection = {
  heading: string;
  content: ReactNode;
};

export const LEGAL_LAST_UPDATED = "1 October 2026";

// Shared layout for the policy pages, matching the Privacy Policy page styling.
export function LegalPage({ title, intro, sections }: { title: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <>
      <Thankheader />
      <div className="bg-gradient-to-b from-gray-50 to-white px-4 py-6 sm:py-8">
        <article className="mx-auto w-full max-w-4xl rounded-lg bg-white px-4 py-8 leading-relaxed text-gray-800 shadow-md sm:px-8">
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-[#e13e20]" />
          </div>

          <header className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-black md:text-4xl">{title}</h1>
            <p className="text-gray-500">Last updated: {LEGAL_LAST_UPDATED}</p>
          </header>

          <div className="mb-8 rounded-lg border-l-4 border-[#e13e20] bg-orange-50 p-5 text-base text-gray-700 sm:p-6 md:text-lg">{intro}</div>

          {sections.map(({ heading, content }, i) => (
            <section key={heading} className="mb-8">
              <h2 className="mb-3 flex items-center gap-3 text-xl font-semibold text-[#e13e20]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e13e20] text-sm text-white">{i + 1}</span>
                {heading}
              </h2>
              <div className="space-y-3 text-gray-700 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{content}</div>
            </section>
          ))}

          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-3 text-xl font-semibold text-[#e13e20]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e13e20] text-white">
                <Phone className="h-4 w-4" />
              </span>
              Contact Us
            </h2>
            <div className="space-y-3 rounded-lg bg-gray-50 p-5 text-gray-700">
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#e13e20]" />
                <a href="tel:+919150010387" className="font-semibold text-black">
                  +91 91500 10387
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#e13e20]" />
                23/5A Valmiki Street, East Tambaram, Chennai – 600059
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-[#e13e20]" />
                Open Daily: 10 AM – 8 PM
              </p>
            </div>
          </section>

          <footer className="border-t pt-6 text-center text-sm text-gray-600">
            Read also our{" "}
            <a href="/privacy-policy" className="font-semibold text-[#e13e20] hover:underline">
              Privacy Policy
            </a>
            ,{" "}
            <a href="/terms-and-conditions" className="font-semibold text-[#e13e20] hover:underline">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="/cancellation-refund-policy" className="font-semibold text-[#e13e20] hover:underline">
              Cancellation &amp; Refund Policy
            </a>
            .
          </footer>
        </article>
      </div>
    </>
  );
}
