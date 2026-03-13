"use client";
import React, { useEffect, useRef, useState } from 'react';

const Backcenterimg: React.FC = () => {
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
      className="max-w-7xl mx-auto px-4 sm:px-6 max-[470px]:py-2 font-sans relative"style={{fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Title Section */}
      <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl pb-4 sm:pb-5 lg:pb-6 font-bold text-gray-900 mb-4 max-[470px]:mb-0 max-[470px]:pb-0 sm:mb-6">
        Our <span className="text-[#e13e20] font-bold">Treatment Approach</span>
      </h2>
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between max-[470px]:gap-0 gap-6 lg:gap-8">
        
        {/* Left side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 mb-8 lg:mb-0 w-full flex flex-col justify-center">
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#e13e20] mb-3 sm:mb-4 leading-tight">
              Orthopaedic Manual Therapy (OMT)
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base lg:text-[15px] leading-relaxed">
              Gentle, hands-on therapy to improve alignment, release tension & restore mobility
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
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#e13e20] mb-3 sm:mb-4 leading-tight">
              Kati Vasti
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base lg:text-[15px] leading-relaxed">
              Warm medicated oil therapy placed on the lower back for deep pain relief
            </p>
          </div>
        </div>
        
        {/* Center image - Smaller for larger screens */}
        <div className="flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg my-6 sm:my-8 lg:my-0 relative order-first lg:order-none lg:mx-2 xl:mx-4 mx-auto">
          <div className="relative h-full flex items-center w-full justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e13e20] to-orange-300 rounded-lg blur-xl sm:blur-2xl opacity-20 animate-pulse"></div>
            <div 
              className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg h-72 sm:h-80 lg:h-80 xl:h-96 bg-gradient-to-b from-white to-gray-50 rounded-lg flex items-center justify-center relative shadow-lg sm:shadow-xl border-4 sm:border-6 border-orange-100 overflow-hidden transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#e13e20]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#e13e20]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#e13e20]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#e13e20]"></div>
              
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-3 sm:p-4">
                <img 
                  src="https://ik.imagekit.io/wwdlbhsjw/public/babbbb.jpg" 
                  alt="Knee Pain Treatment" 
                  className="w-full h-full object-cover rounded-md shadow-inner"
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
            </div>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 w-full flex flex-col justify-center">
          <div 
            className={`bg-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#e13e20] mb-3 sm:mb-4 leading-tight">
              Matra Vasti / Kashaya Vasti
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base lg:text-[15px] leading-relaxed">
              Medicated enema therapies to detoxify & reduce inflammation
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
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#e13e20] mb-3 sm:mb-4 leading-tight">
              Varma Therapy
            </h3>
            <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base lg:text-[15px] leading-relaxed">
              Ancient Tamil healing system focusing on energy points to restore natural balance
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Backcenterimg;