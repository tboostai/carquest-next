"use client";

import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Take the AI Quiz",
      description: "Answer a few simple questions about your lifestyle, preferences, and needs.",
      image: "Device 13PM.png",
      features: [
        "Personalized questions",
        "Lifestyle-based recommendations",
        "Quick 3-minute process"
      ]
    },
    {
      title: "Get Matched",
      description: "Our AI analyzes thousands of cars to find your perfect matches.",
      image: "step2.png",
      features: [
        "Smart filtering",
        "Price range matching",
        "Feature-based recommendations"
      ]
    },
    {
      title: "Compare & Choose",
      description: "Compare your matches side by side and make an informed decision.",
      image: "Device 13PM (1).png",
      features: [
        "Detailed comparisons",
        "Real-time availability",
        "Local dealership information"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How CarQuest Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect car in three simple steps with our AI-powered platform.
          </p>
        </motion.div>

        {/* Steps Section */}
        {steps.map((step, index) => (
          <motion.section
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="mb-20"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {index + 1}. {step.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-[#2d5181] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 0 ? "order-2" : "order-1"} relative h-80`}>
                  <Image
                    src={`/images/${step.image}`}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-gray-600 mb-8">Start your journey with our AI-powered car quiz today.</p>
          <Link
            href="/quiz"
            className="px-8 py-3 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] transition-colors inline-block"
          >
            Take the Quiz
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
} 