"use client";
import React from "react";

const Commonfive: React.FC = () => {
  const cards = [
    {
      img: "https://ik.imagekit.io/wwdlbhsjw/public/sub1.jpg", // replace with your image path
      title: "Chronic Pain Sufferers (Age 30–55)",
      text: "Struggling for months/years with pain that affects your lifestyle? This is for you.",
      plan: "14 or 21 Days",
      quote:
        "Still living with pain? Get back to life with our expert-guided recovery.",
    },
    {
      img: "https://ik.imagekit.io/wwdlbhsjw/public/sub2.jpg",
      title: "Surgery-Avoidant Patients",
      text: "Told you need surgery? Try our non-invasive therapies before deciding.",
      plan: "14 or 21 Days",
      quote:
        "Avoid surgery. Heal naturally. Try our proven non-surgical recovery plans.",
    },
    {
      img: "https://ik.imagekit.io/wwdlbhsjw/public/sub3.jpg",
      title: "Sedentary Professionals (Age 30–45)",
      text: "Working long hours from a desk? Pain creeping into your back, neck, or knees?",
      plan: "7 or 14 Days",
      quote:
        "Back pain from Zoom calls? Fix your posture and feel relief — fast.",
    },
  ];

  return (
    <section className="bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[40px] max-[470px]:text-[22px] md:text-[40px] lg:text-[40px] font-bold text-orange-600 max-[470px]:mb-5 mb-10 md:mb-12">
          Who Is Ayush Ortho's Treatment For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
            >
              <div className="w-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-64 md:h-72 object-cover"
                />
              </div>

              <div className="p-3 md:p-3 lg:p-4 flex flex-col flex-1">
                <h3 className="text-[21px] md:text-[21px] max-[470px]:text-[22px] lg:text-[21px] font-bold text-orange-600 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-700 text-lg md:text-xl mb-0 leading-relaxed font-medium">
                  {card.text}
                </p>
                <p className="text-gray-900 text-xl font-semibold mb-3">
                  <span className="font-bold">Ideal Plan:</span> {card.plan}
                </p>
                <p className="italic text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                  "{card.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Commonfive;