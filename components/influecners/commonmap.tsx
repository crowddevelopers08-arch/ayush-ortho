"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Phone, X } from "lucide-react";
import { FaWalking } from "react-icons/fa";

const Commonmap: React.FC = () => {
  const [showDirections, setShowDirections] = useState(false);
  const [travelMode, setTravelMode] = useState<"driving" | "walking">("driving");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const directionsLink =
    travelMode === "driving"
      ? "https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=driving"
      : "https://www.google.com/maps/dir/?api=1&destination=12.978456,77.501695&travelmode=walking";

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      <div
        className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 bg-black"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src="https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png"
            alt="Ayush Ortho Logo"
            className="h-16 sm:h-20 mb-2"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-white" />
            <span className="text-sm text-white md:text-base">+91 91500 10387</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-sm text-white text-center md:text-base max-w-xs md:max-w-none">
              AYUSH ORTHO 23/5A, Valmiki Street, East Tambaram, Chennai - 600059
            </span>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <div
            ref={mapContainerRef}
            className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7392.517086678364!2d80.128728!3d12.929142000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525ff1eb8fb207%3A0x30c7421f65bf51d3!2sAyush%20Ortho!5e1!3m2!1sen!2sin!4v1758352892872!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Ayush Ortho Clinic Location"
              ></iframe>

              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-full">
                <div className="bg-blue-500 p-1.5 rounded-full shadow-lg">
                  <MapPin className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Clinic Badge */}
              <div className="absolute bottom-3 left-3 z-20 bg-white/90 px-2 py-1 rounded-full shadow-md max-w-[85%]">
                <div className="flex items-center space-x-1 truncate">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-500 font-medium text-xs truncate">
                    AYUSH ORTHO
                  </span>
                </div>
              </div>

              {/* Directions Button */}
              <button
                onClick={() => setShowDirections(true)}
                className="absolute bottom-3 right-3 z-20 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 transition-colors text-xs"
              >
                <Navigation className="w-3 h-3" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Directions Panel */}
      {showDirections && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-600 flex items-center">
                <Navigation className="w-4 h-4 mr-2" />
                Directions
              </h3>
              <button
                onClick={() => setShowDirections(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-base mb-2 text-gray-800">
                  Clinic Address:
                </h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded text-sm">
                  AYUSH ORTHO 23/5A,
                  <br />
                  Valmiki Street, East Tambaram,
                  <br />
                  Chennai - 600059
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-base mb-2 text-gray-800">
                  Get Directions:
                </h4>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => setTravelMode("driving")}
                    className={`flex items-center justify-center p-3 rounded text-sm ${
                      travelMode === "driving"
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>By Car</span>
                  </button>
                  <button
                    onClick={() => setTravelMode("walking")}
                    className={`flex items-center justify-center p-3 rounded text-sm ${
                      travelMode === "walking"
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <FaWalking className="w-4 h-4 mr-1" />
                    <span>Walking</span>
                  </button>
                </div>

                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded shadow transition-colors text-sm"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <h4 className="font-semibold text-blue-700 mb-2 text-sm">
                  Nearby Landmarks:
                </h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    AYUSH ORTHO 23/5A, Valmiki Street
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    East Tambaram, Chennai
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    Chennai - 600059
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footers */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200 text-sm font-medium text-gray-600 bg-white">
        <div className="mb-2 md:mt-0 text-center md:text-left">
          © 2025 Ayush Ortho | All Right Reserved
        </div>
        <div className="text-center md:text-right">
          <a
            href="/ayush-influecners/privacy-policy"
            className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200 font-semibold"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </>
  );
};

export default Commonmap;