"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const StackedScrollCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Color scheme for #f54a00 (orange) on white background
  const primaryColor = '#f54a00';
  const secondaryColor = '#333333';
  const lightOrange = 'rgba(245, 74, 0, 0.1)';

  // Updated content for Ayush Ortho conditions treated
  const cardsData: CardData[] = [
    {
      id: 1,
      title: "Knee Pain & Arthritis",
      content: "✔️ Age-related wear & tear\n✔️ Sports injury, early-stage arthritis\n✔️ Bone-on-bone issues (non-surgical support)",
      imageUrl: "https://ik.imagekit.io/wwdlbhsjw/public/scroll1.jpg"
    },
    {
      id: 2,
      title: "Back Pain & Spine Issues",
      content: "✔️ Slip disc, sciatica, lumbar compression\n✔️ Post-pregnancy back pain\n✔️ Poor posture from sedentary work",
      imageUrl: "https://ik.imagekit.io/wwdlbhsjw/public/scroll2.jpg"
    },
    {
      id: 3,
      title: "Shoulder, Neck & Frozen Shoulder",
      content: "✔️ Diabetic frozen shoulder\n✔️ Stress-related stiffness\n✔️ Cervical spondylosis",
      imageUrl: "https://ik.imagekit.io/wwdlbhsjw/public/scroll3.jpg"
    },
    {
      id: 4,
      title: "Hip, Leg & Foot Pain",
      content: "✔️ Hip joint strain, postural misalignment\n✔️ Heel spur (Calcaneal spur)\n✔️ Varma-based foot alignment therapy",
      imageUrl: "https://ik.imagekit.io/wwdlbhsjw/public/scroll4.jpg"
    },
    {
      id: 5,
      title: "Posture Correction & Spine Realignment",
      content: "✔️ Ideal for professionals with long sitting hours\n✔️ Combines Chiropractic, Ayurveda & Varma",
      imageUrl: "https://ik.imagekit.io/wwdlbhsjw/public/scroll5.jpg"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;

    // Clear previous animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Initialize all cards stacked position
    gsap.set(cardsRef.current, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    });

    // Set initial states - only first card visible
    cardsRef.current.forEach((card, index) => {
      if (card) {
        if (index === 0) {
          // First card - fully visible
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            zIndex: cardsData.length - index
          });
        } else {
          // Other cards - hidden and scaled down
          gsap.set(card, {
            opacity: 0,
            scale: 0.9,
            y: 100,
            zIndex: cardsData.length - index
          });
        }
      }
    });

    // Animate heading to stay fixed at the top
    gsap.to(headingRef.current, {
      y: 20,
      scale: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cardsData.length * 100}%`,
        scrub: true,
        markers: false
      }
    });

    // Create scroll triggers for each card transition
    cardsData.forEach((_, index) => {
      const currentCard = cardsRef.current[index];
      const nextCard = cardsRef.current[index + 1];

      if (!currentCard) return;

      // Calculate start and end positions based on card index
      const startTrigger = index === 0 ? "top top" : `+=${index * 100}%`;
      const endTrigger = `+=${100}%`;

      // For the last card, create a different end behavior
      if (index === cardsData.length - 1) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: startTrigger,
          end: endTrigger,
          onEnter: () => setActiveCard(index),
          onEnterBack: () => setActiveCard(index),
          scrub: true
        });
        return;
      }

      if (nextCard) {
        // Create scroll trigger for card transition
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: startTrigger,
          end: endTrigger,
          onEnter: () => {
            // Animate current card out and next card in
            const tl = gsap.timeline();
            
            // Current card exits
            tl.to(currentCard, {
              opacity: 0,
              scale: 0.8,
              y: -50,
              duration: 0.8,
              ease: "power2.inOut"
            }, 0);
            
            // Next card enters
            tl.fromTo(nextCard, {
              opacity: 0,
              scale: 0.9,
              y: 100
            }, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.inOut"
            }, 0);

            setActiveCard(index + 1);
          },
          onEnterBack: () => {
            // Reverse animation when scrolling back
            const tl = gsap.timeline();
            
            // Next card exits
            tl.to(nextCard, {
              opacity: 0,
              scale: 0.9,
              y: 100,
              duration: 0.8,
              ease: "power2.inOut"
            }, 0);
            
            // Current card enters
            tl.fromTo(currentCard, {
              opacity: 0,
              scale: 0.8,
              y: -50
            }, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.inOut"
            }, 0);

            setActiveCard(index);
          },
          scrub: true
        });
      }
    });

    // Pin the entire container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${cardsData.length * 100}%`,
      pin: true,
      anticipatePin: 1,
      markers: false
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  // Update progress indicator based on active card
  useEffect(() => {
    gsap.to(".progress-dot", {
      opacity: 0.3,
      scale: 1,
      duration: 0.3
    });

    gsap.to(`.progress-dot[data-index="${activeCard}"]`, {
      opacity: 1,
      scale: 1.2,
      duration: 0.3
    });
  }, [activeCard]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Fixed Heading */}
   

      {/* Cards Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden pt-20"
        aria-live="polite"
        aria-atomic="true"
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            ref={el => addCardRef(el, index)}
            className="absolute inset-0 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 pt-16"
            aria-hidden={index !== activeCard}
            style={{ 
              zIndex: cardsData.length - index,
              visibility: index === activeCard ? 'visible' : 'hidden'
            }}
          >
            <div className="w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
                 <div className="py-4 px-4 sm:px-6 lg:px-8">
        <h2 
          ref={headingRef}
          className="text-center text-[22px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-bold text-orange-600 leading-tight max-w-6xl mx-auto"
        >
          Conditions Treated at Ayush Ortho
        </h2>
      </div>
              <div 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center justify-between rounded-2xl xs:rounded-3xl shadow-lg p-3 xs:p-4 sm:p-6 md:p-8 gap-3 xs:gap-4 sm:gap-6 md:gap-8 border-2 transition-all duration-300 bg-white`}
                style={{
                  borderColor: lightOrange,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                }}
              >
                
                {/* Content Section */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-1 xs:p-2 sm:p-4 md:p-6 w-full">
                  <span 
                    className="text-[10px] xs:text-xs sm:text-sm font-mono mb-1 xs:mb-2 sm:mb-4 font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {index + 1} / {cardsData.length}
                  </span>
                  <h2 
                    className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 md:mb-6 leading-tight"
                    style={{ color: secondaryColor }}
                  >
                    {card.title}
                  </h2>
                  <p 
                    className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-2 xs:mb-3 sm:mb-4 md:mb-6 whitespace-pre-line text-gray-700"
                  >
                    {card.content}
                  </p>
                  <div className="flex items-center space-x-2" style={{ color: primaryColor }}>
                    <div 
                      className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">
                      {index === cardsData.length - 1 ? 'Complete' : 'Scroll to continue'}
                    </span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex justify-center w-full mt-3 xs:mt-4 lg:mt-0">
                  <div className="relative group w-full max-w-[250px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-32 xs:h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl xs:rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0 rounded-xl xs:rounded-2xl border-2 transition-all duration-300 group-hover:border-orange-200"
                      style={{ 
                        borderColor: lightOrange,
                      }}
                    />
                    <div 
                      className="absolute inset-0 rounded-xl xs:rounded-2xl"
                      style={{ 
                        background: `linear-gradient(to top, rgba(245, 74, 0, 0.05) 0%, transparent 50%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default StackedScrollCards;