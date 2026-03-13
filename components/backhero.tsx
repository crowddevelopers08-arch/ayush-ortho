"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar, Shield, Star, Heart } from "lucide-react"
import { BackconsultationModal } from "./backpopupform"

export function Backhero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        @keyframes pulse-grow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .btn-animation:hover {
          animation: pulse-grow 0.5s ease-in-out;
        }
        
        .mobile-menu-animation {
          animation: slide-in 0.3s ease-out;
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
           @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(234, 38, 41, 0.1),
            transparent
          );
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        
        .glass-morphism {
          background: rgba(30, 30, 30, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(234, 38, 41, 0.1);
        }
        
        .phone-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #ea2629, #d61f22);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(234, 38, 41, 0.3);
          transition: all 0.3s ease;
        }
        
        .phone-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .phone-button:hover::before {
          left: 100%;
        }
        
        .phone-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(234, 38, 41, 0.4);
        }
        
        .consultation-button {
          background: linear-gradient(135deg, #ea2629, #d61f22);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(234, 38, 41, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .consultation-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        
        .consultation-button:hover::after {
          transform: translateX(100%);
        }
        
        .consultation-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(234, 38, 41, 0.3);
        }
      `}</style>
    

      {/* Hero Section with Updated Content and Circular Design */}
      <section className="pt-16 min-h-[80vh] md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8"style={{fontFamily: "'Outfit', sans-serif" }}>
        <div className="container mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
          {/* Content Section - Appears FIRST on mobile */}
          <div className="text-white space-y-5 md:space-y-6 order-1 md:order-1">
            <h1 className="text-[50px] max-[470px]:text-[24px] max-[470px]:pt-[20px] max-[470px]:text-center sm:text-4xl md:text-5xl lg:text-[50px] font-bold leading-tight">
              Struggling with back pain that 
              <span className="text-[#e13e20]"> never seems to go away?</span>
            </h1>
            
            <p className="text-base max-[470px]:text-center sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Whether it's sitting too long at work, lifting weight incorrectly, or age-related wear and tear — back pain can hold you back from living life fully.
            </p>
            
{/* Image Section - Appears SECOND on mobile (under the paragraph) */}
<div className="relative mb-6 md:mb-0 order-2 md:order-2 block md:hidden">
  <div className="floating-element relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] mx-auto">
    {/* Main circular image */}
    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
      <img 
        src="https://ik.imagekit.io/wwdlbhsjw/public/backban.webp" 
        alt="Back pain treatment" 
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Floating circular element 1 */}
    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-2 md:-right-2 lg:top-4 lg:right-2 bg-[#e13e20] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex items-center justify-center shadow-xl floating-element" style={{animationDelay: '1s'}}>
      <div className="text-white text-center">
        <span className="block text-xs sm:text-sm md:text-base lg:text-lg font-bold">95%</span>
        <span className="block text-[10px] sm:text-xs">Success Rate</span>
      </div>
    </div>
    
    {/* Floating circular element 2 */}
    <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-3 md:-bottom-4 md:-left-2 lg:-bottom-2 lg:left-2 bg-white rounded-full w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center shadow-xl floating-element" style={{animationDelay: '2s'}}>
      <div className="text-[#e13e20] text-center">
        <span className="block text-xs sm:text-sm md:text-base lg:text-lg font-bold">500+</span>
        <span className="block text-[10px] sm:text-xs">Patients Helped</span>
      </div>
    </div>
    
    {/* Floating circular element 3 */}
    <div className="absolute bottom-12 -right-6 sm:bottom-14 sm:-right-7 md:bottom-16 md:-right-8 lg:bottom-24 lg:-right-4 xl:bottom-32 xl:-right-4 bg-gray-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center shadow-xl border-2 border-[#e13e20] floating-element" style={{animationDelay: '3s'}}>
      <div className="text-white text-center">
        <span className="block text-xs sm:text-sm font-bold">0%</span>
        <span className="block text-[10px] sm:text-xs">Surgery Rate</span>
      </div>
    </div>
  </div>
</div>


            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">Personalized 7, 14 & 21-Day Recovery Plans</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">Drug-Free & Non-Surgical Solutions</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">Free Senior Consultations (65+) Every Thursday</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">15% Exclusive Discount for Defense Personnel</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <a 
                href="tel:91500 10387" 
                className="btn-animation flex items-center justify-center bg-[#e13e20] hover:bg-[#c03518] text-white font-medium py-3 px-5 sm:px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-semibold">Call Now</span>
              </a>
             
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="bg-transparent cursor-pointer hover:bg-[#e13e20] text-white border border-orange-500 hover:border-transparent text-center font-semibold py-3 px-5 sm:px-8 rounded-full transition-colors text-sm sm:text-base"
              >
                Book an Appointment
              </button>
            </div>
          </div>
          
          {/* Image Section - Appears SECOND on mobile (under the paragraph) */}
          <div className="relative mb-6 md:mb-0 order-2 md:order-2 max-[470px]:hidden">
            <div className="floating-element relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] mx-auto">
              {/* Main circular image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src="https://ik.imagekit.io/wwdlbhsjw/public/backban.webp" 
                  alt="Back pain treatment" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating circular element 1 */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-2 md:-right-2 lg:top-4 lg:right-2 bg-[#e13e20] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex items-center justify-center shadow-xl floating-element" style={{animationDelay: '1s'}}>
                <div className="text-white text-center">
                  <span className="block text-xs sm:text-sm md:text-base lg:text-lg font-bold">95%</span>
                  <span className="block text-[10px] sm:text-xs">Success Rate</span>
                </div>
              </div>
              
              {/* Floating circular element 2 */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-3 md:-bottom-4 md:-left-2 lg:-bottom-2 lg:left-2 bg-white rounded-full w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center shadow-xl floating-element" style={{animationDelay: '2s'}}>
                <div className="text-[#e13e20] text-center">
                  <span className="block text-xs sm:text-sm md:text-base lg:text-lg font-bold">500+</span>
                  <span className="block text-[10px] sm:text-xs">Patients Helped</span>
                </div>
              </div>
              
              {/* Floating circular element 3 */}
              <div className="absolute bottom-12 -right-6 sm:bottom-14 sm:-right-7 md:bottom-16 md:-right-8 lg:bottom-24 lg:-right-4 xl:bottom-32 xl:-right-4 bg-gray-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center shadow-xl border-2 border-[#e13e20] floating-element" style={{animationDelay: '3s'}}>
                <div className="text-white text-center">
                  <span className="block text-xs sm:text-sm font-bold">0%</span>
                  <span className="block text-[10px] sm:text-xs">Surgery Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackconsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  )
}