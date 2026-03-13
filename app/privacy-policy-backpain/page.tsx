"use client";

import React from "react";
import { Phone, Shield, Lock, Eye, Mail, MapPin } from "lucide-react";
import { Thankheader } from "@/components/thankheader";

const PrivacyPolicyknee: React.FC = () => {
  return (
    <>
      <Thankheader />
      <div className="bg-gradient-to-b from-gray-50 to-white py-8">
        <section className="w-full max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed bg-white rounded-lg shadow-md">
          {/* Decorative elements */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-[#e13e20] rounded-full"></div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Intro */}
          <div className="bg-orange-50 p-6 rounded-lg mb-8 border-l-4 border-[#e13e20]">
            <p className="text-base md:text-lg text-gray-700">
              At{" "}
              <span className="font-semibold text-[#e13e20]">Ayush Ortho</span>,
              we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your personal information
              when you interact with us.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                1. Informations We Collect
              </h2>
            </div>
            <p className="mb-3 text-gray-700">
              When you fill out a form on our website, book an appointment, or contact us, we collect the following details:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 text-gray-800">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Full Name
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Mobile Number
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Email Address
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Pincode/Location
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Health concerns and medical history
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full"></div>
                Appointment preferences
              </li>
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="mb-3 text-gray-700">We use your information to:</p>
            <ul className="space-y-3 mb-6 text-gray-800">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                Contact you regarding your inquiry or appointment.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                Provide personalized treatment recommendations and solutions.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                Schedule and manage your appointments at our East Tambaram clinic.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                Send important health updates or information about our services (only with your consent).
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                Improve our services and enhance your patient experience.
              </li>
            </ul>
          </div>

          {/* 3. Data Protection & Security */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                3. Data Protection & Security
              </h2>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-700">
                We implement strict security measures to protect your personal and health information from
                unauthorized access, misuse, or disclosure. Your information is stored
                securely and is <strong>never shared or sold</strong> to third parties without your explicit consent, except as required by law.
              </p>
            </div>
          </div>

          {/* 4. Third-Party Services */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                4. Third-Party Services
              </h2>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-700">
                We may use third-party tools for appointment scheduling, analytics or communication, but your
                personal data is never shared without your explicit consent. All third-party services are vetted for security and compliance with privacy regulations.
              </p>
            </div>
          </div>

          {/* 5. Your Rights & Choices */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                5. Your Rights & Choices
              </h2>
            </div>
            <p className="mb-3 text-gray-700">You have the right to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-gray-800">
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full flex-shrink-0"></div>
                Request access to your health and personal data.
              </li>
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full flex-shrink-0"></div>
                Correct or update your information.
              </li>
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full flex-shrink-0"></div>
                Request deletion of your personal information.
              </li>
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                <div className="w-2 h-2 bg-[#e13e20] rounded-full flex-shrink-0"></div>
                Opt out of promotional communications.
              </li>
            </ul>
          </div>

          {/* 6. Contact Us */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e13e20] p-2 rounded-full">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#e13e20]">
                6. Contact Us
              </h2>
            </div>
            <p className="mb-4 text-gray-700">
              For any questions or concerns about your privacy, or to exercise your rights regarding your personal data, please reach out to us at:
            </p>
            
            <div className="bg-gray-50 p-5 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#e13e20] p-2 rounded-full">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-black">+91 91500 10387</span>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#e13e20] p-2 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">23/5A Valmiki Street, East Tambaram, Chennai – 600059</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-[#e13e20] p-2 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Open Daily: 10 AM – 8 PM</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 text-center">
              By using our website and services, you agree to this Privacy Policy. We may update it
              from time to time, so please check back periodically for any changes.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyknee;