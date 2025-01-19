"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
interface ComparisonCategory {
  id: number;
  title: string;
  showCover: boolean;
  icon?: string;
  items?: { label: string; values: string[] }[];
}

export default function FavoritesPage() {
  const [categories, setCategories] = useState<ComparisonCategory[]>([
    {
      id: 0,
      title: "Entertainment",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Audio System", values: ["Premium Audio", "Standard"] },
        { label: "Screen Size", values: ['10.1"', '8"'] }
      ]
    },
    {
      id: 1,
      title: "Performance",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Horsepower", values: ["203 hp", "192 hp"] },
        { label: "Torque", values: ["184 lb-ft", "192 lb-ft"] },
        { label: "0-60 mph", values: ["7.2 sec", "7.5 sec"] }
      ]
    },
    {
      id: 2,
      title: "Engine",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Engine Type", values: ["2.5L 4-Cylinder", "1.5L Turbo 4-Cylinder"] },
        { label: "Transmission", values: ["8-speed Auto", "CVT"] },
        { label: "Fuel Economy", values: ["28/39 mpg", "30/38 mpg"] }
      ]
    },
    {
      id: 3,
      title: "Tires & Wheels",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Wheel Size", values: ['19"', '17"'] },
        { label: "Tire Type", values: ["All-Season", "All-Season"] },
        { label: "Spare Tire", values: ["Temporary", "Temporary"] }
      ]
    },
    {
      id: 4,
      title: "Weight & Capacity",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Curb Weight", values: ["3,572 lbs", "3,380 lbs"] },
        { label: "Fuel Capacity", values: ["14.5 gal", "14.8 gal"] },
        { label: "Passenger Volume", values: ["100.4 cu ft", "105.7 cu ft"] }
      ]
    },
    {
      id: 5,
      title: "Safety",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Airbags", values: ["10", "10"] },
        { label: "Crash Rating", values: ["5-Star", "5-Star"] },
        { label: "Driver Assistance", values: ["Standard", "Standard"] }
      ]
    },
    {
      id: 6,
      title: "Suspension",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Front", values: ["Independent MacPherson", "MacPherson Strut"] },
        { label: "Rear", values: ["Multi-link", "Multi-link"] },
        { label: "Stabilizer Bar", values: ["Standard", "Standard"] }
      ]
    },
    {
      id: 7,
      title: "Brakes",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Front", values: ["Ventilated Disc", "Ventilated Disc"] },
        { label: "Rear", values: ["Solid Disc", "Solid Disc"] },
        { label: "ABS", values: ["4-Wheel", "4-Wheel"] }
      ]
    },
    {
      id: 8,
      title: "Dimensions",
      showCover: false,
      icon: "xia.png",
      items: [
        { label: "Length", values: ["192.1 in", "195.7 in"] },
        { label: "Width", values: ["72.4 in", "73.3 in"] },
        { label: "Height", values: ["56.9 in", "57.1 in"] },
        { label: "Wheelbase", values: ["111.2 in", "111.4 in"] }
      ]
    }
  ]);

  const [selectedCars] = useState([
    { id: 1, name: "2023 Toyota Camry", price: "$18,886", image: "group_1.png" },
    { id: 2, name: "2023 Honda Accord", price: "$18,886", image: "group_2.png" }
  ]);

  function toggleCategory(id: number) {
    setCategories(prev =>
      prev.map(category => ({
        ...category,
        showCover: category.id === id ? !category.showCover : category.showCover
      }))
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Compare Your Favorites</h1>
          <p className="mt-2 text-gray-600">Compare features and specifications side by side</p>
        </div>

        {/* Selected Cars Header */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-700">Price</h2>
          </div>
          {selectedCars.map(car => (
            <div key={car.id} className="bg-white rounded-xl p-4 shadow-sm">
              <Image
                src={`/images/${car.image}`}
                alt={car.name}
                width={200}
                height={120}
                className="object-contain mb-4"
              />
              <h3 className="font-medium text-gray-900">{car.name}</h3>
              <div>
                <p className="m-0 text-xs underline cursor-pointer">Change</p>
              </div>
              <div className="align-bottom">
                <p>$18,886</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Categories */}
        <div className="space-y-4">
          {categories.map(category => (
            <motion.div key={category.id} layout className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {/* {category.icon && (
                    <Image src={`/images/${category.icon}`} alt="" width={24} height={24} className="opacity-75" />
                  )} */}
                  <span className="font-medium text-gray-900">{category.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${category.showCover ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {category.showCover && category.items && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t">
                      {category.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-6 py-2 border-b last:border-0">
                          <div className="text-sm text-gray-600">{item.label}</div>
                          {item.values.map((value, i) => (
                            <div key={i} className="text-sm font-medium">
                              {value}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
