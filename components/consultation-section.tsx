"use client";
import React, { useEffect, useRef, useState } from 'react';

const KneePainTreatment: React.FC = () => {
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
        Who Is <span className="text-[#e13e20] font-bold">Ayush Ortho's Knee Pain</span> Treatment For
      </h2>
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 mb-8 lg:mb-0 w-full">
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Chronic Pain Sufferers
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
              Living with knee pain for months or years? Trouble with stairs or walking freely?
            </p>
            <p className="font-bold text-[#e13e20] text-base sm:text-lg">
              Ideal Plan: 14 or 21 Days
            </p>
          </div>
          
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Surgery-Avoidant Patients
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
              Advised for knee replacement or surgery? Try non-invasive therapies first.
            </p>
            <p className="font-bold text-[#e13e20] text-base sm:text-lg">
              Ideal Plan: 14 or 21 Days
            </p>
          </div>
        </div>
        
        {/* Center image */}
        <div className="flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md my-6 sm:my-8 lg:my-0 relative order-first lg:order-none">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e13e20] to-orange-300 rounded-full blur-xl sm:blur-2xl opacity-20 animate-pulse"></div>
            <div 
              className={`w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-b from-white to-gray-50 rounded-full flex items-center justify-center relative shadow-lg sm:shadow-xl border-6 sm:border-8 border-orange-50 overflow-hidden transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e13e20] to-orange-400">
                <img 
                  src="https://ik.imagekit.io/wwdlbhsjw/public/babbbb.jpg" 
                  alt="Knee Pain Treatment" 
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-84 lg:h-84 object-cover rounded-full"
                />
              </div>
            </div>
            <div 
              className={`absolute -bottom-4 sm:-bottom-5 lg:-bottom-6 left-0 right-0 flex justify-center transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
            >
              <div className="bg-[#e13e20] text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-md">
                Treatment For
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 w-full">
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Sedentary Professionals
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
              Desk-job lifestyle, obesity, or lack of activity causing early stiffness?
            </p>
            <p className="font-bold text-[#e13e20] text-base sm:text-lg">
              Ideal Plan: 7 or 14 Days
            </p>
          </div>
          
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Senior Citizens (65+)
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
              Facing arthritis, gout, or chronic stiffness?
            </p>
            <p className="font-bold text-[#e13e20] text-base sm:text-lg">
              Special Benefit: Free Consultation every Thursday
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default KneePainTreatment;