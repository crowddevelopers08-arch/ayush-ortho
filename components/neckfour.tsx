"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CommonconsultationModal } from "./commonpopup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Neckfour: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards staggered animation
      gsap.fromTo(".card-item",
        { 
          opacity: 0, 
          y: 60,
          rotationY: 15,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Button animation with continuous subtle pulse
      gsap.fromTo(buttonRef.current,
        { 
          opacity: 0, 
          scale: 0.5,
          y: 30
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous button pulse effect
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Hover animations for cards
      const cards = document.querySelectorAll(".card-item");
      cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(225, 62, 32, 0.15)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
          });
        });
      });

      // Background pattern animation
      gsap.to(sectionRef.current, {
        backgroundPosition: "0% 0%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
        
        .shiny-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          background: linear-gradient(135deg, #e13e20 0%, #ff6b4a 100%);
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          font-family: 'Rubik', sans-serif;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(225, 62, 32, 0.3);
          transition: all 0.3s ease;
          min-width: 200px;
          text-align: center;
          gap: 12px;
          white-space: nowrap;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .shiny-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          animation: shine 2.5s ease-in-out infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .shiny-button:hover,
        .shiny-button:focus {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(225, 62, 32, 0.4);
          color: #FFCCBC;
        }

        .shiny-button:active {
          transform: translateY(0);
        }

        @media (max-width: 480px) {
          .shiny-button {
            padding: 14px 24px;
            font-size: 16px;
            min-width: 180px;
          }
        }

        @media (max-width: 360px) {
          .shiny-button {
            padding: 12px 20px;
            font-size: 14px;
            min-width: 160px;
            gap: 8px;
          }
        }

        /* Enhanced card styles */
        .card-item {
          transition: all 0.3s ease;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #fdeceb 0%, #fdf2f2 100%);
          position: relative;
          overflow: hidden;
        }

        .card-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #e13e20, #ff6b4a);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .card-item:hover::before {
          transform: scaleX(1);
        }

        .card-item:hover {
          border-color: #e13e20;
          transform: translateY(-5px);
        }

        /* Background pattern */
        .bg-pattern {
          background: 
            radial-gradient(circle at 20% 80%, rgba(225, 62, 32, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(225, 62, 32, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(225, 62, 32, 0.02) 0%, transparent 50%),
            linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          background-size: 400% 400%;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="w-full bg-pattern py-6 sm:py-8 md:py-10 lg:py-10 max-[470px]:py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#e13e20] opacity-5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#e13e20] opacity-5 rounded-full blur-xl"></div>
        
        {/* Heading */}
        <div className="text-center relative z-10">
          <h2 
            ref={headingRef}
            className="text-[40px] max-[470px]:text-[22px] sm:text-4xl lg:text-[40px] xl:text-[40px] font-bold text-gray-900 mb-4 max-[470px]:mb-4 max-[470px]:pb-4 sm:mb-4 leading-tight"
          >
            Why Thousands <span className="text-gradient bg-gradient-to-r from-[#e13e20] to-[#ff6b4a] bg-clip-text text-transparent font-bold">Trust Ayush Ortho</span> for Pain Relief
          </h2>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto relative z-10"
        >
          {[
            {
              title: "Tailored 7, 14 & 21-Day Recovery Plans",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main1.jpg",
              description: "We match your condition with a focused treatment duration. Quick and Effective."
            },
            {
              title: "Multi-Therapy Integration",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main2.jpg",
              description: "We combine Ayurveda, Varma, Posture Alignment & Ortho methods for real, root-level healing."
            },
            {
              title: "Supervised by Ortho Experts",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main3.jpg",
              description: "All sessions are guided and reviewed by certified orthopedic & varma therapy specialists."
            },
            {
              title: "Fits Your Work Schedule",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main4.jpg",
              description: "Sessions are short and flexible. No hospital stays, No downtime."
            },
            {
              title: "Defense Family Care",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main5.jpg",
              description: "15% OFF for armed forces personnel & their families."
            },
            {
              title: "Virtual Consult + Home Medicine (Launching Soon)",
              image: "https://ik.imagekit.io/wwdlbhsjw/public/main6.jpg",
              description: "Ideal for outstation patients — consult online, receive treatment at home."
            }
          ].map((card, index) => (
            <div
              key={index}
              className="card-item bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100"
            >
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] mb-4 sm:mb-6 px-2 leading-tight text-gray-800">
                {card.title}
              </h3>
              <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] mb-4 sm:mb-6 relative">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={260}
                    height={160}
                    className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-110"
                    layout="responsive"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <p className="text-gray-700 max-[470px]:text-[15px] text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed px-2 flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Consultation Modal */}
        <CommonconsultationModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </section>
    </>
  );
};

export default Neckfour;