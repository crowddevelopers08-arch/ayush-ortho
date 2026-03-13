"use client";
import React, { useState } from 'react';// Adjust the import path as needed
import { ConsultationModal } from './popupform';

const AyushOrtho = () => {        
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
          <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
        <div className="relative bg-gradient-to-b from-gray-900 pt-[75px] to-black overflow-hidden" style={{fontFamily: "'Outfit', sans-serif" }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>
            
            {/* Hero Section */}
            <section className="relative z-10 pt-6 pb-16 max-[470px]:pb-6 md:pt-8 md:pb-20 px-6 md:px-8 lg:px-12">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-14">
                        {/* Content Section */}
                        <div className="lg:w-1/2 w-full">
                            <h2 className="text-[42px] max-[470px]:text-[22px] max-[470px]:text-center max-[470px]:mb-3 mb-6 font-bold text-white leading-tight">
                                Knee Pain Relief at <span className="text-orange-500">Ayush Ortho </span>– East Tambaram, Chennai
                            </h2>
                            
                            <div className="bg-gray-800 p-4 rounded-lg mb-6 max-[470px]:mb-10">
                                <p className="text-gray-300 italic  max-[470px]:text-center">
                                    Struggling with knee pain while walking, climbing stairs, or even while resting?
                                </p>
                            </div>
                            
                            {/* Mobile Image - Shown after the paragraph on mobile */}
                            <div className="lg:hidden w-full flex justify-center mb-6">
                                <div className="relative w-full max-w-md">
                                    <div className="absolute -inset-3 bg-orange-500 rounded-2xl opacity-30 blur"></div>
                                    <img 
                                        src="https://ik.imagekit.io/wwdlbhsjw/public/knneeeban.jpg" 
                                        alt="Orthopedic treatment" 
                                        className="relative rounded-2xl shadow-2xl w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                            
                            <p className="text-gray-300 mb-6">
                                At Ayush Ortho, we specialize in non-surgical treatments that target the root cause of knee pain through a blend of Ayurveda, Varma Therapy, Orthopaedic Manual Therapy, and Chiropractic Care.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">5000+ Patients Treated</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">Surgery-Free, Natural Approach</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">7, 14 & 21-Day Recovery Plans</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">Long-Term Relief Without Surgery</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">Free Consultation for Seniors (65+) – Every Thursday</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-orange-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white">15% Discount for Defense Families</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                                <a
                                    href="tel: 91500 10387"
                                    className="bg-[#e13e20] text-white text-center font-semibold py-3 px-8 rounded-full transition-colors"
                                    style={{ backgroundColor: '#e13e20' }}
                                >
                                    Call Now
                                </a>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-transparent cursor-pointer hover:bg-[#e13e20] text-white border border-orange-500 hover:border-transparent text-center font-semibold py-3 px-8 rounded-full transition-colors"
                                >
                                    Book an Appointment
                                </button>
                            </div>

                            <p className="text-orange-200  max-[325px]:text-[12px] max-[470px]:text-center mt-6 text-sm">
                                Online Consultations Launching Soon (TN-Wide)
                            </p>
                        </div>

                        {/* Image Section - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:block lg:w-1/2 w-full flex justify-center lg:pr-0">
                            <div className="relative w-full">
                                <div className="absolute -inset-4 bg-orange-500 rounded-2xl opacity-30 blur"></div>
                                <img
                                    src="https://ik.imagekit.io/wwdlbhsjw/public/knneeeban.jpg"
                                    alt="Orthopedic treatment"
                                    className="relative rounded-2xl shadow-2xl w-full h-[28rem] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Improved Professional Wave Design */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-10 md:h-20 max-[470px]:hidden lg:h-14"
                    >
                        <path 
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z" 
                            className="fill-current text-gray-800"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Consultation Modal */}
            <ConsultationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
        </>
    );
};

export default AyushOrtho;