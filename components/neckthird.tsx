"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BackconsultationModal } from './backpopupform';
import { NeckConsultationModal } from './neckpopup';

interface ConditionCard {
  id: number;
  title: string;
  description: string;
  therapies: string[];
  image: string;
}

const Neckthird: React.FC = () => {
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
      title: "Shoulder Pain & Stiffness",
      description: "Age or posture related discomfort affecting mobility and daily activities.",
      therapies: ["Varma Massage / Abhyangam with Nadi Swedanam – Relieves stiffness & improves flexibility"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/neckfirst.jpg"
    },
    {
      id: 2,
      title: "Frozen Shoulder",
      description: "Restricted mobility causing significant movement limitations.",
      therapies: ["Varma Massage / Abhyangam with Nadi Swedanam – Restores shoulder movement naturally"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/shoul.jpg"
    },
    {
      id: 3,
      title: "Cervical Spondylosis",
      description: "Neck/spine wear & tear leading to chronic pain and stiffness.",
      therapies: ["Orthopaedic Manual Therapy (OMT) + Greeva Vasti – Corrects posture & eases cervical strain"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/cervical.jpg"
    },
    {
      id: 4,
      title: "Tendonitis",
      description: "Inflammation-related shoulder pain affecting joint function.",
      therapies: ["Varma + Kettal Therapy – Reduces inflammation & promotes healing"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/rota.jpg"
    },
    {
      id: 5,
      title: "Shoulder Ligament Tears & Strains",
      description: "Overhead activities or impact injuries stretching or tearing joint tissues.",
      therapies: ["Varma Massage + Navara Kizhi – Strengthens muscles & aids recovery"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/ligament-injuries.jpg"
    },
    {
      id: 6,
      title: "IT Band Syndrome",
      description: "Shoulder-linked strain causing pressure and mobility issues.",
      therapies: ["Varma Massage – Relieves pressure & restores mobility"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/necck5.jpg"
    },
    {
      id: 7,
      title: "Carpal Tunnel Syndrome",
      description: "Neck-shoulder strain linked nerve compression discomfort.",
      therapies: ["Varma + Kettal / Nasyam – Relieves nerve compression & discomfort"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/donol.jpeg"
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
            Shoulder Pain <span className="text-[#e13e20] font-bold">Conditions</span> We Treat
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
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium mb-3">
                    {condition.description}
                  </p>
                  
                  {/* Therapy information */}
                  {condition.therapies.map((therapy, therapyIndex) => (
                    <p key={therapyIndex} className="text-[#e13e20] text-sm sm:text-base leading-relaxed font-medium">
                      {therapy}
                    </p>
                  ))}
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
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium mb-3">
                      {condition.description}
                    </p>
                    
                    {/* Therapy information */}
                    {condition.therapies.map((therapy, therapyIndex) => (
                      <p key={therapyIndex} className="text-[#e13e20] text-sm sm:text-base leading-relaxed font-medium">
                        {therapy}
                      </p>
                    ))}
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
      <NeckConsultationModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Neckthird;