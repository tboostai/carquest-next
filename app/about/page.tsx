"use client";

import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "group_170.png",
      description: "Passionate about making car buying easier and more accessible for everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of AI Technology",
      image: "group_149.png",
      description: "Leading our AI development to create personalized car recommendations."
    },
    {
      name: "Priya Patel",
      role: "Customer Experience Director",
      image: "group_149 (1).png",
      description: "Ensuring every user has a seamless journey finding their perfect car."
    }
  ];

  const milestones = [
    { year: "2022", event: "CarQuest Founded" },
    { year: "2023", event: "Launch of AI-Powered Car Quiz" },
    { year: "2024", event: "Expanded to Nationwide Coverage" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CarQuest</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re revolutionizing the car buying experience with AI-powered personalization,
            making it easier than ever to find your perfect vehicle match.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed">
                  At CarQuest, we believe finding the right car shouldn&apos;t be a hassle. 
                  Our mission is to simplify the car buying process by combining artificial 
                  intelligence with human expertise, providing personalized recommendations 
                  that truly match your lifestyle and needs.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We aggregate data from multiple sources and use advanced AI algorithms 
                  to help you make informed decisions, saving you time and ensuring 
                  you find the perfect vehicle.
                </p>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/homeBg.png"
                  alt="CarQuest Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={`/images/${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">{member.name}</h3>
                <p className="text-[#2d5181] text-center mb-3">{member.role}</p>
                <p className="text-gray-600 text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } mb-8`}
              >
                <div className="w-1/2 flex items-center">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#2d5181]">{milestone.year}</h3>
                    <p className="text-gray-600">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or want to learn more about CarQuest? We&apos;d love to hear from you.
          </p>
          <button className="px-8 py-3 bg-[#2d5181] text-white rounded-full hover:bg-[#1f3557] transition-colors">
            Contact Us
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
} 