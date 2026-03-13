"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const StatsComponent: React.FC = () => {
  const stats: StatItem[] = [
    { value: 23500, suffix: '+', label: 'Patients trust us with their care', duration: 2000 },
    { value: 21, suffix: '', label: 'Specialities in musculoskeletal health', duration: 1500 },
    { value: 100, suffix: '+', label: 'Qualified Staff dedicated to your recovery', duration: 1800 },
    { value: 16, suffix: '+', label: 'Years of orthopaedic excellence', duration: 1600 },
  ];

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[40px] max-[470px]:text-[20px] max-[325px]:text-[18px] font-bold text-gray-800 mb-2 sm:mb-4">
            Stats That <span className="text-[#e13e20]">Speak</span> for Themselves
          </h2>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 max-[470px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

const StatCard: React.FC<StatItem> = ({ value, suffix, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * value));
        
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [inView, value, duration]);

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div
      ref={ref}
      className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"style={{fontFamily: "'Outfit', sans-serif" }} >
      <div className="text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl max-[470px]:text-[22px] font-bold text-[#e13e20] mb-2 sm:mb-4">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-gray-700 max-[470px]:text-[14px] text-sm sm:text-base font-medium min-h-[3.5rem] flex items-center justify-center">
          {label}
        </div>
      </div>
      
      {/* Animated progress bar */}
      <div className="mt-4 sm:mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#e13e20] rounded-full"
          style={{ 
            width: inView ? '100%' : '0%',
            transition: `width ${duration}ms ease-out`
          }}
        />
      </div>
    </div>
    </>
  );
};

export default StatsComponent;