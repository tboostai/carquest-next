"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

type TabType = 'Original' | 'Summary';

export default function DetailsPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  console.log("id:", id);

  const [isFavorite, setIsFavorite] = useState(true);
  const [activeImage, setActiveImage] = useState({ src: `carmain${id}.png`, index: 0 });
  const [activeTab, setActiveTab] = useState<TabType>('Original');
  const [isExpanded, setIsExpanded] = useState(true);

  const carImages = [
    { id: 0, src: "cars_0.png" },
    { id: 1, src: "cars_1.png" },
    { id: 2, src: "cars_4.png" },
    { id: 3, src: "cars_3.png" },
    { id: 4, src: "cars_2.png" }
  ];

  const specifications = [
    { id: 1, icon: "icon_1.png", label: "Mileage", value: "12,500 miles" },
    { id: 3, icon: "icon_3.png", label: "Transmission", value: "Automatic" },
    { id: 0, icon: "icon_0.png", label: "Fuel Type", value: "Hybrid" },
    { id: 4, icon: "icon_4.png", label: "Exterior Color", value: "Navy" },
    { id: 8, icon: "icon_7.png", label: "Interior Color", value: "Black" },
    { id: 5, icon: "icon_5.png", label: "Interior", value: "Leather" },
  ];

  const cars = [
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
    {
      id: 2,
      name: "2021 Toyota Camry Hybrid",
      estimated: "SE 90K miles",
      price: "$16,808",
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "19 miles away",
      src: "carmain2.png"
    },
    {
      id: 3,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 40K miles",
      price: "$19,500",
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "21 miles away",
      src: "carmain3.png"
    },
  ];

  function jump() {
    router.push("/favorites");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location and Distance Info */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">SE • 45K miles</p>
          <p className="text-gray-600 text-sm">Los Angeles, CA (10 miles away)</p>
        </div>

        {/* Car Gallery Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    onClick={jump}
                    src={`/images/${activeImage.src}`}
                    alt="Car view"
                    fill
                    className="object-cover cursor-pointer"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2">
              {carImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage({ src: img.src, index })}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all
                    ${activeImage.index === index ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200'}`}
                >
                  <Image 
                    src={`/images/${img.src}`} 
                    alt={`Car view ${index + 1}`} 
                    fill 
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">2024 Toyota Camry Hybrid</h1>
                <p className="text-xl font-semibold text-[#2d5181]">$32,995</p>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex flex-col items-center justify-center h-14 w-14"
                >
                  <div className="h-6 flex items-center justify-center">
                    <motion.svg
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-6 h-6 ${isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </motion.svg>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Favorite</span>
                </button>
                <button className="flex flex-col items-center justify-center h-14 w-14">
                  <div className="h-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400 leading-none">+</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Compare</span>
                </button>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specifications.map(spec => (
                <div
                  key={spec.id}
                  className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={`/images/${spec.icon}`}
                      alt={spec.label}
                      width={20}
                      height={20}
                      className="opacity-75"
                    />
                    <div>
                      <p className="text-xs text-gray-500">{spec.label}</p>
                      <p className="text-sm font-medium text-gray-900">{spec.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 px-6 py-3 bg-[#2d5181] text-white rounded-lg hover:bg-[#1f4066] transition-colors font-medium">
                Contact Dealer
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Highlights */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Highlights</h2>
          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/images/Reliability badge.png" 
                alt="Reliability" 
                width={48} 
                height={48}
                className="mb-2" 
              />
              <span className="text-sm text-gray-600">Reliability</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/images/Fuel efficiency badge.png" 
                alt="Fuel Efficiency" 
                width={48} 
                height={48}
                className="mb-2" 
              />
              <span className="text-sm text-gray-600">Fuel Efficiency</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/images/Comfort badge.png" 
                alt="Comfort" 
                width={48} 
                height={48}
                className="mb-2" 
              />
              <span className="text-sm text-gray-600">Comfort</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/images/Safety badge.png" 
                alt="Safety" 
                width={48} 
                height={48}
                className="mb-2" 
              />
              <span className="text-sm text-gray-600">Safety</span>
            </div>
          </div>
        </section>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description:</h2>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Tabs */}
                <div className="flex w-full border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button
                    onClick={() => setActiveTab('Original')}
                    className={`flex-1 pb-4 text-sm font-medium transition-colors relative
                      ${activeTab === 'Original'
                        ? 'text-[#2d5181] dark:text-[#4b7ac7]'
                        : 'text-gray-600 dark:text-gray-400'
                      }`}
                  >
                    Original
                    {activeTab === 'Original' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2d5181] dark:bg-[#4b7ac7]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('Summary')}
                    className={`flex-1 pb-4 text-sm font-medium transition-colors relative
                      ${activeTab === 'Summary'
                        ? 'text-[#2d5181] dark:text-[#4b7ac7]'
                        : 'text-gray-600 dark:text-gray-400'
                      }`}
                  >
                    Summary AI
                    {activeTab === 'Summary' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2d5181] dark:bg-[#4b7ac7]" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  {activeTab === 'Original' ? (
                    <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                      <li>The property is a 2 bedroom, 3 bathroom townhouse.</li>
                      <li>It has a brand new kitchen with quartz counters and new appliances.</li>
                      <li>The main floor features oak hardwood flooring and a powder room.</li>
                      <li>The main floor also has a large dining room and living room with a gas fireplace.</li>
                      <li>The upstairs area includes a large principal bedroom with an ensuite and a large 2nd bedroom.</li>
                      <li>The property is located in the Forest Hill strata with low maintenance fees.</li>
                      <li>It comes with 2 parking stalls and a storage locker.</li>
                    </ul>
                  ) : (
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                      <p>
                        Modern 2-bed, 3-bath townhouse in Forest Hill featuring premium finishes including new kitchen 
                        with quartz counters, oak hardwood floors, and gas fireplace. Includes parking and storage.
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>New kitchen with modern appliances</li>
                          <li>Hardwood flooring throughout main level</li>
                          <li>Spacious primary suite with ensuite</li>
                          <li>2 parking spots included</li>
                          <li>Low maintenance fees</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 py-3 text-[#2d5181] dark:text-[#4b7ac7] border border-[#2d5181] dark:border-[#4b7ac7] 
              rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Overview and Features */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview and Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specifications.map(item => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <Image 
                    src={`/images/${item.icon}`} 
                    alt={item.label} 
                    width={20} 
                    height={20}
                    className="opacity-75" 
                  />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <div className="word mb-5">
          <p className="text-xl font-semibold">History</p>
          <div className="word_box w-full pl-4 mt-3">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16} />
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">Clean Title</p>
                  <p className="m-0 p-0 text-sm">No Issues Reported</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16} />
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">0 Accidents</p>
                  <p className="m-0 p-0 text-sm">No Accidents or Damage Reported</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16} />
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">1 Previous Owner</p>
                  <p className="m-0 p-0 text-sm">Vehicle has One Previous Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <section className="mt-12 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">You Might Also Like</h2>
            <button className="text-sm text-[#2d5181] hover:text-[#1f4066] transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map(car => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/details/${car.id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
              >
                {/* Car Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={`/images/${car.src}`}
                    alt={car.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Car Info */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">{car.name}</h3>
                      <p className="text-sm text-gray-500">{car.estimated}</p>
                    </div>
                    <p className="font-semibold text-[#2d5181]">
                      {car.price}
                    </p>
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
