"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites] = useState([
    {
      id: 0,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: "$19,800",
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "10 miles away",
      src: "carmain0.png"
    },
    {
      id: 1,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: "$19,800",
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "11 miles away",
      src: "carmain1.png"
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">Cars you&apos;ve saved for later</p>
        </div>

        {favorites.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="mb-4">
              <Image
                src="/images/empty-favorites.png"
                alt="No favorites"
                width={120}
                height={120}
                className="mx-auto opacity-50"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start exploring cars and save your favorites here</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-[#2d5181] text-white rounded-lg hover:bg-[#1f4066] transition-colors"
            >
              Explore Cars
            </button>
          </div>
        ) : (
          // Favorites grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(car => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Car Image */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/details/${car.id}`)}
                >
                  <Image
                    src={`/images/${car.src}`}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Car Info */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">{car.name}</h3>
                      <p className="text-sm text-gray-500">{car.estimated}</p>
                    </div>
                    <p className="font-semibold text-[#2d5181]">{car.price}</p>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{car.miles}</p>
                    <p>{car.cash}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {car.milesAway}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => router.push(`/details/${car.id}`)}
                      className="flex-1 px-4 py-2 bg-[#2d5181] text-white rounded-lg hover:bg-[#1f4066] transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
