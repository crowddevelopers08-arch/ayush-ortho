"use client";
import { Header } from '@/components/header'
import React, { useState } from 'react'

const ClientFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suggestions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Feedback submitted successfully!' });
        setFormData({ name: '', email: '', phone: '', suggestions: '' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit feedback' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
     <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="min-h-screen bg-[#0f1524] flex items-center justify-center p-3 sm:p-4 md:p-6"style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto my-4">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
            <div className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
              <img 
                src="https://ik.imagekit.io/wwdlbhsjw/public/ayushlogo.webp" 
                alt="Company Logo" 
                className="w-full h-full object-contain p-1 sm:p-2"
              />
            </div>
          </div>
          
          {/* Help Us Improve Section */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0f1524] mb-2 sm:mb-3">
              Help Us Improve!
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
              Tell us what didn't meet your expectations. We genuinely value your feedback and will work on making things better.
            </p>
          </div>
          
          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm md:text-base font-medium text-[#0f1524] mb-1 sm:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm md:text-base font-medium text-[#0f1524] mb-1 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm md:text-base font-medium text-[#0f1524] mb-1 sm:mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Suggestions Field */}
            <div>
              <label htmlFor="suggestions" className="block text-xs sm:text-sm md:text-base font-medium text-[#0f1524] mb-1 sm:mb-2">
                Your Suggestions *
              </label>
              <textarea
                id="suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
                required
                rows={3}
                disabled={isSubmitting}
                className="w-full px-3 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Share your valuable suggestions and feedback..."
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer py-2 sm:py-2 md:py-3 bg-[#e13e20] text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:bg-[#c2351a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-transform duration-200 mt-3 sm:mt-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            disabled={isSubmitting}
            className="w-full cursor-pointer py-2 sm:py-2 md:py-3 bg-transparent border-2 border-[#e13e20] text-[#e13e20] text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:bg-[#e13e20] hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent transition-all duration-200 transform hover:scale-[1.02] transition-transform duration-200 mt-2 sm:mt-3"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  )
}

export default ClientFeedback