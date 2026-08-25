const reasons = [
  {
    title: <>Advanced<br />Orthopedic Care</>,
    description: <>A comprehensive approach focused on understanding and managing your pain.</>,
    iconPath: "/why-choose-icons/non-surgical-care.svg",
  },
  {
    title: <>Personalised<br />Treatment Plans</>,
    description: <>Every patient is different. Your treatment plan is based on your individual condition and requirements.</>,
    iconPath: "/why-choose-icons/personalized-plan.svg",
  },
  {
    title: <>Modern<br />Treatment Approach</>,
    description: <>We combine clinical assessment with appropriate therapy and rehabilitation techniques.</>,
    iconPath: "/why-choose-icons/modern-equipment.svg",
  },
  {
    title: <>Holistic<br />Approach</>,
    description: <>Our focus goes beyond temporary relief by understanding the factors contributing to your discomfort.</>,
    iconPath: "/why-choose-icons/holistic-approach.svg",
  },
  {
    title: <>Safe &amp; Patient-Focused<br />Care</>,
    description: <>Your treatment journey is guided by trained professionals with a focus on comfort and appropriate care.</>,
    iconPath: "/why-choose-icons/safe-therapies.svg",
  },
];

export default function WhyChooseAyush() {
  return (
    <section className="bg-white px-4 py-10 font-[var(--font-geist)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="mb-5 text-[26px] font-semibold tracking-[-.6px] text-black sm:text-[30px]">
          WHY CHOOSE <span className="text-[#287057]">AYUSH ORTHO?</span>
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          {reasons.map(({ title, description, iconPath }, index) => (
            <article
              key={index}
              className="flex min-h-[238px] flex-col items-center justify-center rounded-[13px] border border-[#e7ece8] bg-white px-5 py-6 text-center shadow-[0_4px_16px_rgba(38,67,54,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(38,67,54,.09)]"
            >
              <span className="mb-5 grid h-[62px] w-[62px] place-items-center rounded-full bg-[#f2f6f1]">
                <img src={iconPath} alt="" className="h-8 w-8 object-contain" />
              </span>
              <h3 className="text-[16px] leading-[1.4] font-semibold text-[#285e49]">{title}</h3>
              <p className="mt-4 text-[13px] leading-[1.65] text-[#555d59]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
