"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our advanced AI understands your lifestyle and preferences to find your perfect car match",
      icon: "🤖"
    },
    {
      title: "Comprehensive Search",
      description: "Access listings from multiple sources including dealerships and private sellers",
      icon: "🔍"
    },
    {
      title: "Smart Comparison",
      description: "Compare cars side by side with detailed specifications and features",
      icon: "⚖️"
    }
  ];

  const steps = [
    {
      title: "Take the Quiz",
      description: "Answer a few questions about your lifestyle and preferences",
      image: "Device 13PM.png",
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Get Matched",
      description: "Receive personalized car recommendations based on your needs",
      image: "step2.png",
      color: "from-purple-50 to-purple-100"
    },
    {
      title: "Find Your Car",
      description: "Compare options and connect with sellers in your area",
      image: "Device 13PM (1).png",
      color: "from-blue-50 to-blue-100"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "First-time Buyer",
      image: "Group 170.png",
      quote: "The AI quiz helped me find exactly what I needed as a new parent. Love my new SUV!"
    },
    {
      name: "James L.",
      role: "Car Enthusiast",
      image: "Group 149.png",
      quote: "CarQuest's comparison tools made it easy to find the perfect balance of performance and practicality."
    },
    {
      name: "Maria R.",
      role: "City Commuter",
      image: "Group 149 (1).png",
      quote: "Found my ideal hybrid car in just one day. The recommendations were spot-on!"
    }
  ];

  const dataSources = [
    { id: 0, src: "Cars 1.png", alt: "Cars.com" },
    { id: 1, src: "Carvana_20logo-2452930403-removebg-preview 1.png", alt: "Carvana" },
    { id: 2, src: "CarMax-Logo-1058735071 1.png", alt: "CarMax" },
    { id: 3, src: "autotrader_logo-1606845915-removebg-preview 1.png", alt: "AutoTrader" },
    {
      id: 4,
      src: "61-610708_october-22-2018-start-selling-on-facebook-marketplace-3261780179-removebg-preview 1.png",
      alt: "Facebook Marketplace"
    },
    { id: 5, src: "Craigslist-Emblem-3527060028 1.png", alt: "Craigslist" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/homeBg.png" 
          alt="Hero background" 
          fill 
          className="object-cover brightness-[0.85]" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Car Match with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Take our 3-minute quiz and let AI find the ideal car for your lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/quiz")}
              className="px-8 py-4 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] transition-all duration-200 transform hover:scale-105"
            >
              Start AI Quiz →
            </button>
            <button
              onClick={() => router.push("/how-it-works")}
              className="px-8 py-4 bg-white/90 text-gray-900 rounded-full hover:bg-white transition-all duration-200"
            >
              How It Works
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trusted Data Sources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Trusted Data Sources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              We aggregate listings from leading automotive marketplaces to ensure you find the best options
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {dataSources.map((source) => (
                <motion.div
                  key={source.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <Image
                    src={`/images/${source.src}`}
                    alt={source.alt}
                    width={120}
                    height={40}
                    className="object-contain opacity-75 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CarQuest?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine artificial intelligence with extensive car data to help you make the best choice
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your perfect car in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-b ${step.color} rounded-2xl p-6 shadow-sm`}
              >
                <div className="relative h-48 mb-6">
                  <Image
                    src={`/images/${step.image}`}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied car buyers who found their perfect match
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={`/images/${testimonial.image}`}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-gray-600 mb-8">
            Take our AI-powered quiz and get matched with cars that fit your lifestyle
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="px-8 py-4 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] transition-all duration-200 transform hover:scale-105"
          >
            Start AI Quiz →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
