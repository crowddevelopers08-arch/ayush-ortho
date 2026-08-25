const reasons = [
  {
    title: <>Advanced<br />Orthopedic Care</>,
    description: <>A comprehensive approach focused on understanding and managing your pain.</>,
    iconPath: "/why-icon-1.png",
  },
  {
    title: <>Personalised<br />Treatment Plans</>,
    description: <>Every patient is different. Your treatment plan is based on your individual condition and requirements.</>,
    iconPath: "/why-icon-2.png",
  },
  {
    title: <>Modern<br />Treatment Approach</>,
    description: <>We combine clinical assessment with appropriate therapy and rehabilitation techniques.</>,
    iconPath: "/why-icon-3.png",
  },
  {
    title: <>Holistic<br />Approach</>,
    description: <>Our focus goes beyond temporary relief by understanding the factors contributing to your discomfort.</>,
    iconPath: "/why-icon-4.png",
  },
  {
    title: <>Safe &amp; Patient-Focused<br />Care</>,
    description: <>Your treatment journey is guided by trained professionals with a focus on comfort and appropriate care.</>,
    iconPath: "/why-icon-5.png",
  },
];

export default function WhyChooseAyush() {
  return (
    <section className="bg-white px-4 max-sm:py-6 py-10 font-[var(--font-geist)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="mb-5 text-[26px] font-semibold tracking-[-.6px] text-black sm:text-[30px]">
          WHY CHOOSE <span className="text-[#e13e20]">AYUSH ORTHO?</span>
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          {reasons.map(({ title, description, iconPath }, index) => (
            <article
              key={index}
              className="flex min-h-[238px] flex-col items-center justify-center rounded-[13px] border border-[#e7ece8] bg-white px-5 py-6 text-center shadow-[0_4px_16px_rgba(38,67,54,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(38,67,54,.09)]"
            >
              <span className="mb-5 grid h-[62px] w-[62px] place-items-center rounded-full bg-[#fff0ec]">
                <img src={iconPath} alt="" className="h-9 w-9 object-contain [filter:brightness(0)_saturate(100%)_invert(31%)_sepia(98%)_saturate(2100%)_hue-rotate(353deg)_brightness(94%)]" />
              </span>
              <h3 className="text-[16px] leading-[1.4] font-semibold text-[#e13e20]">{title}</h3>
              <p className="mt-4 text-[13px] leading-[1.65] text-[#555d59]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
