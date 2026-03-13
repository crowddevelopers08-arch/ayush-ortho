"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Necksix: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Simple fade-in up animation for circles
      gsap.fromTo(".feature-circle",
        { 
          opacity: 0, 
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Simple hover animation
      const circles = document.querySelectorAll(".feature-circle");
      circles.forEach(circle => {
        circle.addEventListener("mouseenter", () => {
          gsap.to(circle, {
            y: -5,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        circle.addEventListener("mouseleave", () => {
          gsap.to(circle, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      id: 1,
      title: "Root-Cause Treatment",
      description: "Tackles the source, not just symptoms"
    },
    {
      id: 2,
      title: "Non-Invasive Care",
      description: "Natural, drug-free therapies"
    },
    {
      id: 3,
      title: "Side-Effect-Free",
      description: "100% safe, no surgery"
    },
    {
      id: 4,
      title: "Personalised Plans",
      description: "Every patient gets a tailored approach"
    },
    {
      id: 5,
      title: "Sustainable Recovery",
      description: "Improves posture, prevents relapse"
    },
    {
      id: 6,
      title: "Mental Well-Being",
      description: "Pain relief that reduces stress & builds confidence"
    },
    {
      id: 7,
      title: "Affordable Care",
      description: "Clear pricing, no hidden costs"
    },
    {
      id: 8,
      title: "Ongoing Support",
      description: "Guidance & follow-up for lasting results"
    }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        .circle-bg {
          background: linear-gradient(135deg, rgba(225, 62, 32, 0.1), rgba(225, 62, 32, 0.05));
          border: 1px solid rgba(225, 62, 32, 0.2);
          transition: all 0.3s ease;
        }
        
        .circle-bg:hover {
          background: linear-gradient(135deg, rgba(225, 62, 32, 0.15), rgba(225, 62, 32, 0.1));
          border: 1px solid rgba(225, 62, 32, 0.4);
        }
        
        .number-badge {
          background: linear-gradient(135deg, #e13e20, #ff6b4a);
          color: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="min-h-screen bg-[#0f1524] py-8 px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              What Sets Us{' '}
              <span className="text-[#e13e20] font-bold">Apart</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the unique advantages that make our approach to shoulder and neck pain treatment truly exceptional
            </p>
          </div>

          {/* Circular Features Grid */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-circle group flex flex-col items-center text-center"
              >
                {/* Circle Container */}
                <div className="circle-bg w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center p-4 mb-4">
                  {/* Number Badge */}
                  <div className="number-badge">
                    {index + 1}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-white font-bold text-sm leading-tight px-2">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-tight max-w-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Necksix;