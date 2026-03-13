"use client";
import React from "react";

const Commonform: React.FC = () => {
  return (
    <>
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
 
    <section className="bg-white my-4 sm:my-6 md:my-8 lg:my-12 px-3 sm:px-4">
      {/* Outer wrapper provides white space around the pink card */}
      <div className="max-w-5xl mx-auto bg-[#ffeef0] rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-5 md:p-6 lg:p-7">
        {/* Heading */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-orange-600 mb-2 sm:mb-3">
          Get Started with Your Personalized
          <br className="hidden sm:block" />
          7, 14, or 21-Day Treatment Plan
        </h2>
        <p className="text-center text-black text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 px-2">
          Our expert team will review your details and schedule a consultation
          to match your condition with the right plan.
        </p>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your 10-digit phone number"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Area of Pain */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">Area of Pain</label>
            <input
              type="text"
              placeholder="Describe the area of pain Ex. knee"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Preferred Plan */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">
              Preferred Treatment Plan
            </label>
            <select
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              defaultValue="7 Days"
            >
              <option>7 Days</option>
              <option>14 Days</option>
              <option>21 Days</option>
              <option>Let the Doctor decide</option>
            </select>
          </div>

          {/* City (full width on all screens) */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-800 font-medium mb-1 text-sm sm:text-base">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full rounded-full border bg-white border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>

          {/* Submit button (full width) */}
          <div className="md:col-span-2 flex justify-center mt-2 sm:mt-4">
            <button className="shiny-button w-full sm:w-auto">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
};

export default Commonform;