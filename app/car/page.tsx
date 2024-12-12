"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";

export default function CarPage() {
  const router = useRouter();

  const [aixin, setAixin] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
  const [tabs, setTabs] = useState<{ id: number; text: string }[]>([]);
  const [cars, setCars] = useState([
    {
      id: 0,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: 19800,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "10 miles away",
      src: "2023_toyota_camry-hybrid_sedan_se-nightshade_s_oem_1_1600x1067 1.png"
    },
    {
      id: 1,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 45K miles",
      price: 19800,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "11 miles away",
      src: "Screenshot 2024-10-04 at 4.01.16 PM 1.png"
    },
    {
      id: 2,
      name: "2021 Toyota Camry Hybrid",
      estimated: "SE 90K miles",
      price: 16808,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "19 miles away",
      src: "Image 17 1.png"
    },
    {
      id: 3,
      name: "2023 Toyota Camry Hybrid",
      estimated: "SE 40K miles",
      price: 19500,
      miles: "45K miles $409/mo",
      cash: "$0 cash down",
      milesAway: "21 miles away",
      src: "Image 18 1.png"
    }
  ]);

  const [state, setState] = useState(false); // For sorting direction

  const fiters = [
    {
      id: 0,
      type: "price",
      lis: [
        { id: 0, text: "0-10,000" },
        { id: 1, text: "10,000-30,000" },
        { id: 2, text: "30,000-50,000" }
      ]
    },
    {
      id: 1,
      type: "brand",
      lis: [
        { id: 0, text: "BMW" },
        { id: 1, text: "HONDA" }
      ]
    },
    {
      id: 2,
      type: "feature",
      lis: [
        { id: 0, text: "Sunroof" },
        { id: 1, text: "4WD" },
        { id: 2, text: "Navigate" }
      ]
    }
  ];

  function changeFilter() {
    setIsFilter(!isFilter);
  }

  function end() {
    const newTabs: { id: number; text: string }[] = [];
    for (const [typeIdStr, itemId] of Object.entries(selectedItems)) {
      const typeId = parseInt(typeIdStr, 10);
      const selectedTab = fiters[typeId].lis.find(l => l.id === itemId);
      if (selectedTab && !newTabs.find(t => t.text === selectedTab.text)) {
        newTabs.push({ id: newTabs.length, text: selectedTab.text });
      }
    }
    setTabs(newTabs);
    setIsFilter(false);
  }

  function sele(typeId: number, itemId: number) {
    setSelectedItems(prev => ({ ...prev, [typeId]: itemId }));
  }

  function sort() {
    const sorted = [...cars];
    if (!state) {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }
    setCars(sorted);
    setState(!state);
  }

  function changeAixin() {
    setAixin(!aixin);
  }

  function removeTab(index: number) {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);
  }

  function jump(id: number) {
    router.push(`/details/${id}`);
  }

  function change(i: number) {
    // No DOM manipulation, just a placeholder for future state logic
    console.log(i);
  }

  return (
    <div className="car">
      <NavBar />
      <div className="max-w-screen-lg mx-auto p-4">
        {/* Title Section */}
        <div className="flex items-center mb-1">
          <p className="w-full">&lt; &nbsp; Local Car Matches</p>
        </div>

        {/* Quiz Results Summary Card */}
        <div className="bg-gray-100 p-3 border border-gray-300 rounded">
          <p className="text-xl font-semibold mb-3">Quiz Results Summary</p>
          <div className="mb-3">
            <div className="flex items-center border border-black rounded h-12 px-2">
              <div className="mr-2">
                <Image src="/images/search.png" alt="search icon" width={24} height={24} />
              </div>
              <input
                type="text"
                placeholder="Quiz results: Toyota Camry & Honda..."
                className="w-full h-full outline-none border-none text-sm"
              />
            </div>
          </div>

          <div className="icons">
            <ul className="flex justify-around list-none m-0 p-0">
              <li>
                <Image src="/images/Reliability badge.png" alt="Reliability badge" width={40} height={40} />
              </li>
              <li>
                <Image src="/images/Fuel efficiency badge.png" alt="Fuel efficiency badge" width={40} height={40} />
              </li>
              <li>
                <Image src="/images/Comfort badge.png" alt="Comfort badge" width={40} height={40} />
              </li>
              <li>
                <Image src="/images/Safety badge.png" alt="Safety badge" width={40} height={40} />
              </li>
            </ul>
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-sm underline cursor-pointer">See full quiz results</p>
          </div>
        </div>

        {/* Applied Filters */}
        <div className="applied mt-5">
          <p className="text-xl font-semibold mb-3">Applied Filters</p>
          <div className="flex justify-between items-center">
            <p className="w-[70%] text-sm">
              Based on your quiz results, we’ve set filters to guide your search. Use our filters or adjust them.
            </p>
            <div className="relative">
              <Image
                src="/images/Component 1.png"
                alt=""
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={changeFilter}
              />
              <p className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute top-[-0.8rem] right-[-0.3rem]">
                {tabs.length}
              </p>
              {isFilter && (
                <ul className="list-none m-0 p-3 bg-[#c0d6f5] rounded-md absolute top-full right-[-10%] z-50">
                  {fiters.map(f => (
                    <li key={f.id} className="mb-2">
                      <p className="font-bold text-sm mb-1">{f.type}</p>
                      <ol className="flex m-0 p-0 list-none">
                        {f.lis.map(items => (
                          <li key={items.id} className="m-0 p-0">
                            <p
                              onClick={() => sele(f.id, items.id)}
                              className={`cursor-pointer border-2 border-[#2d5181] rounded-md text-xs px-2 py-1 mx-1 ${
                                selectedItems[f.id] === items.id ? "bg-blue-500 text-white" : ""
                              }`}
                            >
                              {items.text}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                  <li className="end flex justify-end mt-2">
                    <button onClick={end} className="px-4 py-1 border-2 border-gray-500 rounded-full text-xs">
                      verify
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <ul className="flex flex-wrap items-center mt-3 list-none p-0">
            {tabs.map((item, index) => (
              <li
                key={item.id}
                className="mr-3 mt-2 bg-[#f5f5f5] text-sm shadow px-2 py-1 rounded-md flex items-center gap-1"
              >
                {item.text}
                <span onClick={() => removeTab(index)} className="cursor-pointer text-red-500 ml-1 font-bold">
                  X
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-2">
            <p className="text-sm underline cursor-pointer">Reset to Quiz Results Filters</p>
          </div>
        </div>
      </div>

      {/* Navigation/Filters Row */}
      <div className="changeNav mt-3">
        <div className="change flex justify-center items-center">
          <ul className="flex items-center h-10 rounded-full border-2 border-[#2d5181] w-[65%] m-auto list-none p-0">
            <li
              className="flex-1 text-center cursor-pointer text-white bg-[#2d5181] rounded-full text-sm py-1"
              onClick={() => change(0)}
            >
              Totota Camry
            </li>
            <li
              className="flex-1 text-center cursor-pointer text-[#2d5181] text-sm py-1"
              onClick={() => change(1)}
            >
              Honda...
            </li>
          </ul>
        </div>
        <ul className="flex items-center mt-3 justify-around list-none p-0">
          <li className="flex flex-col items-center">
            <div className="icon">
              <Image src="/images/Location icon.png" alt="" width={20} height={20} />
            </div>
            <p className="text-xs">Los Angeles,CA</p>
          </li>
          <li className="flex flex-col items-center cursor-pointer" onClick={sort}>
            <div className="icon">
              <Image src="/images/Sort.png" alt="" width={20} height={20} />
            </div>
            <p className="text-xs">Sort</p>
          </li>
          <li className="flex flex-col items-center cursor-pointer" onClick={changeAixin}>
            <div className="icon">
              <Image src={`/images/${aixin ? "Vector.png" : "aixin.png"}`} alt="" width={21} height={19} />
            </div>
            <p className="text-xs">&nbsp;Save search</p>
          </li>
        </ul>
      </div>

      {/* Cars Listing */}
      <div className="cars p-4">
        <p className="max-w-screen-lg mx-auto p-4">
          Showing Your Top <b>5</b> out of <b>185 Results</b>
        </p>
        <ul className="flex flex-wrap justify-center gap-8 list-none p-0 m-0">
          {cars.map(item => (
            <li
              key={item.id}
              onClick={() => jump(item.id)}
              className="cursor-pointer border-2 border-gray-800 rounded p-3 w-48 mt-5"
            >
              <div className="top flex justify-center items-center">
                <Image src={`/images/${item.src}`} alt="" width={200} height={120} className="object-contain" />
              </div>
              <div className="btm flex w-full p-3 border-t-2 border-black h-32">
                <div className="left w-1/2 h-full text-xs">
                  <b className="block text-sm">{item.name}</b>
                  <p className="m-0 p-0 text-sm">{item.estimated}</p>
                  <p className="text-sm">${item.price}</p>
                </div>
                <div className="right w-1/2 h-full text-right text-xs">
                  <p>{item.miles}</p>
                  <p>{item.cash}</p>
                  <p>{item.milesAway}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
