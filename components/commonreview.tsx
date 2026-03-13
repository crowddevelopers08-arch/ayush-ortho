"use client";
import React from "react";

const Commontestimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "I was struggling with knee pain for over a year. Doctors recommended surgery. Ayush Ortho helped me recover completely with a 14-day plan — no surgery needed.",
      name: "Revathi M",
      age: 48,
      location: "Madipakkam",
    },
    {
      quote:
        "Back pain from work-from-home was ruining my focus. Within 7 sessions at Ayush Ortho, posture therapy changed everything. Pain's gone.",
      name: "Anand R",
      age: 36,
      location: "Velachery",
    },
    {
      quote:
        "I had tried multiple clinics for shoulder pain. Their 21-day plan combining Varma + Ayurveda worked wonders. No pills. No injections.",
      name: "Surendar K",
      age: 42,
      location: "Tambaram East",
    },
  ];

  return (
    <section className="w-full bg-white py-4 sm:py-6 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-10">
      {/* Heading */}
      <div className="text-center mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-[40px] max-[470px]:text-[22px] sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-orange-600 mb-4">
          Stories of Trust and Transformation
        </h2>
        {/* Stars */}
        <div className="flex justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.176 0l-3.37 2.449c-.785.57-1.84-.197-1.54-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.057 9.382c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.955z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white border border-orange-100 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center sm:text-left"
          >
            <p className="text-gray-800 text-base sm:text-lg lg:text-[16px] leading-relaxed sm:leading-loose mb-2 sm:mb-2 font-medium">
              “{t.quote}”
            </p>
            <p className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
              — {t.name}, {t.age}, {t.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Commontestimonials;