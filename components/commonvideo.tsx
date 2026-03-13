"use client";
import React, { useState } from "react"; 
import { CommonconsultationModal } from "./commonpopup";

const Commonvideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const videos = [
    {
      src: "https://www.youtube.com/embed/fTkbLoxQ20U",
    },
    {
      src: "https://www.youtube.com/embed/foj1EjAh930",
    },
    {
      src: "https://www.youtube.com/embed/QsYk3oy4614",
    },
    {
      src: "https://www.youtube.com/embed/cITuCjkaJGA",
    },
    {
      src: "https://www.youtube.com/embed/G_cnj3I13pY",
    },
    {
      src: "https://www.youtube.com/embed/TolZhRhH_2s",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 sm:py-3">
      {/* Heading */}
      <h2 className="text-[#f54a00] max-[470px]:text-[22px] max-[470px]:mb-4 text-[40px] sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center">
        Hear How Lives Changed Without Surgery
      </h2>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl w-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
          >
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.src}
                title={`Patient testimonial video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-3 sm:mt-4 mb-2 md:mt-5 lg:mt-8 px-4">
        <button 
          className="shiny-button w-full sm:w-auto"
          onClick={handleOpenModal}
        >
          Start Your Healing Journey
        </button>
      </div>

      {/* Consultation Modal */}
      <CommonconsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Commonvideo;