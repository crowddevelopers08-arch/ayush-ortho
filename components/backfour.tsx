"use client";
// components/Problem.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Solution = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const patientTypes = [
    {
      title: "Chronic Pain Sufferers",
      plan: "Ideal Plan: 14 or 21 Days",
      description: "Still living with pain? Get back to life with our expert-guided recovery."
    },
    {
      title: "Surgery-Avoidant Patients",
      plan: "Ideal Plan: 14 or 21 Days", 
      description: "Told you need surgery? Heal naturally with our proven non-surgical therapies."
    },
    {
      title: "Sedentary Professionals",
      plan: "Ideal Plan: 7 or 14 Days",
      description: "Back pain from long desk hours? Fix your posture and feel relief — fast."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>

      <section className="py-6 sm:py-8 md:py-10 lg:py-6 bg-white relative overflow-hidden" style={{fontFamily: "'Outfit', sans-serif"}}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#e13e20]/10 to-transparent rounded-full blur-xl opacity-30"></div>
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-tl from-[#0f1524]/10 to-transparent rounded-full blur-xl opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-4 sm:pb-6 md:pb-12 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
          >
            Who Is Ayush Ortho's <span className="text-[#e13e20] font-bold">Back Pain</span> Treatment For?
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {/* Left Column - Patient Types */}
            <motion.div 
              className="w-full lg:w-1/2 relative order-2 lg:order-1 flex flex-col"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 60,
                damping: 15
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-[#0f1524]/5 rounded-lg sm:rounded-xl shadow-md transform rotate-1 scale-105 opacity-30"></div>
              
              <div className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-[#0f1524]/10 backdrop-blur-sm flex-1 flex flex-col">
                <motion.ul 
                  className="space-y-3 sm:space-y-4 md:space-y-5 flex-1"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {patientTypes.map((patient, index) => (
                    <motion.li 
                      key={index} 
                      className="group relative p-3 sm:p-4 md:p-5 rounded-lg border border-[#0f1524]/10 hover:border-[#e13e20]/30 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                      variants={itemVariants}
                      whileHover={{ 
                        x: 3,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e13e20]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative z-10 h-full flex flex-col justify-center">
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#0f1524] mb-1 sm:mb-2 leading-tight font-outfit">
                          {patient.title}
                        </h4>
                        <p className="text-sm sm:text-base md:text-lg text-[#e13e20] font-semibold mb-1 sm:mb-2 font-outfit">
                          {patient.plan}
                        </p>
                        <p className="text-sm sm:text-base text-[#0f1524] leading-relaxed font-medium font-outfit">
                          {patient.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
            
            {/* Right Column - Image */}
            <motion.div 
              className="w-full lg:w-1/2 relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 60,
                damping: 15,
                delay: 0.2
              }}
            >
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-[#e13e20]/30 rounded-full opacity-60 z-20"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#0f1524]/30 rounded-full opacity-60 z-20"
                animate={{ 
                  y: [0, 8, 0],
                  x: [0, -4, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>

              {/* SIMPLIFIED IMAGE CONTAINER */}
              <div className="relative w-full h-full group">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f1524]/10 to-[#0f1524]/20 rounded-lg sm:rounded-xl transform rotate-2 group-hover:rotate-1 transition-transform duration-500 shadow-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-[#0f1524]/5 to-[#0f1524]/15 rounded-lg sm:rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-700 shadow-md"></div>
                
                <motion.div 
                  className="relative w-full h-full bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-[#0f1524]/20"
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 20px 40px -12px rgba(225, 62, 32, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* FIXED: Better image container with explicit dimensions */}
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px]">
                    {!imageError ? (
                      <>
                        <Image
                          src="https://ik.imagekit.io/wwdlbhsjw/public/whii.jpg" // Try alternative paths if this doesn't work
                          alt="Back Pain Treatment Illustration"
                          fill
                          className={`object-cover transition-opacity duration-500 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority
                          onLoad={() => setImageLoaded(true)}
                          onError={() => {
                            console.error('Image failed to load');
                            setImageError(true);
                          }}
                        />
                        
                        {/* Loading skeleton */}
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                            <div className="text-gray-500">Loading image...</div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Enhanced fallback with multiple image path attempts
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1524]/5 to-[#e13e20]/10 p-4">
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-[#e13e20]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <p className="text-sm sm:text-base font-medium text-[#0f1524] mb-2">
                            Back Pain Treatment Illustration
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Image not available
                          </p>
                          
                          {/* Try alternative image button */}
                          <button 
                            onClick={() => {
                              setImageError(false);
                              setImageLoaded(false);
                            }}
                            className="mt-3 px-4 py-2 bg-[#e13e20] text-white text-xs rounded-lg hover:bg-[#c1351a] transition-colors"
                          >
                            Retry Loading Image
                          </button>
                        </motion.div>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#0f1524]/10"></div>

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Solution;