"use client";
import React from 'react';
import { Phone } from 'lucide-react';

export default function Commonheader() {
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
      
      <header className="w-full flex flex-row items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 md:py-4 bg-white shadow-sm" style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <img 
            className="w-auto h-12 sm:h-14 md:h-16 xl:h-18 object-contain" 
            src="https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png" 
            alt="Ayush Ortho Logo" 
          />
        </div>

        {/* Contact Button */}
        <div className="flex-shrink-0">
          <a
            href="tel:91500 10387"
            className="shiny-button"
          >
            <Phone size={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">+91 91500 10387</span>
            <span className="xs:hidden">+91 91500 10387</span>
          </a>
        </div>
      </header>
    </>
  );
}