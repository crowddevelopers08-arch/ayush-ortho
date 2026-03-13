"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation, Car, X, Phone } from "lucide-react"
import { FaWalking } from "react-icons/fa"
import Image from "next/image";

export default function ClinicLocationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [showDirections, setShowDirections] = useState(false)
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-zoom-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const directionsLink = travelMode === 'driving' 
    ? 'https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=driving'
    : 'https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=walking'
  return (
    
        <>
          <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="flex flex-col items-center text-center" style={{fontFamily: "'Outfit', sans-serif" }}>
        <div className="flex items-center gap-2 mb-1">
          <Image
            src="logo.jpg" // Replace with your logo path
            alt="Finesse Aesthetic Logo"
            width={500}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* Address and Phone */}
      <div className="flex-col md:flex-row items-center mb-3 justify-center mt-4 gap-2 md:gap-6 text-center text-gray-700 text-sm md:text-base">
        <div className="flex justify-center text-[20px] items-center gap-2">
          <MapPin className="w-5 h-5 max-[470px]:w-10 max-[470px]:h-10 text-yellow-700" />
          <span>
            4, Bhagirathy St, Bishop Garden, Raja Annamalaipuram, Chennai, Tamil Nadu 600028
          </span>
        </div>
        <div className="flex text-[20px] justify-center items-center gap-2">
          <Phone className="w-4 h-4 text-yellow-700" />
          <a
            href="tel:+91 72001 89282"
            className="text-gray-700 font-medium hover:underline"
          >
            +91 7305078046
          </a>
        </div>
      </div>
    
    <div className="relative w-full max-w-4xl mx-auto"style={{fontFamily: "'Outfit', sans-serif"}}> {/* Container with max width */}
      <div 
        ref={mapContainerRef}
        className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform scale-95 opacity-0 transition-all duration-700"
      >
        {/* Pulsing border animation */}
        <div className="absolute inset-0 border-[10px] border-green-500/20 rounded-xl pointer-events-none animate-pulse-slow"></div>
        
        {/* Main map iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d817.3296063591482!2d77.50169574900629!3d12.978456334614934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d696d605b05%3A0xebea8a708c5900db!2sSculpt%20The%20Maxillofacial%20Clinic!5e0!3m2!1sen!2sin!4v1756200126601!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="relative z-10"
          aria-label="Maxillofacial Clinic Location"
        ></iframe>
        
        {/* Animated location pin - centered properly */}
        <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-full">
          <div className="animate-bounce-slow">
            <div className="bg-blue-500 p-2 rounded-full shadow-lg">
              <MapPin className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Clinic badge - better positioning */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/90 px-3 py-1.5 rounded-full shadow-md max-w-[90%]">
          <div className="flex items-center space-x-2 truncate">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-blue-500 font-medium text-sm truncate">Maxillofacial Clinic</span>
          </div>
        </div>

        {/* Directions button - better positioning */}
        <button 
          onClick={() => setShowDirections(true)}
          className="absolute bottom-4 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-2 transition-all text-sm"
        >
          <Navigation className="w-4 h-4" />
          <span>Directions</span>
        </button>
      </div>

      {/* Directions Panel - improved layout */}
      {showDirections && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-600 flex items-center">
                <Navigation className="w-5 h-5 mr-2" />
                Directions
              </h3>
              <button 
                onClick={() => setShowDirections(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2 text-gray-800">Clinic Address:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                   315, Sapthagiri 60 Feet,  Bengaluru,<br />
                  Health Layout, Chandrashekhara Layout, Annapurneshwari Nagar,<br />
                   Karnataka 560091, India
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-3 text-gray-800">Get Directions:</h4>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setTravelMode('driving')}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      travelMode === 'driving' 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <Car className="w-5 h-5 mr-2" />
                    <span>By Car</span>
                  </button>
                  <button
                    onClick={() => setTravelMode('walking')}
                    className={`flex items-center justify-center p-3 rounded-lg ${
                      travelMode === 'walking' 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <FaWalking className="w-5 h-5 mr-2" />
                    <span>Walking</span>
                  </button>
                </div>
                
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Open in Google Maps
                </a>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-700 mb-2">Nearby Landmarks:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Opposite to Salem Government Hospital
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Next to Vijaya Bank
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    500m from Salem Railway Station
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
   <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <style jsx>{`
        .animate-zoom-in {
          animation: zoomIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes zoomIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse 6s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </>
  )
}