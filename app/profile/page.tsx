"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "Los Angeles, CA"
  });

  const menuItems = [
    {
      title: "My Favorites",
      description: "View and manage your saved cars",
      icon: "❤️",
      path: "/favorites"
    },
    {
      title: "Compare Cars",
      description: "View your car comparisons",
      icon: "🔄",
      path: "/compare"
    },
    {
      title: "Search History",
      description: "View your recent searches",
      icon: "🔍",
      path: "#"
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: "⚙️",
      path: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#2d5181] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.location}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => item.path !== "#" && router.push(item.path)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 text-[#2d5181] hover:text-[#1f4066] transition-colors">
            Sign Out
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
} 