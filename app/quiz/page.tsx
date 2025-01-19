"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { Range } from "react-range";
import { useTheme } from "next-themes";
import LoadingDots from "@/app/components/LoadingDots";

type ChatResponse = {
  content: string;
  userContentSufficient: boolean;
  systemAccurateEnough: boolean;
  systemAccurateRate: string;
  requestParams: {
    make: string[];
    model: string[];
    minYear: number | null;
    maxYear: number | null;
  };
};

type RangeValue = number[];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(50);
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  const [selectedPowerTypes, setSelectedPowerTypes] = useState<number[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<number[]>([]);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp?: number }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatView, setIsChatView] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [priceRange, setPriceRange] = useState<RangeValue>([0, 70000]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: ""
  });
  const [locationError, setLocationError] = useState<string>('');
  const [budgetError, setBudgetError] = useState<string>('');
  const [showValidation, setShowValidation] = useState(false);
  const [chatError, setChatError] = useState<string>('');
  const [showMorePowerTypes, setShowMorePowerTypes] = useState(false);
  const [showMoreBodyTypes, setShowMoreBodyTypes] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [step2Errors, setStep2Errors] = useState({
    yearRange: '',
    powerType: '',
    bodyType: ''
  });

  const questionStyles = {
    highlight: "font-semibold text-[#2d5181]",
  };

  const powerTypes = [
    { id: 0, src: "noun-electric-7260483 1.png", text: "Fully electric" },
    { id: 1, src: "noun-hybrid-car-7066649 1.png", text: "Hybrid (all kinds)" },
    { id: 2, src: "noun-oil-4865436 1.png", text: "Gasoline" },
    { id: 3, text: "Other options", icon: "↓" }
  ];

  const additionalPowerTypes = [
    { id: 4, text: "Hydrogen", icon: "↓" },
    { id: 5, text: "Diesel", icon: "↓" },
    { id: 6, text: "Natural Gas", icon: "↓" },
    { id: 7, text: "Biodiesel", icon: "↓" }
  ];

  const bodyTypes = [
    { id: 0, src: "noun-sedan-6912534 1.png", text: "Sedan" },
    { id: 1, src: "noun-suv-6999801 1.png", text: "SUV" },
    { id: 2, src: "noun-minivan-5742163 1.png", text: "Minivan" },
    { id: 3, text: "Other options", icon: "↓" }
  ];

  const additionalBodyTypes = [
    { id: 4, text: "Coupe", icon: "↓" },
    { id: 5, text: "Wagon", icon: "↓" },
    { id: 6, text: "Truck", icon: "↓" },
    { id: 7, text: "Convertible", icon: "↓" }
  ];

  // Add these utility functions after the component declarations
  const STORAGE_KEY = 'chat_history';
  const EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Add back the createChatSession function
  const createChatSession = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create-session' })
      });
      const data = await response.json();
      setSessionId(data.sessionId);
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  // Add back the sendMessageToApi function
  const sendMessageToApi = async (message: string) => {
    try {
      if (!sessionId) await createChatSession();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-message',
          sessionId: sessionId,
          message: message
        })
      });

      const data: ChatResponse = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error sending message:', error);
      return "Sorry, there was an error processing your message.";
    }
  };

  const loadChatHistory = () => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { messages, timestamp } = JSON.parse(stored);
      const now = Date.now();
      if (now - timestamp < EXPIRY_TIME) {
        setMessages(messages);
        if (messages.length > 0) {
          setIsChatView(true);
        }
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const saveChatHistory = (newMessages: typeof messages) => {
    const data = {
      messages: newMessages,
      timestamp: Date.now()
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Modify the existing useEffect for chat session
  useEffect(() => {
    createChatSession();
    loadChatHistory();
  }, []);

  // Modify the existing handleSendMessage function
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsChatView(true);
    setIsWaitingForResponse(true); // Start showing loading animation

    try {
      const response = await sendMessageToApi(inputMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      saveChatHistory([...messages, userMessage, { text: response, isUser: false }]);
    } catch (error) {
      setChatError('Failed to get response. Please try again.');
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Navigation
  const handleNext = () => {
    setShowValidation(true);

    // Reset error messages
    setLocationError('');
    setBudgetError('');
    setChatError('');

    let hasError = false;

    // Validate location
    if (!location.address.trim()) {
      setLocationError('Please enter your shopping location');
      hasError = true;
    }

    // Validate budget
    if (!priceRange[1] || !priceRange[0]) {
      setBudgetError('Please select your budget');
      hasError = true;
    }

    // Validate chat messages
    if (!messages || messages.length < 2) { // Check for at least one user message (plus the initial AI message)
      setChatError('Please describe your perfect car and click send before proceeding');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // If all validations pass, proceed to next step
    setCurrentStep(currentStep + 1);
    setShowValidation(false);
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    setProgress(prevStep === 0 ? 50 : 100);
  };

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      handleSendMessage();
    }
  };

  const validateStep2 = () => {
    const errors = {
      yearRange: '',
      powerType: '',
      bodyType: ''
    };
    let isValid = true;

    // Validate year range
    const currentYear = new Date().getFullYear();
    const fromYear = parseInt(yearFrom);
    const toYear = parseInt(yearTo);

    if (!yearFrom || !yearTo) {
      errors.yearRange = 'Please enter both years';
      isValid = false;
    } else if (fromYear > toYear) {
      errors.yearRange = 'From year must be less than or equal to To year';
      isValid = false;
    } else if (fromYear < 1900 || toYear > currentYear + 1) {
      errors.yearRange = 'Please enter valid years';
      isValid = false;
    }

    // Validate power type selection
    if (selectedPowerTypes.length === 0) {
      errors.powerType = 'Please select at least one power type';
      isValid = false;
    }

    // Validate body type selection
    if (selectedBodyTypes.length === 0) {
      errors.bodyType = 'Please select at least one body type';
      isValid = false;
    }

    setStep2Errors(errors);
    return isValid;
  };

  const handlePowerTypeClick = (typeId: number) => {
    if (typeId === 3) {
      setShowMorePowerTypes(!showMorePowerTypes);
    } else {
      setSelectedPowerTypes(prev => {
        const index = prev.indexOf(typeId);
        if (index > -1) {
          return prev.filter(id => id !== typeId);
        } else {
          return [...prev, typeId];
        }
      });
    }
  };

  const handleBodyTypeClick = (typeId: number) => {
    if (typeId === 3) {
      setShowMoreBodyTypes(!showMoreBodyTypes);
    } else {
      setSelectedBodyTypes(prev => {
        const index = prev.indexOf(typeId);
        if (index > -1) {
          return prev.filter(id => id !== typeId);
        } else {
          return [...prev, typeId];
        }
      });
    }
  };

  const handleSeeMatches = () => {
    if (validateStep2()) {
      router.push('/car');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        {/* Progress Indicator */}
        <div className="w-32 mx-auto mt-8">
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-[#2d5181] dark:bg-[#4b7ac7] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8"
        >
          {currentStep === 0 ? (
            // Step 1: Initial Chat
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Describe Your Perfect Car
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Let&apos;s find your perfect car
                </p>
              </div>

              {/* Location Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Where are you shopping for a car?
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={location.address}
                    onChange={(e) => {
                      setLocation(prev => ({ ...prev, address: e.target.value }));
                      if (showValidation && e.target.value.trim()) {
                        setLocationError('');
                      }
                    }}
                    placeholder="Enter your location (e.g., Los Angeles, CA)"
                    className={`w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-600 
                      dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#2d5181]/20 
                      focus:border-[#2d5181] transition-all ${locationError ? 'border-red-500' : ''}`}
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This helps us find cars available in your area
                  </p>
                  {locationError && (
                    <p className="mt-1 text-sm text-red-500">
                      {locationError}
                    </p>
                  )}
                </div>
              </div>

              {/* Budget Range Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  What&apos;s your budget?
                </h2>
                <div className="space-y-8">
                  <div className="px-4">
                    <Range
                      step={1000}
                      min={0}
                      max={70000}
                      values={priceRange}
                      onChange={(values) => setPriceRange(values)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full"
                        >
                          <div
                            className="h-full bg-[#2d5181] dark:bg-[#4b7ac7] rounded-full"
                            style={{
                              width: `${((priceRange[1] - priceRange[0]) / 70000) * 100}%`,
                              left: `${(priceRange[0] / 70000) * 100}%`,
                              position: 'absolute'
                            }}
                          />
                          {children}
                        </div>
                      )}
                      renderThumb={({ props: { key, ...restProps } }) => (
                        <div
                          key={key}
                          {...restProps}
                          className="h-5 w-5 bg-white dark:bg-gray-800 rounded-full shadow-md border-2 border-[#2d5181] dark:border-[#4b7ac7] focus:outline-none focus:ring-2 focus:ring-[#2d5181] dark:focus:ring-[#4b7ac7]"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Min</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatPrice(priceRange[0])}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Max</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatPrice(priceRange[1])}</p>
                    </div>
                  </div>
                  {budgetError && (
                    <p className="mt-1 text-sm text-red-500">
                      {budgetError}
                    </p>
                  )}
                </div>
              </div>


              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                {!isChatView ? (
                  <div className="space-y-6">
                    <div className="space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold dark:text-white">
                          3. Describe a car that would fit your life perfectly. What's your:
                        </h2>
                        <Image
                          src="/ai_icon.png"
                          alt="AI Assistant"
                          width={48}
                          height={48}
                          className="ml-4"
                        />
                      </div>
                      <ul className="list-disc pl-8 space-y-2 text-xl dark:text-gray-400">
                        <li>"Nice to haves"?</li>
                        <li>"Must haves"?</li>
                      </ul>
                      <p className="text-xl dark:text-gray-400">Use a little or a lot of detail.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., I am a 34-year old parent living in Los Angeles. I have 2 kids, ages 2 and 7 who will be riding with me often. My must-haves are a reliable, fuel efficient, comfortable car. My nice-to-have: a sunroof."
                        className="w-full h-48 p-4 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181] transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="w-full md:w-auto px-6 h-12 rounded-xl bg-[#2d5181] dark:bg-[#4b7ac7] text-white hover:bg-[#1f3557] dark:hover:bg-[#3b5a9f] transition-colors md:self-end"
                      >
                        Send
                      </button>
                    </div>
                    {chatError && (
                        <p className="mt-1 text-sm text-red-500">
                          {chatError}
                        </p>
                      )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div ref={chatContainerRef} className="h-[300px] overflow-y-auto space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`max-w-[80%] p-4 rounded-xl ${
                            message.isUser
                              ? "ml-auto bg-[#2d5181] dark:bg-[#4b7ac7] text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                      ))}
                      {isWaitingForResponse && (
                        <div className="max-w-[80%] p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                          <LoadingDots />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full h-48 p-4 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181] transition-all"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="w-full md:w-auto px-6 h-12 rounded-xl bg-[#2d5181] dark:bg-[#4b7ac7] text-white hover:bg-[#1f3557] dark:hover:bg-[#3b5a9f] transition-colors md:self-end"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Step 2: Additional Details
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Details</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">We&apos;ll help you...</p>
              </div>

              {/* Year Range */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  What year range are you considering?
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                      placeholder="2019"
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181] transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">From</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                      placeholder="2024"
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#2d5181]/20 focus:border-[#2d5181] transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">To</p>
                  </div>
                  {step2Errors.yearRange && (
                    <p className="col-span-2 text-red-500 text-sm mt-2">{step2Errors.yearRange}</p>
                  )}
                </div>
              </div>

              {/* Power Type */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  You mentioned a car that&apos;s <span className={questionStyles.highlight}>comfortable</span>, but you didn&apos;t mention the size. Which are you open to?
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {powerTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => handlePowerTypeClick(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedPowerTypes.includes(type.id)
                            ? "border-[#2d5181] dark:border-[#4b7ac7] bg-[#c0d6f5]/30"
                            : "border-gray-200 dark:border-gray-600 hover:border-[#2d5181] dark:hover:border-[#4b7ac7]/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="h-20 flex items-center justify-center">
                          {type.src ? (
                            <Image
                              src={`/images/${type.src}`}
                              alt={type.text}
                              width={50}
                              height={50}
                              className="transition-transform duration-200 transform hover:scale-105"
                            />
                          ) : (
                            <span className="text-3xl text-gray-600 dark:text-gray-400">{type.icon}</span>
                          )}
                        </div>
                        <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-400">{type.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional Power Types */}
                  {showMorePowerTypes && (
                    <div className="grid grid-cols-2 gap-4">
                      {additionalPowerTypes.map(type => (
                        <div
                          key={type.id}
                          onClick={() => handlePowerTypeClick(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            selectedPowerTypes.includes(type.id)
                              ? "border-[#2d5181] dark:border-[#4b7ac7] bg-[#c0d6f5]/30"
                              : "border-gray-200 dark:border-gray-600 hover:border-[#2d5181] dark:hover:border-[#4b7ac7]/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="h-20 flex items-center justify-center">
                            <span className="text-3xl text-gray-600 dark:text-gray-400">{type.icon}</span>
                          </div>
                          <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-400">{type.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {step2Errors.powerType && (
                    <p className="text-red-500 text-sm mt-2">{step2Errors.powerType}</p>
                  )}
                </div>
              </div>

              {/* Body Type */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  You mentioned a car that&apos;s <span className={questionStyles.highlight}>comfortable</span>, but you didn&apos;t mention <span className={questionStyles.highlight}>the size</span>. Which are you open to?
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {bodyTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => handleBodyTypeClick(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedBodyTypes.includes(type.id)
                            ? "border-[#2d5181] dark:border-[#4b7ac7] bg-[#c0d6f5]/30"
                            : "border-gray-200 dark:border-gray-600 hover:border-[#2d5181] dark:hover:border-[#4b7ac7]/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="h-20 flex items-center justify-center">
                          {type.src ? (
                            <Image
                              src={`/images/${type.src}`}
                              alt={type.text}
                              width={50}
                              height={50}
                              className="transition-transform duration-200 transform hover:scale-105"
                            />
                          ) : (
                            <span className="text-3xl text-gray-600 dark:text-gray-400">{type.icon}</span>
                          )}
                        </div>
                        <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-400">{type.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Additional Body Types */}
                  {showMoreBodyTypes && (
                    <div className="grid grid-cols-2 gap-4">
                      {additionalBodyTypes.map(type => (
                        <div
                          key={type.id}
                          onClick={() => handleBodyTypeClick(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            selectedBodyTypes.includes(type.id)
                              ? "border-[#2d5181] dark:border-[#4b7ac7] bg-[#c0d6f5]/30"
                              : "border-gray-200 dark:border-gray-600 hover:border-[#2d5181] dark:hover:border-[#4b7ac7]/50 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="h-20 flex items-center justify-center">
                            <span className="text-3xl text-gray-600 dark:text-gray-400">{type.icon}</span>
                          </div>
                          <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-400">{type.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {step2Errors.bodyType && (
                    <p className="text-red-500 text-sm mt-2">{step2Errors.bodyType}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {currentStep === 0 ? (
            <>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 border-2 border-[#2d5181] text-[#2d5181] dark:border-[#4b7ac7] dark:text-[#4b7ac7] rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Exit quiz
              </button>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] dark:bg-[#4b7ac7] dark:text-white dark:hover:bg-[#3b5a9f] transition-colors"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-[#2d5181] text-[#2d5181] dark:border-[#4b7ac7] dark:text-[#4b7ac7] rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSeeMatches}
                className="px-8 py-3 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] dark:bg-[#4b7ac7] dark:text-white dark:hover:bg-[#3b5a9f] transition-colors"
              >
                See Matches
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
