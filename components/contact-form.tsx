"use client";
import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    treatment: 'Medicated Facials'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/telecrm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          treatment: formData.treatment,
          date: formData.date,
          source: 'website-form'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          treatment: 'Medicated Facials'
        });
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Submission error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="w-full flex justify-center px-4 sm:px-6" style={{fontFamily: "'Outfit', sans-serif" }}>
        <div className="w-full max-w-5xl border rounded-xl shadow-sm p-4 sm:p-6 md:p-8 bg-white">
          {/* Status messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Thank you! Your appointment has been booked successfully. Redirecting...
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              There was an error submitting your form. Please try again.
            </div>
          )}
          
          {/* Form grid */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="border rounded-full px-4 py-2 sm:py-3 focus:ring-2 focus:ring-yellow-400 outline-none w-full text-sm sm:text-base"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="border rounded-full px-4 py-2 sm:py-3 focus:ring-2 focus:ring-yellow-400 outline-none w-full text-sm sm:text-base"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="border rounded-full px-4 py-2 sm:py-3 focus:ring-2 focus:ring-yellow-400 outline-none w-full text-sm sm:text-base"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>

            {/* Clinic Visiting Date */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Clinic Visiting Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded-full px-4 py-2 sm:py-3 focus:ring-2 focus:ring-yellow-400 outline-none w-full text-sm sm:text-base"
                required
              />
            </div>

            {/* Treatment Looking For */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">Treatment Looking For</label>
              <select 
                name="treatment" 
                value={formData.treatment} 
                onChange={handleChange}
                className="border rounded-full px-4 py-2 sm:py-3 focus:ring-2 focus:ring-yellow-400 outline-none w-full text-sm sm:text-base"
                required
              >
                <option value="Medicated Facials">Medicated Facials</option>
                <option value="Laser Hair Reduction">Laser Hair Reduction</option>
                <option value="Glutathion Drips">Glutathione Drips</option>
                <option value="Acne & Acne Scar Reduction">Acne & Acne Scar Reduction</option>
                <option value="Skin Pigmentation Treatments">Skin Pigmentation Treatments</option>
                <option value="Anti Aging Treatments">Anti Aging Treatments</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4 md:mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C5A354] text-black font-semibold rounded-full px-4 py-3 w-full max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg hover:bg-[#b19144] disabled:bg-gray-400 transition whitespace-normal text-center"
              >
                {isSubmitting ? 'PROCESSING...' : 'BOOK APPOINTMENT @ ₹199 (60% OFF)'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormComponent;