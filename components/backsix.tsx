"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CommonconsultationModal } from "./commonpopup";
import { BackconsultationModal } from "./backpopupform";

const Backcommonfour: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
        
        .shiny-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          background: #e13e20;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          font-family: 'Rubik', sans-serif;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.2s, background 0.2s, color 0.2s;
          min-width: 160px;
          text-align: center;
          gap: 8px;
          white-space: nowrap;
        }

        .shiny-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0.2) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          pointer-events: none;
          animation: shine 1.5s linear infinite;
        }

        @keyframes shine {
          0% { left: -75%; }
          100% { left: 120%; }
        }

        .shiny-button:hover,
        .shiny-button:focus {
          color: #FFCCBC;
        }

        @media (max-width: 480px) {
          .shiny-button {
            padding: 8px 16px;
            font-size: 14px;
            min-width: 140px;
          }
        }

        @media (max-width: 360px) {
          .shiny-button {
            padding: 6px 12px;
            font-size: 12px;
            min-width: 120px;
            gap: 6px;
          }
          
          .shiny-button svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>

      <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-12 max-[470px]:py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24"style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Heading */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight">Why Thousands Trust <span className="text-[#e13e20]">Ayush Ortho</span> for Back Pain Relief
                  </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Tailored 7, 14 & 21-Day Recovery Plans
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main1.jpg"
                alt="Recovery Plans"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black max-[470px]:text-[14px] text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              We match your condition with a focused treatment duration. Quick and Effective.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Multi-Therapy Integration
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main2.jpg"
                alt="Multi Therapy"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black max-[470px]:text-[14px] text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              We combine Ayurveda, Varma, Posture Alignment & Ortho methods for real, root-level healing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Supervised by Ortho Experts
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main3.jpg"
                alt="Ortho Experts"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black max-[470px]:text-[14px] text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              All sessions are guided and reviewed by certified orthopedic & varma therapy specialists.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Fits Your Work Schedule
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main4.jpg"
                alt="Work Schedule"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black max-[470px]:text-[14px] text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              Sessions are short and flexible. No hospital stays, No downtime.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Defense Family Care
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main5.jpg"
                alt="Defense Family"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black max-[470px]:text-[14px] text-xs sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              15% OFF for armed forces personnel & their families.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#fdeceb] rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-[20px] mb-3 sm:mb-4 px-2">
              Virtual Consult + Home Medicine <br /> (Launching Soon)
            </h3>
            <div className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mb-3 sm:mb-4">
              <Image
                src="https://ik.imagekit.io/wwdlbhsjw/public/main6.jpg"
                alt="Virtual Consult"
                width={240}
                height={150}
                className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
            <p className="text-black text-xs max-[470px]:text-[14px] sm:text-sm md:text-base lg:text-[18px] leading-relaxed px-1">
              Ideal for outstation patients — consult online, receive treatment at home.
            </p>
          </div>
        </div>
        {/* Consultation Modal */}
        <BackconsultationModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </section>
    </>
  );
};

export default Backcommonfour;