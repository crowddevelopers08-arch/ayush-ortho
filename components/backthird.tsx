"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BackconsultationModal } from './backpopupform';

interface ConditionCard {
  id: number;
  title: string;
  description: string;
  therapies: string[];
  image: string;
}

const Backthird: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const conditions: ConditionCard[] = [
    {
      id: 1,
      title: "Chronic Back Pain",
      description: "Long-lasting discomfort from daily strain and poor posture affecting quality of life.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/Chronic-Back-Pain.jpg"
    },
    {
      id: 2,
      title: "Disc Bulge / Disc Prolapse",
      description: "Pressure on spinal nerves causing severe pain and limited mobility.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/secondd.jpg"
    },
    {
      id: 3,
      title: "Sciatica",
      description: "Shooting pain from lower back down the legs due to nerve compression.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/cannn.jpg"
    },
    {
      id: 4,
      title: "Lumbar Spondylosis",
      description: "Age-related spinal wear and stiffness causing chronic discomfort.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/Lumbar-Spondylosis.jpg"
    },
    {
      id: 5,
      title: "Anterolisthesis / Retrolisthesis",
      description: "Misaligned vertebrae causing instability and nerve compression.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/spanlosis.jpg"
    },
    {
      id: 6,
      title: "Sacroiliitis",
      description: "Inflammation at the hip-spine joint leading to sharp, localized pain.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/Sacroilitis.jpg"
    },
    {
      id: 7,
      title: "Piriformis Syndrome",
      description: "Muscle pressure on the sciatic nerve causing radiating leg pain.",
      therapies: [],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/remedial.jpg"
    }
  ];

  // Split conditions into first 4 and last 3
  const firstFourConditions = conditions.slice(0, 4);
  const lastThreeConditions = conditions.slice(4);

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div ref={sectionRef} className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-6 max-[470px]:py-4 lg:py-8" style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Header Section */}
        <div className={`text-center mb-8 sm:mb-12 max-[470px]:mb-4 lg:mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl max-[470px]:text-[22px] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Back Pain <span className="text-[#e13e20] font-bold">Conditions</span> We Treat
          </h2>
        </div>
        
        {/* First Row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {firstFourConditions.map((condition, index) => {
            const animationDelay = index * 100;
            
            return (
              <div 
                key={condition.id} 
                className={`bg-[#0f1524] rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-700 border border-gray-800 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${animationDelay}ms` : '0ms'
                }}
              >
                {/* Increased Image Height */}
                <div className="h-56 sm:h-64 lg:h-72 bg-gray-100 overflow-hidden">
                  <img 
                    src={condition.image} 
                    alt={condition.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Content with increased padding */}
                <div className="p-5 sm:p-7 lg:p-8 text-center">
                  {/* Title with increased font size */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight font-semibold">
                    {condition.title}
                  </h3>
                  
                  {/* Description with increased font size */}
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
                    {condition.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Second Row - 3 cards centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-7xl">
            {lastThreeConditions.map((condition, index) => {
              const animationDelay = (index + 4) * 100;
              
              return (
                <div 
                  key={condition.id} 
                  className={`bg-[#0f1524] rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-700 border border-gray-800 overflow-hidden ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${animationDelay}ms` : '0ms'
                  }}
                >
                  {/* Increased Image Height */}
                  <div className="h-56 sm:h-64 lg:h-72 bg-gray-100 overflow-hidden">
                    <img 
                      src={condition.image} 
                      alt={condition.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  
                  {/* Content with increased padding */}
                  <div className="p-5 sm:p-7 lg:p-8 text-center">
                    {/* Title with increased font size */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight font-semibold">
                      {condition.title}
                    </h3>
                    
                    {/* Description with increased font size */}
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
                      {condition.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-8 sm:max-[470px]:mt-6 lg:mt-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#e13e20] cursor-pointer hover:bg-[#c5361b] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-sm sm:text-base transform hover:scale-105"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>

      {/* Consultation Modal */}
      <BackconsultationModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Backthird;