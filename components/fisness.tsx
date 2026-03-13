"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ConsultationModal } from './popupform';

interface ConditionCard {
  id: number;
  title: string;
  description: string;
  therapies: string[];
  image: string;
}

const KneePainConditionsGrid: React.FC = () => {
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
      title: "General Knee Pain",
      description: "Common discomfort and pain in the knee area without specific injury.",
      therapies: ["Varma + Kettal", "Janu Vasti", "Kashaya Dhara"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/kneww.jpeg"
    },
    {
      id: 2,
      title: "Ligament Tears & Strains",
      description: "ACL, MCL injuries from twisting or sports activities. Happen when the strong bands of tissue connecting bones in a joint are stretched or torn.",
      therapies: ["Varma + Kettal", "Navara Kizhi"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/liii.jpg"
    },
    {
      id: 3,
      title: "Osteoarthritis",
      description: "Degenerative joint disease causing breakdown of knee cartilage.",
      therapies: ["Varma + Kettal", "Janu Vasti", "Kashaya Dhara"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/3.jpeg"
    },
    {
      id: 4,
      title: "Rheumatoid Arthritis",
      description: "Autoimmune disorder causing joint inflammation and damage.",
      therapies: ["Detox", "Dhanyamla Dhara", "Matra Vasti", "Kashaya Vasti", "Podi Kizhi", "Shirodhara"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/WhatsApp.jpg"
    },
    {
      id: 5,
      title: "Gout",
      description: "Form of arthritis characterized by severe pain, redness and tenderness.",
      therapies: ["Detox", "Dhanyamla Dhara", "Matra Vasti", "Kashaya Vasti", "Podi Kizhi", "Shirodhara"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/gost.jpeg"
    },
    {
      id: 6,
      title: "Meniscus Tears",
      description: "Tear in the cartilage that acts as a shock absorber between thigh and shin bones.",
      therapies: ["Varma + Kettal", "Navara Kizhi"],
      image: "https://ik.imagekit.io/wwdlbhsjw/public/meniscust.jpg"
    }
  ];

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-6 max-[470px]:py-4 lg:py-8"  style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Header Section */}
        <div className={`text-center mb-8 sm:mb-12 max-[470px]:mb-4 lg:mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl max-[470px]:text-[22px] sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Knee Pain <span className="text-[#e13e20] font-bold">Conditions</span> We Treat
          </h2>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {conditions.map((condition, index) => {
            // First 3 cards come from left, next 3 from right
            const isFromLeft = index < 3;
            const animationDelay = index * 100; // Stagger animation
            
            return (
              <div 
                key={condition.id} 
                className={`bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-700 border border-gray-100 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-x-0' : 
                  isFromLeft ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'
                }`}
                style={{
                  transitionDelay: isVisible ? `${animationDelay}ms` : '0ms'
                }}
              >
                {/* Image */}
                <div className="h-48 sm:h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={condition.image} 
                    alt={condition.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#e13e20] mb-2 sm:mb-3 leading-tight">
                    {condition.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed font-normal">
                    {condition.description}
                  </p>
                  
                  {/* Therapies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                      Therapies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {condition.therapies.map((therapy, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-800 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-gray-200 font-medium transition-colors duration-300 hover:bg-[#e13e20] hover:text-white"
                        >
                          {therapy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-8 sm: max-[470px]:mt-6 lg:mt-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#e13e20] cursor-pointer hover:bg-[#c5361b] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-sm sm:text-base transform hover:scale-105"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default KneePainConditionsGrid;