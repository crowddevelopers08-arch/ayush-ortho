import { ArrowRight } from "lucide-react";

const journeyPoints = [
  { label: "Persistent Knee Pain", iconPath: "/pain-icon-1.png" },
  { label: "Back and Spine-Related Pain", iconPath: "/pain-icon-2.png" },
  { label: "Neck and Shoulder Pain", iconPath: "/pain-icon-3.png" },
  { label: "Joint Stiffness", iconPath: "/pain-icon-4.png" },
  { label: "Mobility Concerns", iconPath: "/pain-icon-5.png" },
  { label: "Sports and Activity-Related Discomfort", iconPath: "/pain-icon-6.png" },
];

export default function SuccessJourney() {
  return (
    <section className="overflow-hidden bg-white px-5 py-10 font-[var(--font-geist)] sm:px-8 sm:py-14 lg:px-14 lg:py-10">
      <div className="mx-auto grid max-w-[1740px] items-center gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-3 text-[17px] font-medium text-[#162746] lg:text-[16px]">
            {/* <span className="h-[17px] w-[11px] bg-[#e13e20] lg:h-[15px] lg:w-[10px]" /> */}
            Common Conditions We Help Address
          </div>

          <h2 className="mt-4 max-w-[800px] text-[28px] leading-[1.16] font-semibold tracking-[-1.2px] text-[#122445] sm:text-[30px] lg:leading-[1.12]">
            PAIN SHOULDN&apos;T CONTRO <span className="text-[#e13e20]">YOUR DAILY LIFE</span>
          </h2>

          <p className="mt-4 max-w-[900px] text-[16px] leading-[2] text-[#94a1b5] sm:text-[18px] lg:mt-5 lg:text-[15px] lg:leading-[1.75]">
            Whether you&apos;re struggling with pain while walking, climbing stairs, working, sleeping or performing daily activities, getting the right assessment is the first step.At Ayush Ortho, we help you understand your condition and explore suitable treatment options.
          </p>
          <p className="mt-2 max-w-[850px] text-[16px] leading-[2] text-[#94a1b5] sm:text-[18px]">
            At Ayush Ortho, we help you understand your condition and explore suitable treatment options.
          </p>

          <div className="mt-8 flex w-full justify-center lg:hidden">
            <img src="/images-ortho-1.jpg" alt="Common pain points across the body" className="aspect-square w-full max-w-[420px] rounded-[22px] object-cover " />
          </div>

          <div className="mt-12 max-sm:mt-5 grid max-w-[900px] gap-x-12 gap-y-4 sm:grid-cols-2 lg:mt-7">
            {journeyPoints.map(({ label, iconPath }) => (
              <article key={label} className="flex items-center gap-5 lg:gap-4">
                <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-[#fff0ec] text-[#e13e20] lg:h-[62px] lg:w-[62px]">
                  <img src={iconPath} alt="" className="h-11 w-11 object-contain [filter:brightness(0)_saturate(100%)_invert(31%)_sepia(98%)_saturate(2100%)_hue-rotate(353deg)_brightness(94%)] lg:h-10 lg:w-10" />
                </span>
                <strong className="text-[17px] font-normal text-[#162746] sm:text-[20px] lg:text-[16px]">{label}</strong>
              </article>
            ))}
          </div>

          <a href="#consultation" className="group relative mt-10 inline-flex h-[50px] min-w-[210px] items-center justify-center gap-3 overflow-hidden rounded-full bg-[#e13e20] px-6 font-['Rubik',sans-serif] text-sm text-white no-underline shadow-[0_4px_14px_rgba(0,0,0,.2)] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:before:translate-x-[350%] lg:mt-6 lg:h-[46px] lg:min-w-[195px] lg:text-[13px]">
            <span className="relative z-10">Book Your Consultation</span><ArrowRight className="relative z-10 h-4 w-4" />
          </a>
        </div>

        <div className="hidden items-center justify-center lg:flex lg:justify-end">
          <img src="/images-ortho-1.jpg" alt="Common pain points across the body" className="w-full max-w-[530px] rounded-[26px] object-cover opacity-85 shadow-[0_16px_40px_rgba(18,36,69,.12)]" />
        </div>
      </div>
    </section>
  );
}
