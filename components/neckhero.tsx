"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar, Shield, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { BackconsultationModal } from "./backpopupform"
import gsap from "gsap"
import { NeckConsultationModal } from "./neckpopup"

export function Neckhero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const marqueeRef = useRef(null)
  const mobileCarouselRef = useRef(null)

  const images = [
    "https://ik.imagekit.io/wwdlbhsjw/public/mainshlo.jpg",
    "https://ik.imagekit.io/wwdlbhsjw/public/sholbann.jpg",
    "https://ik.imagekit.io/wwdlbhsjw/public/thatha.jpg",
  ];

  useEffect(() => {
    // GSAP Marquee Animation for Desktop
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      const content = marquee.querySelector('.marquee-content');
      const contentWidth = content.scrollWidth;
      const duration = 10;
      
      // Duplicate content for seamless loop
      content.innerHTML += content.innerHTML;
      
      gsap.to(content, {
        x: -contentWidth / 2,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    }
  }, [])

  // Mobile carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance carousel on mobile
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      if (window.innerWidth < 1024) { // Only on mobile
        nextImage();
      }
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(carouselInterval);
  }, []);

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
        
        /* Marquee Styles for Desktop */
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee-content {
          display: flex;
          gap: 1.5rem;
          padding: 2rem 0;
        }
        
        .marquee-image {
          flex-shrink: 0;
          width: 15rem;
          height: 20rem;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .marquee-image:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transform: translateY(-5px);
        }
        
        .marquee-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .marquee-image:hover img {
          transform: scale(1.05);
        }
        
        /* Mobile Carousel Styles */
        .mobile-carousel {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
          height: 100%;
        }
        
        .carousel-slide {
          flex: 0 0 100%;
          height: 100%;
        }
        
        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .carousel-nav {
          position: absolute;
          bottom: 1rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          z-index: 10;
        }
        
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .carousel-dot.active {
          background: #e13e20;
          transform: scale(1.2);
        }
        
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        
        .carousel-arrow:hover {
          background: rgba(225, 62, 32, 0.8);
        }
        
        .carousel-arrow.prev {
          left: 1rem;
        }
        
        .carousel-arrow.next {
          right: 1rem;
        }
        
        @media (min-width: 768px) {
          .marquee-image {
            width: 20rem;
            height: 25rem;
          }
          
          .mobile-carousel {
            height: 400px;
          }
        }
        
        @media (min-width: 1024px) {
          .mobile-carousel {
            display: none;
          }
        }
      `}</style>

      {/* Hero Section with Marquee Animation */}
      <section className="pt-16 min-h-[80vh] md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8" style={{fontFamily: "'Outfit', sans-serif" }}>
        <div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="text-white space-y-5 md:space-y-6 order-1 lg:order-1">
            <h1 className="text-[40px] max-[470px]:text-[24px] max-[470px]:pt-[20px] max-[470px]:text-center sm:text-4xl md:text-5xl lg:text-[40px] font-bold leading-tight">
              Shoulder & Neck Pain Relief at Ayush Ortho 
              <span className="text-[#e13e20]"> – East Tambaram, Chennai</span>
            </h1>
            <div className="bg-gray-800 p-4 rounded-lg mb-6 max-[470px]:mb-10">
              <p className="text-gray-300 italic  max-[470px]:text-center">
                Is shoulder stiffness or neck pain limiting your daily life?
              </p>
            </div>
                {/* Mobile Carousel Section */}
          <div className="relative w-full order-2 lg:order-2 block lg:hidden mt-8">
            <div className="mobile-carousel">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img 
                      src={image} 
                      alt={`Gallery image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="carousel-arrow prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                className="carousel-arrow next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Dot Indicators */}
              <div className="carousel-nav">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Progress indicators */}
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="text-sm text-gray-400">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
            <p className="text-base text-[19px] max-[470px]:text-center sm:text-lg md:text-[19px] text-gray-300 leading-relaxed">
              Whether it's frozen shoulder, cervical spondylosis, or stiffness from long desk work, pain in the neck and shoulders can affect your sleep, posture, and mobility.
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">23,500+ Patients trust us with their care</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">21 Specialities in musculoskeletal health</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">100+ Qualified Staff dedicated to your recovery</span>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#e13e20] rounded-full p-2 mr-3 flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg">16+ Years of Orthopaedic Expertise you can rely on</span>
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
          
          {/* Marquee Animation Section for Desktop */}
          <div className="relative w-full order-2 lg:order-2 hidden lg:block">
            <div className="flex flex-col items-center justify-center overflow-hidden h-full">
              <div 
                ref={marqueeRef}
                className="marquee-container"
              >
                <div className="marquee-content">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className="marquee-image"
                    >
                      <img 
                        src={image} 
                        alt={`Gallery image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex items-center justify-end mt-4 space-x-4">
                <div className="w-16 h-1 rounded-full bg-[#e13e20]"></div>
                <div className="w-16 h-1 rounded-full bg-gray-600"></div>
              </div>
            </div>
          </div>

      
        </div>
      </section>

      <NeckConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  )
}