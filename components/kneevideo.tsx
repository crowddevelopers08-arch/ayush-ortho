"use client";
import React, { useState } from "react"; 
import { CommonconsultationModal } from "./commonpopup";

const Kneevideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const videos = [
    {
      src: "https://youtube.com/embed/TolZhRhH_2s?feature=share",
    },
    {
      src: "https://www.youtube.com/embed/mFOHFMzPOd4",
    },
  ];

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
      <section className="py-10 max-[470px]:py-5">
    <div className="w-full flex flex-col items-center"style={{fontFamily: "'Outfit', sans-serif" }}>
      {/* Heading */}

      <div className="text-center mb-3 sm:mb-3">
          <h2 className="text-[40px] max-[470px]:text-[20px] max-[325px]:text-[18px] font-bold text-gray-800 mb-2 sm:mb-4">
            Hear <span className="text-[#e13e20]">How Lives Changed</span> Without Surgery
          </h2>
        </div>

      {/* Video Grid - Centered with 2 videos */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl w-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2"
            >
              <div className="relative w-full aspect-[16/10] bg-black"> {/* Increased height */}
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
      </div>
      {/* Consultation Modal */}
      <CommonconsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
    </section>
    </>
  );
};

export default Kneevideo;