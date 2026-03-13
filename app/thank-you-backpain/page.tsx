"use client";

import React, { useEffect } from "react";
import { CheckCircle, Home, Phone, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Thankheader } from "@/components/thankheader";

const ThankYouPageknee: React.FC = () => {
  useEffect(() => {
    // Google Ads conversion tracking for Back Pain
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-16893156876/Zk6SCKG-tKwbEIy8pPc-'
      });
    }
  }, []);

  return (
    <>
      <Thankheader />
      <section className="flex flex-col items-center justify-center min-h-screen px-4 py-5 bg-gradient-to-b pt-[100px] from-gray-900 to-black text-white text-center">
        {/* Icon */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-[#e13e20] rounded-full opacity-20 animate-ping"></div>
          <CheckCircle className="w-20 h-20 text-[#e13e20] relative z-10" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Thank You for Reaching Out!
        </h1>

        {/* Message */}
        <p className="text-base md:text-lg text-gray-300 max-w-xl mb-6">
          We have successfully received your inquiry about our back pain treatments. 
          Our ortho specialists will get back to you within{" "}
          <span className="font-semibold text-[#e13e20]">24 hours</span>.
          Meanwhile, here's what makes Ayush Ortho special:
        </p>

        {/* Ayush Ortho Highlights */}
        <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mb-8 text-left">
          <h2 className="text-xl font-bold mb-4 text-[#e13e20] text-center">Why Choose Ayush Ortho for Back Pain?</h2>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span><strong>23,500+</strong> Back pain patients treated successfully</span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Non-surgical treatments combining <strong>Ayurveda + Varma Therapy + OMT</strong></span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Tailored <strong>7, 14 & 21-Day Recovery Plans</strong> for back pain</span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Specialized care for <strong>Disc Bulge, Sciatica & Spondylosis</strong></span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span><strong>Free Consultation</strong> for Seniors (65+) every Thursday</span>
            </li>
            <li className="flex items-start">
              <div className="bg-[#e13e20] rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span><strong>15% Discount</strong> for Defense Families</span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="tel:+919150010387"
            className="inline-flex items-center gap-2 bg-[#e13e20] text-white px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <Link
            href="/backpain-treatment"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <MapPin className="w-4 h-4" />
          <span>23/5A Valmiki Street, East Tambaram, Chennai – 600059</span>
        </div>

        {/* Timing */}
        <div className="flex items-center gap-2 text-gray-400 mb-6">
          <Calendar className="w-4 h-4" />
          <span>Open Daily: 10 AM – 8 PM</span>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Ayush Ortho. All rights reserved.
        </p>
      </section>
    </>
  );
};

export default ThankYouPageknee;