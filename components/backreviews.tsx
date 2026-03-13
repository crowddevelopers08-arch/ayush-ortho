"use client";
import React, { useEffect, useRef, useState } from "react";

interface Testimonial {
  name: string;
  text: string;
  condition: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ramesh K., 42",
    condition: "IT Professional",
    text: "“I had severe back pain from sitting long hours. After a 14-day plan at Ayush Ortho, I feel more active and pain-free.”",
  },
  {
    name: "Uma Devi, 50",
    condition: "Homemaker",
    text: "“My disc bulge pain was unbearable. With their Varma + OMT sessions, I avoided surgery and found real relief.”",
  },
  {
    name: "Sanjay R., 35",
    condition: "Banker",
    text: "“I was struggling with sciatica for months. The 21-day program not only reduced my pain but also improved my posture.”",
  },
];

export default function Backreviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to prevent re-animation
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% of component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section 
      ref={containerRef}
      className="py-8 sm:py-6 max-[470px]:py-4 rounded-3xl md:py-8" style={{
        background: "linear-gradient(to right, #ffbdb2, #ffd1c9, #ffbdb2)", fontFamily: "'Outfit', sans-serif"
      }}       
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl text-center sm:text-3xl lg:text-4xl pb-4 max-[470px]:pb-0 sm:pb-5 lg:pb-6 font-bold text-gray-900 mb-4 sm:mb-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Patient <span className="text-[#e13e20] font-bold">Testimonials</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 text-center flex flex-col items-center transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : i % 3 === 0 
                    ? '-translate-x-10 opacity-0'  // Left card
                    : i % 3 === 1 
                      ? 'translate-y-10 opacity-0' // Middle card (comes from bottom)
                      : 'translate-x-10 opacity-0' // Right card
              }`}
              style={{ transitionDelay: isVisible ? `${0.2 + i * 0.2}s` : '0s' }}
            >
              {/* Stars only (Google logo removed as requested) */}
              <div className="flex space-x-0.5 sm:space-x-1 mb-4 sm:mb-5 md:mb-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.382-2.46a1 1 0 00-1.175 0l-3.382 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 lg:mb-7 font-medium">
                {item.text}
              </p>

              {/* User profile icon & Name */}
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 sm:border-2">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base block">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    {item.condition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}