import { ArrowRight, CheckCircle2 } from "lucide-react";
import Carousel from "./carousel";
import { BOOKING_ANCHOR, painCategories } from "./data";

export default function PainSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="text-[13px] font-semibold tracking-[1.5px] text-[#e13e20] uppercase">Conditions We Treat</span>
          <h2 className="mt-3 text-[22px] leading-[1.3] font-semibold text-[#142544] sm:text-[30px] lg:text-[36px]">
            Explore personalised integrated care for a range of joint, muscle and mobility concerns.
          </h2>
        </div>

        <div className="mt-10 sm:mt-12">
          <Carousel
            label="Conditions we treat"
            slides={painCategories.map(({ title, image, points }) => (
              <article
                key={title}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e3e7ee] bg-white transition duration-300 hover:border-[#e13e20]/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d1a33]">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a33] via-[#0d1a33]/35 to-transparent" />
                  <h3 className="absolute inset-x-0 bottom-0 p-5 text-lg leading-snug font-semibold text-white sm:text-xl">{title}</h3>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <ul className="space-y-3">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-[14px] leading-6 text-[#5b677a]">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#e13e20]" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a href={BOOKING_ANCHOR} className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-sm font-semibold text-[#e13e20]">
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
