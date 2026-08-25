"use client"

import { Menu, X, Phone } from "lucide-react"

export function Thankheader() {

  return (
    <>
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
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="h-[50px] w-[140px] object-contain max-[480px]:h-10 max-[480px]:w-[120px]" src="https://ik.imagekit.io/wwdlbhsjw/public/ayushlogo.webp" alt="logo" />
            </div>


            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Call button - always visible */}
              <a 
                href="tel:91500 10387" 
                className="btn-animation flex items-center justify-center rounded-full bg-[#e13e20] px-3.5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#c03518] hover:shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-semibold text-[14px] hidden sm:inline">+91 91500 10387</span>
                <span className="font-semibold text-[16px] sm:hidden">Call Now</span>
              </a>


              {/* Mobile menu button - removed as requested */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
