"use client";
import React, { useEffect, useRef, useState } from 'react';

const Neckfive: React.FC = () => {
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
      { threshold: 0.3 } // Trigger when 30% of component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const cards = [
    {
      id: 1,
      title: "Chronic Pain Patients",
      plan: "Ideal Plan: 14 or 21 Days",
      description: "“Still living with neck/shoulder pain? Get back to life with expert-guided recovery.”"
    },
    {
      id: 2,
      title: "Surgery-Avoidant Patients",
      plan: "Ideal Plan: 14 or 21 Days",
      description: "“Told you need surgery? Explore our proven non-surgical therapy plans first.”"
    },
    {
      id: 3,
      title: "Sedentary Professionals",
      plan: "Ideal Plan: 7 or 14 Days",
      description: "“Desk job strain? Fix posture-related neck & shoulder pain quickly and safely.”"
    }
  ];

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div 
      ref={containerRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 max-[470px]:py-2 font-sans relative" style={{fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Title Section */}
      <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl pb-4 sm:pb-5 lg:pb-6 font-bold text-gray-900 mb-4 max-[470px]:mb-0 max-[470px]:pb-0 sm:mb-6">
        Who Is <span className="text-[#e13e20] font-bold">Ayush Ortho's Shoulder & Neck</span> Treatment For
      </h2>
      
      {/* Three Cards in Single Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: isVisible ? `${0.1 + (index * 0.2)}s` : '0s' 
            }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              {card.title}
            </h3>
            <p className="font-bold text-[#e13e20] text-base sm:text-lg mb-3 sm:mb-4">
              {card.plan}
            </p>
            <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Neckfive;