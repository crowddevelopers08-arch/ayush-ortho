'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Calendar, MapPin, Clock } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

interface BookingData {
  name: string;
  phone: string;
  email?: string;
  treatmentPlan?: string;
  areaOfPain?: string;
  date?: string;
}

export default function Backchatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      message: 'Hello! Welcome to Ayush Ortho Care. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [bookingFlow, setBookingFlow] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    phone: '',
    email: '',
    treatmentPlan: '',
    areaOfPain: '',
    date: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialOptions = [
    { text: 'Book Appointment', action: 'init_booking' },
    { text: 'Have Questions', action: 'questions' }
  ];

  const treatmentPlanOptions = [
    'Not Sure - Let Doctor Decide',
    '7-Day Plan (Early-stage issues)',
    '14-Day Plan (Moderate pain)',
    '21-Day Plan (Chronic conditions)',
  ];

  // Generate dates for the next 14 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() === 0) continue;
      
      dates.push({
        value: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };

  const dateOptions = generateDateOptions();

  // Validate Indian mobile number
  const isValidIndianMobile = (phone: string) => {
    const indianMobileRegex = /^[6-9]\d{9}$/;
    return indianMobileRegex.test(phone.replace(/\D/g, ''));
  };

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInitialOption = (action: string) => {
    if (action === 'init_booking') {
      setBookingFlow(true);
      setBookingStep(1);
      setMessages(prev => [...prev, 
        { type: 'user', message: 'Book Appointment', timestamp: new Date() },
        { type: 'bot', message: 'Great! Let me help you book an appointment. First, what\'s your name?', timestamp: new Date() }
      ]);
    } else if (action === 'questions') {
      setMessages(prev => [...prev, 
        { type: 'user', message: 'Have Questions', timestamp: new Date() },
        { type: 'bot', message: 'Sure! I can help with information about our treatments, pricing, location, and more. What would you like to know?', timestamp: new Date() }
      ]);
    }
  };

  const handleBookingResponse = (response: string) => {
    switch(bookingStep) {
      case 1: // Name
        setBookingData({...bookingData, name: response});
        setBookingStep(2);
        setMessages(prev => [...prev, 
          { type: 'user', message: response, timestamp: new Date() },
          { type: 'bot', message: 'Nice to meet you, ' + response + '! What\'s your phone number?', timestamp: new Date() }
        ]);
        break;
      case 2: // Phone
        // Validate Indian mobile number
        const cleanedPhone = response.replace(/\D/g, '');
        if (!isValidIndianMobile(cleanedPhone)) {
          setMessages(prev => [...prev, 
            { type: 'user', message: response, timestamp: new Date() },
            { type: 'bot', message: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.', timestamp: new Date() }
          ]);
          return; // Don't proceed to next step
        }
        
        setBookingData({...bookingData, phone: cleanedPhone});
        setBookingStep(3);
        setMessages(prev => [...prev, 
          { type: 'user', message: response, timestamp: new Date() },
          { type: 'bot', message: 'Thank you! Which area is causing you pain? Please describe it in your own words.', timestamp: new Date() }
        ]);
        break;
      case 3: // Area of Pain
        setBookingData({...bookingData, areaOfPain: response});
        setBookingStep(4);
        setMessages(prev => [...prev, 
          { type: 'user', message: response, timestamp: new Date() },
          { type: 'bot', message: 'I understand. Which treatment plan are you considering?', timestamp: new Date() },
          { type: 'bot', message: treatmentPlanOptions.map((opt, i) => `${i+1}. ${opt}`).join('\n'), timestamp: new Date() }
        ]);
        break;
      case 4: // Treatment Plan
        const selectedPlan = treatmentPlanOptions[parseInt(response) - 1] || response;
        setBookingData({...bookingData, treatmentPlan: selectedPlan});
        setBookingStep(5);
        setMessages(prev => [...prev, 
          { type: 'user', message: response, timestamp: new Date() },
          { type: 'bot', message: `Thanks for selecting the ${selectedPlan}. What's your email address? (optional)`, timestamp: new Date() },
          { type: 'bot', message: 'You can type "skip" to proceed without email.', timestamp: new Date() }
        ]);
        break;
      case 5: // Email (optional)
        if (response.toLowerCase() === 'skip') {
          setBookingData({...bookingData, email: ''});
          setMessages(prev => [...prev, 
            { type: 'user', message: 'Skip', timestamp: new Date() }
          ]);
        } else {
          setBookingData({...bookingData, email: response});
          setMessages(prev => [...prev, 
            { type: 'user', message: response, timestamp: new Date() }
          ]);
        }
        setBookingStep(6);
        setMessages(prev => [...prev, 
          { type: 'bot', message: 'When would you like to schedule your appointment? You can choose from available dates below:', timestamp: new Date() }
        ]);
        setShowCalendar(true);
        break;
      case 6: // Date
        setBookingData({...bookingData, date: response});
        setMessages(prev => [...prev, 
          { type: 'user', message: response, timestamp: new Date() }
        ]);
        setShowCalendar(false);
        completeBooking();
        break;
    }
  };

  const handleDateSelect = (dateValue: string, dateDisplay: string) => {
    setInputMessage(dateDisplay);
    setTimeout(() => {
      handleBookingResponse(dateDisplay);
    }, 100);
  };

  const completeBooking = async () => {
    // Show confirmation message
    setMessages(prev => [...prev, 
      { type: 'bot', message: 'Thank you for your booking details! We\'re connecting you with our team.', timestamp: new Date() },
      { type: 'bot', message: 'One moment please...', timestamp: new Date() }
    ]);

    try {
      // Send data to TeleCRM API
      const response = await fetch('/api/backpain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingData.name,
          phone: bookingData.phone,
          email: bookingData.email,
          treatmentPlan: bookingData.treatmentPlan,
          areaOfPain: bookingData.areaOfPain,
          source: 'chatbot-booking-for backpain treatment',
          consent: true
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessages(prev => [...prev, 
          { type: 'bot', message: '✅ Your appointment request has been received! Our team will contact you shortly to confirm your appointment.', timestamp: new Date() },
          { type: 'bot', message: 'In the meantime, feel free to ask any questions about your treatment.', timestamp: new Date() }
        ]);
      } else {
        throw new Error(result.details || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setMessages(prev => [...prev, 
        { type: 'bot', message: 'Thank you for your booking details! Our team will contact you shortly at ' + bookingData.phone + ' to confirm your appointment.', timestamp: new Date() },
        { type: 'bot', message: 'If you have any questions, feel free to call us directly at +91 91500 10387.', timestamp: new Date() }
      ]);
    } finally {
      setBookingFlow(false);
      setBookingStep(0);
      setBookingData({
        name: '',
        phone: '',
        email: '',
        treatmentPlan: '',
        areaOfPain: '',
        date: ''
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');

    if (bookingFlow) {
      handleBookingResponse(userMessage);
      return;
    }

    setMessages(prev => [...prev, { type: 'user', message: userMessage, timestamp: new Date() }]);

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('pain') || lowerMessage.includes('back') || lowerMessage.includes('spine')) {
        botResponse = 'I understand you\'re dealing with back pain. Our specialists treat various conditions including sciatica, herniated discs, scoliosis, and chronic back pain using non-surgical Ayurvedic methods. Would you like to book a consultation?';
      } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
        botResponse = 'To book an appointment, please call +91 91500 10387. We\'re available daily from 10 AM to 8 PM. You can also visit us directly at our East Tambaram clinic.';
      } else if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
        botResponse = 'Our treatment plans are competitively priced. We offer special discounts for seniors (free consultation on Thursdays) and defense families (15% off). Please call for detailed pricing.';
      } else if (lowerMessage.includes('location') || lowerMessage.includes('address')) {
        botResponse = 'We\'re located at 23/5A Valmiki Street, East Tambaram, Chennai - 600059. We\'re open daily from 10 AM to 8 PM.';
      } else if (lowerMessage.includes('time') || lowerMessage.includes('hour')) {
        botResponse = 'Our clinic is open daily from 10 AM to 8 PM. We\'re here to help you with your back pain concerns.';
      } else if (lowerMessage.includes('treatment') || lowerMessage.includes('plan')) {
        botResponse = 'We offer 3 treatment plans: 7-Day Plan (for early-stage issues), 14-Day Plan (for moderate pain), and 21-Day Plan (for chronic conditions). All plans use non-surgical Ayurveda, Varma Therapy, and Chiropractic Care.';
      } else {
        botResponse = 'Thank you for your message! For specific medical queries, I recommend speaking directly with our specialists. You can call +91 91500 10387 or book an appointment.';
      }

      setMessages(prev => [...prev, { type: 'bot', message: botResponse, timestamp: new Date() }]);
    }, 1000);
  };

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 max-[470px]:mb-[50px] sm:right-6 z-50"style={{fontFamily: "'Outfit', sans-serif" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center cursor-pointer"
          style={{backgroundColor: '#e13e20', boxShadow: '0 4px 14px rgba(225, 62, 32, 0.4)'}}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-2 sm:bottom-24 sm:right-6 w-[calc(100vw-20px)] sm:w-80 h-80 sm:h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
             style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'}}>
          {/* Header */}
          <div className="p-3 sm:p-4 rounded-t-2xl text-white flex items-center space-x-2 sm:space-x-3"
               style={{backgroundColor: '#e13e20', background: 'linear-gradient(135deg, #e13e20 0%, #c0361d 100%)'}}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm sm:text-base truncate">Ayush Ortho Assistant</div>
              <div className="text-xs opacity-90 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Online now
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 sm:space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] xs:max-w-xs p-2 sm:p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none shadow-sm border border-gray-100' 
                    : 'text-white rounded-tl-none'
                }`}
                style={msg.type === 'bot' ? {background: 'linear-gradient(135deg, #e13e20 0%, #c0361d 100%)'} : {}}>
                  <div className="text-xs sm:text-sm whitespace-pre-line">{msg.message}</div>
                  <div className={`text-[10px] mt-1 opacity-70 ${msg.type === 'user' ? 'text-right text-gray-500' : 'text-left text-white'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options or Input */}
          <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
            {messages.length === 1 && !bookingFlow && (
              <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3">
                {initialOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInitialOption(option.action)}
                    className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs bg-white hover:bg-gray-50 rounded-full transition-all border border-gray-200 truncate shadow-sm hover:shadow-md"
                    style={{ minHeight: '2rem' }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {bookingFlow && bookingStep === 4 && (
              <div className="grid grid-cols-1 gap-1 sm:gap-2 mb-2 sm:mb-3 max-h-20 overflow-y-auto">
                {treatmentPlanOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage((index + 1).toString());
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs bg-white hover:bg-gray-50 rounded-full transition-all border border-gray-200 truncate text-left shadow-sm hover:shadow-md"
                    style={{ minHeight: '2rem' }}
                  >
                    {index + 1}. {option}
                  </button>
                ))}
              </div>
            )}

            {bookingFlow && bookingStep === 5 && (
              <div className="mb-2 sm:mb-3">
                <button
                  onClick={() => {
                    setInputMessage('skip');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-all border border-gray-300 w-full text-center shadow-sm hover:shadow-md"
                >
                  Skip now - Proceed without email
                </button>
              </div>
            )}

            {showCalendar && (
              <div className="mb-2 sm:mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Select a date
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto">
                  {dateOptions.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date.value, date.display)}
                      className="px-2 py-1.5 text-xs bg-white hover:bg-blue-50 rounded transition-all border border-gray-200 text-center hover:border-blue-300 hover:text-blue-600"
                    >
                      {date.display}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={bookingFlow ? 
                  (bookingStep === 1 ? "Your name" : 
                   bookingStep === 2 ? "Your 10-digit mobile number" : 
                   bookingStep === 3 ? "Describe the area of pain" : 
                   bookingStep === 4 ? "Select treatment plan (1-4)" : 
                   bookingStep === 5 ? "Your email (optional) or type 'skip'" : 
                   "Preferred appointment date") : 
                  "Type your message..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e13e20] focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0 shadow-sm hover:shadow-md"
                style={{backgroundColor: '#e13e20', background: 'linear-gradient(135deg, #e13e20 0%, #c0361d 100%)'}}
                aria-label="Send message"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}