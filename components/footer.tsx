"use client"

import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useState } from "react"
import { ConsultationModal } from "./popupform"

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
     <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>

    <footer className="bg-black border-t border-primary/20"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-[426px]:py-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-[426px]:gap-4 gap-8">
          {/* Clinic Info */}
          <div className="space-y-6">
             <img  className="w-[170px] h-[60px] max-[768px]:w-[150px] max-[768px]:h-[50px] max-[480px]:w-[120px] max-[480px]:h-[40px]" src="https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png" alt="logo" />
            <p className="text-gray-300 max-[426px]:text-[16px] leading-relaxed">
            At Ayush Ortho, we relieve knee pain without surgery using Ayurveda, Varma Therapy, Orthopaedic Manual Therapy, and Chiropractic Care.

            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold max-[426px]:text-[22px] text-white font-sans">Quick Links</h4>
            <nav className="space-y-3">
           
              <a href="#treatments" className="block max-[426px]:text-[16px] text-gray-300 hover:text-[#e13e20] transition-colors">
                About
              </a>
             
              <a href="#treatments" className="block max-[426px]:text-[16px] text-gray-300 hover:text-[#e13e20] transition-colors">
                Treatments
              </a>
              <a href="#reviews" className="block max-[426px]:text-[16px] text-gray-300 hover:text-[#e13e20] transition-colors">
                Reviews
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold max-[426px]:text-[22px] text-white font-sans">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#e13e20] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 max-[426px]:text-[16px]">+91 91500 10387</p>
                </div>
              </div>
             
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#e13e20] mt-1 flex-shrink-0" />
                <p className="text-gray-300 max-[426px]:text-[16px]">
                  23/5A Valmiki Street, East Tambaram, 
                  <br />
                  Chennai – 600059 
                </p>
              </div>
            </div>
          </div>

          {/* Clinic Hours */}
          <div className="space-y-6">
            <h4 className="text-xl max-[426px]:text-[22px] font-bold text-white font-sans">Open Daily</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#e13e20]" />
                <div>
                  <p className="text-gray-300 max-[426px]:text-[16px]">Mon - Sun</p>
                  <p className="text-[#e13e20] font-medium max-[426px]:text-[16px]">10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-full cursor-pointer max-[426px]:text-[22px] bg-[#e13e20] hover:bg-[#c1341a] text-white font-bold rounded-full py-6"
            >
              Book Appointment
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
        {/* Bottom Bar */}
        <div className="border-t border-[#e13e20]/20 mt-12 pt-8 max-[426px]:pt-4 max-[426px]:mt-4 text-center">
          <p className="text-gray-400 max-[470px]:text-[11px] max-[470px]:mb-[50px] max-[426px]:mb-[0px]">© 2025 Ayush Ortho. All rights reserved.</p>
        </div>
        <div className="border-t border-[#e13e20]/20 mt-12 pt-8 max-[426px]:pt-4 max-[426px]:mt-4 text-center">
          <p className="text-gray-400 max-[470px]:text-[11px] max-[426px]:mb-[50px]"><a href="/privacy-policy"><span className="text-gray-400 max-[426px]:mb-[50px]">Privacy policy</span></a></p>
        </div>
        </div>
      </div>

<div className="max-[470px]:flex hidden fixed bottom-0 left-0 right-0 z-50 w-full">
  <a href="tel:+9191500 10387" className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#e13e20] text-white font-bold text-base transition-all duration-300 hover:bg-[#c1341a] active:translate-y-px">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
    </svg>
    Call Now
  </a>

  <button 
    onClick={() => setIsModalOpen(true)}
    className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white font-bold text-base transition-all duration-300 hover:bg-blue-800 active:translate-y-px"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
    </svg>
    Book Now
  </button>
</div>

    {/* Consultation Modal */}
    <ConsultationModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </footer>
        </>
  )
}