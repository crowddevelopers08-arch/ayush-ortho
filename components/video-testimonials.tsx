"use client";
import React from "react";
import Image from "next/image";

type Testimonial = {
  embedUrl: string;
};

const testimonials: Testimonial[] = [
  { embedUrl: "https://www.instagram.com/p/DBGsUfooG4o/embed" },
  { embedUrl: "https://www.instagram.com/p/DAdeS-MIW4I/embed" },
  { embedUrl: "https://www.instagram.com/p/C8mWCfuSd1e/embed" },
];

const InstagramTestimonials: React.FC = () => {
  return (
    <>
       <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="w-full px-4 py-6" style={{fontFamily: "'Outfit', sans-serif" }}>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-[40px] max-[430px]:text-[22px] font-semibold text-[#303030] mx-auto">
          From Acne Scars To Sagging Skin—Hear How Finesse Helped People Fall In Love With Their Reflection Again.
        </h2>

        {/* Stars */}
        <div className="flex justify-center mt-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-yellow-500 text-2xl md:text-3xl">★</span>
            ))}
        </div>
      </div>

      {/* Instagram Iframes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[320px] rounded-xl overflow-hidden shadow-md border border-gray-200 "style={{ minHeight: "600px" }}
          >
            <iframe
              src={item.embedUrl}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-6">
        
            <div className="flex items-center justify-center space-x-4 max-[421px]:mb-4 mb-4">
        <div className="w-30 max-[421px]:w-15 border-t-2 border-gray-400"></div>
        <span className="text-[#303030] max-[421px]:text-[18px] text-[22px] font-medium">
          Disclaimer
        </span>
        <div className="w-30 max-[421px]:w-15  border-t-2 border-gray-400"></div>
   
      </div>
               <p className="text-sm md:text-base text-gray-500">
        Results may vary for each individual.
  </p>
      </div>
    </section>
    </>
  );
};

export default InstagramTestimonials;
