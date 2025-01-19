"use client";

import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      question: "How does the AI car quiz work?",
      answer: "Our AI quiz analyzes your lifestyle, preferences, and needs through a series of questions. It then matches you with vehicles that best fit your requirements using our advanced algorithm."
    },
    {
      question: "Is CarQuest free to use?",
      answer: "Yes, CarQuest is completely free for users. We help you find your perfect car match without any charges or hidden fees."
    },
    {
      question: "How accurate are the car recommendations?",
      answer: "Our AI system is continuously learning and improving, providing highly accurate recommendations based on real user data and expert automotive knowledge."
    },
    {
      question: "Can I compare different cars?",
      answer: "Yes, you can compare multiple vehicles side by side, examining their features, specifications, and prices to make an informed decision."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support & Contact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help? We&apos;re here to assist you with any questions or concerns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5181] focus:border-[#2d5181] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5181] focus:border-[#2d5181] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5181] focus:border-[#2d5181] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5181] focus:border-[#2d5181] transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#2d5181] text-white rounded-lg hover:bg-[#1f3557] transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.section>

          {/* FAQs Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 