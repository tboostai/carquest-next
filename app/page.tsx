"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function HomePage() {
  const router = useRouter();

  // Data arrays replicating the Vue data
  const icons = [
    { id: 0, src: "Cars 1.png" },
    { id: 1, src: "Carvana_20logo-2452930403-removebg-preview 1.png" },
    { id: 2, src: "CarMax-Logo-1058735071 1.png" },
    { id: 3, src: "autotrader_logo-1606845915-removebg-preview 1.png" },
    {
      id: 4,
      src: "61-610708_october-22-2018-start-selling-on-facebook-marketplace-3261780179-removebg-preview 1.png",
    },
    { id: 5, src: "Craigslist-Emblem-3527060028 1.png" },
  ];

  const phones = [
    {
      id: 1,
      src: "Device 13PM.png",
      title: "1. Take the Quiz",
      word: "Get tailored recommendations in minutes, without endless searches.",
      bg: "bg-gradient-to-b from-[#b3d9ff] to-[#004080]"
    },
    {
      id: 2,
      src: "Screenshot 2024-10-05 at 6.42.50 PM 1.png",
      title: "2. View Car Results",
      word: "Every recommendation is customized to fit your lifestyle and needs.",
      bg: "bg-gradient-to-b from-[#EBE4F8] to-[#532C9B]",
    },
    {
      id: 3,
      src: "Device 13PM (1).png",
      title: "3. Find Your Dream Car",
      word: "Get back on the road faster with easy, informed car shopping.",
      bg: "bg-gradient-to-b from-[#b3d9ff] to-[#004080]",
    },
  ];

  const persons = [
    { id:0, src:'Group 170.png', name:'Cindy, 29', word:'“CarQuest’s AI quiz made me feel like I was talking to a friend who knew me so well.”' },
    { id:1, src:'Group 149.png', name:'Tom, 44', word:'“I was never a ‘car guy.’ I just wanted something to get me from Point A to Point B. CarQuest delivered.' },
    { id:2, src:'Group 149 (1).png', name:'Padma, 38', word:'“I wasn’t sure what car to get and what to prioritize. CarQuest guided me through it all.”' }
  ];

  const jump = () => {
    // Equivalent to this.$router.push('/test') in Vue
    router.push('/test');
  }

  return (
    <div className="home w-full min-h-screen flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <div 
        className="w-screen h-[25rem] bg-cover bg-center flex items-end justify-center" 
        style={{ backgroundImage: "url('/images/homeBg.png')" }}
      >
        <div className="text-center text-white mb-6">
          <div className="mb-2 font-bold text-lg">
            <p>Shop Cars that fit</p>
            <p>your lifestyle</p>
          </div>
          <div className="text-sm font-bold text-gray-200">
            <p>Let our CarQuest AI quiz help you find your</p>
            <p>perfect car match in three minutes or less!</p>
          </div>
          <button 
            onClick={jump} 
            className="mt-2 py-1 px-4 bg-white text-[#2d5181] font-bold rounded-full"
          >
            Start AI Quiz
          </button>
        </div>
      </div>

      {/* Icons Section */}
      <div className="p-4">
        <p className="text-center text-sm md:text-2xl my-6">We gather data from various sources to find your car!</p>
        <ul className="flex flex-wrap justify-center items-center">
          {icons.map(icon => (
            <li key={icon.id} className="m-3">
              <Image src={`/images/${icon.src}`} alt="" width={80} height={80} />
            </li>
          ))}
        </ul>
      </div>

      {/* How It Works */}
      <div className="w-full px-4">
        <div className="text-center mt-8">
          <p className="text-3xl font-bold">How It Works</p>
          <p className="text-sm mt-2">We use AI to find you your perfect car match, and then guide you through finding the best one in your area</p>
        </div>
        <ul className="flex flex-wrap justify-center mt-8">
          {phones.map(item => (
            <li key={item.id} className="w-full md:w-1/3 p-4 flex flex-col items-center text-center">
              <div className={`${item.bg} w-full h-80 flex items-center justify-center rounded-md`}>
                <Image src={`/images/${item.src}`} alt="" width={200} height={400} className="object-contain" />
              </div>
              <p className="font-bold text-xl mt-5">{item.title}</p>
              <p className="text-sm mt-2 h-12">{item.word}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex justify-center items-center h-20">
        <button 
          className="py-2 px-8 bg-[#2d5181] text-white rounded-full" 
          onClick={jump}
        >
          Try the Car Quiz
        </button>
      </div>

      <div className="text-center my-8 text-xl">CarQuest’s Customers Say:</div>
      <ul className="flex flex-wrap justify-center w-full px-4">
        {persons.map(item => (
          <li 
            key={item.id} 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex flex-col items-center"
          >
            <div className="h-40 flex justify-center items-center">
              <Image src={`/images/${item.src}`} alt="" width={100} height={100} className="object-contain" />
            </div>
            <div className="text-center mt-4">
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-sm text-gray-600 mt-2">{item.word}</p>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}
