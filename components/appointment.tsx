"use client";
import React, { useState } from 'react'; // Adjust the import path as needed
import { ConsultationModal } from './popupform';

const AppointmentBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+919150010387';
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="bg-[#0f1524] text-white p-6 md:p-10 rounded-xl shadow-2xl max-w-6xl mx-auto my-10 relative"style={{fontFamily: "'Outfit', sans-serif" }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          {/* Main content - Improved alignment */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
              Don't let knee pain control your life.
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
              Get safe, natural & lasting relief at Ayush Ortho.
            </p>
            
            {/* Information section - Better spacing and alignment */}
            <div className="space-y-4 md:space-y-5 mb-6 md:mb-0">
              <div className="flex items-start justify-center lg:justify-start">
                <div className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-[#e13e20]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg">23/5A Valmiki Street, East Tambaram, Chennai – 600059</p>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-6 h-6 mr-3 flex-shrink-0 text-[#e13e20]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg">+91 91500 10387</p>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-6 h-6 mr-3 flex-shrink-0 text-[#e13e20]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg">Open Daily: 10 AM – 8 PM</p>
              </div>
            </div>
          </div>
          
          {/* Vertical divider for larger screens */}
          <div className="hidden lg:block h-40 w-px bg-gray-700 mx-4"></div>
          
          {/* CTA Section - Improved button sizing and spacing */}
          <div className="w-full lg:w-auto flex flex-col items-center space-y-4 md:space-y-5">
            <button 
              onClick={handleOpenModal}
              className="w-full md:w-auto bg-[#e13e20] hover:bg-[#c5361b] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg md:text-xl shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:ring-opacity-50"
            >
              Book Your Appointment Today
            </button>
            
            <button 
              onClick={handleCall}
              className="w-full md:w-auto flex items-center justify-center text-white border-2 border-[#e13e20] hover:bg-[#e13e20] font-medium py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:ring-opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </button>
            
            {/* Additional info for mobile */}
            <div className="lg:hidden text-center text-sm text-gray-300 mt-2">
              <p>Free consultation for senior citizens every Thursday</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-2 right-2 w-16 h-16 rounded-full bg-[#e13e20] opacity-10"></div>
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#e13e20] opacity-5"></div>
      </div>
      
      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AppointmentBanner;