"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const KneePainReliefCards = () => {
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
    <div ref={containerRef} className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8" style={{fontFamily: "'Outfit', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-2xl text-center sm:text-3xl lg:text-4xl pb-4 sm:pb-5 font-bold text-gray-900 mb-4 max-[470px]:mb-2 max-[470px]:pb-0 sm:mb-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Why Thousands <span className="text-[#e13e20] font-bold">Trust Ayush Ortho</span> for Knee Pain Relief
        </h2>
        
        {/* Combined first 3 cards section with single shared image */}
        <div className={`flex flex-col md:flex-row mb-8 md:mb-10 rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-10'
        }`}>
          {/* Left side - all 3 text cards combined */}
          <div className="w-full md:w-1/2" style={{ backgroundColor: '#0f1524' }}>
            {/* Card 1 */}
            <div className={`p-5 sm:p-6 border-b border-gray-700 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Tailored Recovery Plans
              </h2>
              <p className="text-white text-xs sm:text-sm">
                Quick & effective 7, 14 & 21-Day Recovery Plans matched to your specific condition for optimal results.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-5 sm:p-6 border-b border-gray-700 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Multi-Therapy Integration
              </h2>
              <p className="text-white text-xs sm:text-sm">
                Comprehensive approach combining Ayurveda, Varma, Ortho Manual Therapy, and Posture Correction for holistic healing.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-5 sm:p-6 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Supervised by Ortho Experts
              </h2>
              <p className="text-white text-xs sm:text-sm">
                Every session reviewed by specialists to ensure the highest quality care and optimal recovery.
              </p>
            </div>
          </div>
          
          {/* Right side - single shared image */}
          <div className={`w-full md:w-1/2 bg-gray-200 relative h-64 md:h-auto transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90'
          }`} style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}>
            <Image
              src="https://ik.imagekit.io/wwdlbhsjw/public/repll.webp" // Make sure this path is correct
              alt="Therapy Session at Ayush Ortho"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Combined last 3 cards section with single shared image */}
        <div className={`flex flex-col md:flex-row rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-10'
        }`} style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}>
          {/* Left side - single shared image */}
          <div className={`w-full md:w-1/2 bg-gray-200 order-2 md:order-1 relative h-64 md:h-auto transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90'
          }`} style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}>
            <Image
              src="https://ik.imagekit.io/aegfxmf0u/public/knee_pain_image.png?updatedAt=1773312894931" // Make sure this path is correct
              alt="Consultation at Ayush Ortho"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Right side - all 3 text cards combined */}
          <div className="w-full md:w-1/2 order-1 md:order-2" style={{ backgroundColor: '#0f1524' }}>
            {/* Card 4 */}
            <div className={`p-5 sm:p-6 border-b border-gray-700 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.7s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Fits Your Work Schedule
              </h2>
              <p className="text-white text-xs sm:text-sm">
                Flexible session timing with no downtime, designed to accommodate your busy work life.
              </p>
            </div>

            {/* Card 5 */}
            <div className={`p-5 sm:p-6 border-b border-gray-700 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.8s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Defense Family Care
              </h2>
              <p className="text-white text-xs sm:text-sm">
                15% OFF for Armed Forces personnel & their families as a token of gratitude for their service.
              </p>
            </div>

            {/* Card 6 */}
            <div className={`p-5 sm:p-6 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-5'
            }`} style={{ transitionDelay: isVisible ? '0.9s' : '0s' }}>
              <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#e13e20' }}>
                Virtual Consult + Home Medicine
              </h2>
              <p className="text-white text-xs sm:text-sm">
                (Launching Soon) Remote consultations and medicine delivery for outstation patients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default KneePainReliefCards;