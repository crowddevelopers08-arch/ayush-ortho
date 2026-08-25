import {
  Accessibility,
  Activity,
  ArrowRight,
  Bone,
  Dumbbell,
  Move,
  PersonStanding,
} from "lucide-react";

const journeyPoints = [
  { label: "Persistent Knee Pain", icon: Activity },
  { label: "Back and Spine-Related Pain", icon: Bone },
  { label: "Neck and Shoulder Pain", icon: Accessibility },
  { label: "Joint Stiffness", icon: Move },
  { label: "Mobility Concerns", icon: PersonStanding },
  { label: "Sports and Activity-Related Discomfort", icon: Dumbbell },
];

export default function SuccessJourney() {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 font-[var(--font-geist)] sm:px-8 lg:px-14 lg:py-20">
      <div className="mx-auto grid max-w-[1580px] items-center gap-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
        <div>
          <div className="flex items-center gap-3 text-[17px] font-medium text-[#162746]">
            <span className="h-[17px] w-[11px] bg-[#3768ed]" />
            Common Conditions We Help Address
          </div>

          <h2 className="mt-8 max-w-[800px] text-[40px] leading-[1.16] font-semibold tracking-[-1.2px] text-[#122445] sm:text-[50px] lg:text-[58px]">
            PAIN SHOULDN&apos;T CONTROL<br />YOUR DAILY LIFE
          </h2>

          <p className="mt-6 max-w-[850px] text-[16px] leading-[2] text-[#94a1b5] sm:text-[18px]">
            Whether you&apos;re struggling with pain while walking, climbing stairs, working, sleeping or performing daily activities, getting the right assessment is the first step.<br /><br />At Ayush Ortho, we help you understand your condition and explore suitable treatment options.
          </p>

          <div className="mt-12 grid max-w-[850px] gap-x-14 gap-y-5 sm:grid-cols-2">
            {journeyPoints.map(({ label, icon: Icon }) => (
              <article key={label} className="flex items-center gap-5">
                <span className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full bg-[#eef1ff] text-[#3564ef]">
                  <Icon className="h-9 w-9" strokeWidth={1.5} />
                </span>
                <strong className="text-[17px] font-normal text-[#162746] sm:text-[20px]">{label}</strong>
              </article>
            ))}
          </div>

          <a href="#consultation" className="group relative mt-10 inline-flex h-[50px] min-w-[210px] items-center justify-center gap-3 overflow-hidden rounded-full bg-[#e13e20] px-6 font-['Rubik',sans-serif] text-sm text-white no-underline shadow-[0_4px_14px_rgba(0,0,0,.2)] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-[220%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-white/70 before:via-white/20 before:to-transparent before:transition-transform before:duration-1000 hover:before:translate-x-[350%]">
            <span className="relative z-10">Book Your Consultation</span><ArrowRight className="relative z-10 h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <img src="/images-ortho-1.jpg" alt="Preeminent award recognition" className="w-full max-w-[610px] opacity-85" />
        </div>
      </div>
    </section>
  );
}
