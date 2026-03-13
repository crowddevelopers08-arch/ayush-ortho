"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, X, Phone } from 'lucide-react';
import { FaWalking } from 'react-icons/fa';
import { BackconsultationModal } from './backpopupform';

const BackcombinedComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+919150010387';
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Set equal heights for both sections on desktop only
  useEffect(() => {
    const setEqualHeights = () => {
      if (window.innerWidth >= 1024) { // Only for lg screens and up
        if (bannerRef.current && mapSectionRef.current) {
          const bannerHeight = bannerRef.current.offsetHeight;
          const mapHeight = mapSectionRef.current.offsetHeight;
          
          // Set the taller height to both sections but cap at a reasonable maximum
          const maxHeight = Math.min(Math.max(bannerHeight, mapHeight), 600);
          bannerRef.current.style.minHeight = `${maxHeight}px`;
          mapSectionRef.current.style.minHeight = `${maxHeight}px`;
        }
      } else {
        // Reset heights on mobile
        if (bannerRef.current) bannerRef.current.style.minHeight = '';
        if (mapSectionRef.current) mapSectionRef.current.style.minHeight = '';
      }
    };

    setEqualHeights();
    window.addEventListener('resize', setEqualHeights);
    
    return () => {
      window.removeEventListener('resize', setEqualHeights);
    };
  }, []);

  const directionsLink = travelMode === 'driving' 
    ? 'https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=driving'
    : 'https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=walking';

  return (
    <>
       <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      
      <div 
        className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6" 
        style={{fontFamily: "'Outfit', sans-serif"}}
        ref={bannerRef}
      >
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Appointment Banner Section */}
          <div className="flex-1">
            <div className={`bg-[#0f1524] text-white p-4 sm:p-5 md:p-6 rounded-xl shadow-2xl relative h-full flex flex-col justify-center transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}>
              <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 md:gap-8">
                {/* Main content */}
                <div className="flex-1 text-center lg:text-left w-full">
                  <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                    Book Your Appointment Today
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 opacity-90">
                    Don't let back pain control your life. Get safe, natural & lasting relief at Ayush Ortho.
                  </p>
                  
                  {/* Information section */}
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-0 w-full">
                    <div className="flex items-start justify-center lg:justify-start">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-[#e13e20]">
                        <MapPin className="w-full h-full" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-base">Visit Us: 23/5A Valmiki Street, East Tambaram, Chennai – 600059</p>
                    </div>
                    
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 text-[#e13e20]">
                        <Phone className="w-full h-full" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-base">Call Now: +91 9150010387</p>
                    </div>
                    
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 text-[#e13e20]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base">Open Daily: 10 AM – 8 PM</p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div className="w-full flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
                  <button 
                    onClick={handleOpenModal}
                    className="w-full bg-[#e13e20] hover:bg-[#c5361b] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base md:text-lg shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:ring-opacity-50"
                  >
                    Book Your Appointment Today
                  </button>
                  
                  <button 
                    onClick={handleCall}
                    className="w-full flex items-center justify-center text-white border-2 border-[#e13e20] hover:bg-[#e13e20] font-medium py-1.5 sm:py-2 px-3 sm:px-5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:ring-opacity-50 text-xs sm:text-sm md:text-base"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Call Now: +91 9150010387
                  </button>
                  
                  {/* Additional info for mobile */}
                  <div className="lg:hidden text-center text-xs text-gray-300 mt-1">
                    <p>Free consultation for senior citizens every Thursday</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#e13e20] opacity-10"></div>
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#e13e20] opacity-5"></div>
            </div>
          </div>

          {/* Map Section - Unchanged */}
          <div className="flex-1" ref={mapSectionRef}>
            <div className={`relative w-full h-full min-h-[300px] sm:min-h-[350px] max-[470px]:h-[300px] md:min-h-[400px] transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
              <div 
                ref={mapContainerRef}
                className="relative overflow-hidden rounded-xl shadow-xl border-2 border-white transform h-full"
              >
                {/* Pulsing border animation */}
                <div className="absolute inset-0 border-[4px] sm:border-[6px] md:border-[8px] border-green-500/20 rounded-lg pointer-events-none animate-pulse-slow"></div>
                
                {/* Main map iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7392.517086678364!2d80.128728!3d12.929142000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525ff1eb8fb207%3A0x30c7421f65bf51d3!2sAyush%20Ortho!5e1!3m2!1sen!2sin!4v1758352892872!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-10"
                  aria-label="Ayush Ortho Clinic Location"
                ></iframe>
                
                {/* Animated location pin */}
                <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-full">
                  <div className="animate-bounce-slow">
                    <div className="bg-blue-500 p-1 sm:p-1.5 rounded-full shadow-lg">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Clinic badge */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-20 bg-white/90 px-1.5 py-1 sm:px-2 sm:py-1 rounded-full shadow-md max-w-[85%] sm:max-w-[90%]">
                  <div className="flex items-center space-x-1 truncate">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-blue-500 font-medium text-[10px] xs:text-xs sm:text-xs truncate">AYUSH ORTHO</span>
                  </div>
                </div>

                {/* Directions button */}
                <button 
                  onClick={() => setShowDirections(true)}
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-1 sm:px-2 sm:py-1 rounded-full shadow-lg flex items-center space-x-1 transition-all text-[10px] xs:text-xs sm:text-xs"
                >
                  <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directions Panel */}
      {showDirections && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg w-full max-w-xs xs:max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto mx-2">
            <div className="sticky top-0 bg-white p-2 sm:p-3 border-b flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-blue-600 flex items-center">
                <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Directions
              </h3>
              <button 
                onClick={() => setShowDirections(false)}
                className="text-gray-500 hover:text-gray-700 p-0.5 sm:p-1"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="mb-3 sm:mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 text-gray-800">Clinic Address:</h4>
                <p className="text-gray-700 bg-gray-50 p-1.5 sm:p-2 rounded text-xs sm:text-sm">
                AYUSH ORTHO 23/5A,<br />
                   Valmiki Street, East Tambaram,<br />
                 Chennai - 600059
                </p>
              </div>
              
              <div className="mb-3 sm:mb-4">
                <h4 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 text-gray-800">Get Directions:</h4>
                
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <button
                    onClick={() => setTravelMode('driving')}
                    className={`flex items-center justify-center p-1.5 sm:p-2 rounded text-xs sm:text-sm ${
                      travelMode === 'driving' 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>By Car</span>
                  </button>
                  <button
                    onClick={() => setTravelMode('walking')}
                    className={`flex items-center justify-center p-1.5 sm:p-2 rounded text-xs sm:text-sm ${
                      travelMode === 'walking' 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <FaWalking className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Walking</span>
                  </button>
                </div>
                
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow transition-colors text-xs sm:text-sm"
                >
                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>
              
              <div className="bg-blue-50 p-2 sm:p-3 rounded border border-blue-100">
                <h4 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Nearby Landmarks:</h4>
                <ul className="text-gray-700 space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    AYUSH ORTHO 23/5A, Valmiki Street
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    East Tambaram, Chennai 
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                   Chennai - 600059
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <BackconsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 6s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default BackcombinedComponent;