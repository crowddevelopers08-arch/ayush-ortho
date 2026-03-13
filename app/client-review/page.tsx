"use client";
import { Header } from '@/components/header'
import React from 'react'

const Review = () => {
  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="min-h-screen bg-[#0f1524] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8" style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
            <div className="w-40 h-20 sm:w-48 sm:h-24 md:w-56 md:h-28 lg:w-64 lg:h-32 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
              <img 
                src="https://ik.imagekit.io/wwdlbhsjw/public/ayushlogo.webp" 
                alt="Company Logo" 
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>
          
          {/* Click & Review Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0f1524] mb-3 sm:mb-4">
              Click & Review
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              We'd love to hear your feedback!<br />
              Please click any one of the buttons below to share your review.<br />
              A short review of 4 to 5 lines would be greatly appreciated.
            </p>
          </div>
          
          {/* Buttons Section */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <a href="https://g.page/r/CdNRv2UfQscwEBM/review">
              <button 
                className="w-full cursor-pointer py-2 sm:py-3 lg:py-4 bg-[#e13e20] text-white text-base sm:text-lg lg:text-xl font-semibold rounded-lg hover:bg-[#c2351a] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                Client Review
              </button>
            </a>
            <a href="/client-feedback">
              <button 
                className="w-full cursor-pointer py-2 sm:py-3 lg:py-4 bg-transparent border-2 border-[#e13e20] text-[#e13e20] text-base sm:text-lg lg:text-xl font-semibold rounded-lg hover:bg-[#e13e20] hover:text-white transition-all duration-200 transform hover:scale-105 transition-transform duration-200"
              >
                Client Feedback
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review