"use client";
import React, { useState } from "react";
import { Check } from "lucide-react"; // Adjust import path as needed
import { CommonconsultationModal } from "./commonpopup";

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://ik.imagekit.io/wwdlbhsjw/public/mainbabb.jpg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/30"></div>
        
        <div className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
          {/* Left Content */}
          <div className="w-full text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 max-w-3xl mx-auto lg:mx-0">
            {/* Location */}
            <p className="text-xs sm:text-sm md:text-base font-medium text-black/80 mb-2">
              Ayush Ortho – Tambaram, Chennai
            </p>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#e13e20] leading-tight sm:leading-snug md:leading-normal lg:leading-[70px]">
              Relieve Pain in Just 7–21 Days. No Surgery Needed
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
              From knee, Hip, back, and neck pain to frozen shoulder and postural
              issues. Get personalized, non-surgical treatment that works.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
              {/* Feature Items */}
              <div className="flex items-center gap-2 bg-[#fddfd7] rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-black">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#e13e20]" /> 
                <span className="truncate">5000+ Patients Treated</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#fddfd7] rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-black">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#e13e20]" /> 
                <span className="truncate">Surgery-Free, Natural Approach</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#fddfd7] rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-black">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#e13e20]" /> 
                <span className="truncate">Free Consultation for 65+ (Thursdays)</span>
              </div>
              
              <div className="flex items-center gap-2 bg-[#fddfd7] rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base font-medium text-black">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#e13e20]" /> 
                <span className="truncate">15% OFF for Defense Families</span>
              </div>
            </div>

            {/* Button */}
            <div className="pt-3 sm:pt-4 md:pt-5">
              <button 
                className="shiny-button w-full sm:w-auto"
                onClick={handleOpenModal}
              >
                Start Your Healing Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <CommonconsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default Hero;