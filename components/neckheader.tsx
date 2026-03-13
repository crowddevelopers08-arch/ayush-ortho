"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { BackconsultationModal } from "./backpopupform"
import { NeckConsultationModal } from "./neckpopup"

export function Neckheader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        @keyframes pulse-grow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .btn-animation:hover {
          animation: pulse-grow 0.5s ease-in-out;
        }
        
        .mobile-menu-animation {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-primary/20" style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="w-[160px] h-[60px] max-[768px]:w-[150px] max-[768px]:h-[50px] max-[480px]:w-[120px] max-[480px]:h-[40px]" src="https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png" alt="logo" />
            </div>


            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Call button - always visible */}
              <a 
                href="tel:91500 10387" 
                className="btn-animation flex items-center justify-center bg-[#e13e20] hover:bg-[#c03518] text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-semibold text-[14px] hidden sm:inline">+91 91500 10387</span>
                <span className="font-semibold text-[16px] sm:hidden">Call Now</span>
              </a>
             
              {/* Consultation button - hidden on mobile */}
              <Button
                onClick={() => setIsConsultationOpen(true)}
                className="btn-animation hidden cursor-pointer lg:flex items-center space-x-2 bg-[#e13e20] hover:bg-[#c03518] text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold text-[16px]">Book Consultation</span>
              </Button>

              {/* Mobile menu button - removed as requested */}
            </div>
          </div>
        </div>
      </header>

      <NeckConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  )
}