"use client";
import React, { useRef, useEffect, useState } from 'react';

const WhatSetsUsApart = () => {
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

  const features = [
    {
      title: "Root-Cause Treatment",
      description: "Targets source of pain for long-lasting relief",
      direction: "top-left" // Top-left corner
    },
    {
      title: "Non-Invasive Care",
      description: "Safe OMT, chiropractic & muscle therapies",
      direction: "top-right" // Top-right corner
    },
    {
      title: "Side-Effect-Free",
      description: "100% natural, no drugs or surgery",
      direction: "bottom-left" // Bottom-left corner
    },
    {
      title: "Personalised Plans",
      description: "Tailored exercises & therapy schedules",
      direction: "bottom-right" // Bottom-right corner
    },
    {
      title: "Sustainable Recovery",
      description: "Strengthens muscles, improves posture, prevents relapse",
      direction: "top-left" // Top-left corner
    },
    {
      title: "Mental Well-being",
      description: "Care that reduces stress & boosts confidence",
      direction: "top-right" // Top-right corner
    },
    {
      title: "Affordable Care",
      description: "Transparent pricing, no hidden costs",
      direction: "bottom-left" // Bottom-left corner
    },
    {
      title: "Ongoing Support",
      description: "Follow-up care for lasting results",
      direction: "bottom-right" // Bottom-right corner
    }
  ];

  const getAnimationStyle = (direction: string, index: number, isVisible: boolean) => {
    if (!isVisible) {
      switch (direction) {
        case 'top-left':
          return { opacity: 0, transform: 'translate(-50px, -50px) scale(0.8)' };
        case 'top-right':
          return { opacity: 0, transform: 'translate(50px, -50px) scale(0.8)' };
        case 'bottom-left':
          return { opacity: 0, transform: 'translate(-50px, 50px) scale(0.8)' };
        case 'bottom-right':
          return { opacity: 0, transform: 'translate(50px, 50px) scale(0.8)' };
        default:
          return { opacity: 0, transform: 'translateY(50px)' };
      }
    }
    
    return { 
      opacity: 1, 
      transform: 'translate(0, 0) scale(1)',
      transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + (index % 4) * 0.15}s`
    };
  };

  const FeatureCard = ({ title, description, index, isVisible, direction }) => (
    <div 
      className="rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-700 border border-gray-200 h-full flex flex-col relative overflow-hidden"
      style={{ 
        backgroundColor: '#0f1524',
        ...getAnimationStyle(direction, index, isVisible)
      }}
    >
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#e13e20' }}></div>
      <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-10" style={{ backgroundColor: '#e13e20' }}></div>
      <h3 className="text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 flex items-center" style={{ color: '#e13e20' }}>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3" style={{ backgroundColor: '#e13e20' }}></div>
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed flex-grow font-medium text-sm sm:text-base">{description}</p>
    </div>
  );

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div ref={containerRef} className="min-h-[80vh] flex items-center justify-center py-8 max-[470px]:py-4 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white', fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        {/* Main Title */}
        <div className={`text-center mb-3 sm:mb-4 lg:mb-5 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 max-[470px]:mb-0 max-[470px]:pb-0">
            What <span className="text-[#e13e20] font-bold">Sets Us</span> Apart
          </h2>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 flex-grow">
          {/* Left Column - Show on medium screens and up */}
          <div className="hidden md:block space-y-4 sm:space-y-6">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="h-auto">
                <FeatureCard 
                  title={feature.title} 
                  description={feature.description} 
                  index={index}
                  isVisible={isVisible}
                  direction={feature.direction}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Show on medium screens and up */}
          <div className="hidden md:block space-y-4 sm:space-y-6">
            {features.slice(4, 8).map((feature, index) => (
              <div key={index + 4} className="h-auto">
                <FeatureCard 
                  title={feature.title} 
                  description={feature.description} 
                  index={index + 4}
                  isVisible={isVisible}
                  direction={feature.direction}
                />
              </div>
            ))}
          </div>

          {/* Single Column - Show on small screens */}
          <div className="md:hidden space-y-4 sm:space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="h-auto">
                <div 
                  className="rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-700 border border-gray-200 h-full flex flex-col relative overflow-hidden"
                  style={{ 
                    backgroundColor: '#0f1524',
                    ...(isVisible ? {
                      opacity: 1,
                      transform: 'translateY(0) scale(1)',
                      transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + index * 0.1}s`
                    } : {
                      opacity: 0,
                      transform: 'translateY(50px) scale(0.8)'
                    })
                  }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: '#e13e20' }}></div>
                  <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-10" style={{ backgroundColor: '#e13e20' }}></div>
                  <h3 className="text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 flex items-center" style={{ color: '#e13e20' }}>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3" style={{ backgroundColor: '#e13e20' }}></div>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-grow font-medium text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WhatSetsUsApart;