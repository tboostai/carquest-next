"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

export default function TestPage() {
  const router = useRouter();

  // States equivalent to data()
  const [isShow, setIsShow] = useState(0);
  const [progress, setProgress] = useState(50);
  const [selectedOption, setSelectedOption] = useState(1);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(70000);

  // Dis One and Dis Two highlight states
  const [selectedOne, setSelectedOne] = useState<number | null>(null);
  const [selectedTwo, setSelectedTwo] = useState<number | null>(null);

  const dis_one = [
    { id: 0, src: "noun-electric-7260483 1.png", text: "Fully electric" },
    { id: 1, src: "noun-hybrid-car-7066649 1.png", text: "Hybrid (all kinds)" },
    { id: 2, src: "noun-oil-4865436 1.png", text: "Gasoline" },
    { id: 3, src: "noun-type-6719917 1.png", text: "Other (e.g., hydrogen, diesel)" },
  ];

  const dis_two = [
    { id: 0, src: "noun-sedan-6912534 1.png", text: "Sedan" },
    { id: 1, src: "noun-suv-6999801 1.png", text: "SUV" },
    { id: 2, src: "noun-minivan-5742163 1.png", text: "Minivan" },
    { id: 3, src: "noun-type-6719917 1.png", text: "Other (click to type)" },
  ];

  const [cover, setCover] = useState([false, false]);
  const [items, setItems] = useState([
    { id: 0, text: "Toyota Camry", state: "Unselect", src: "cars_0.png" },
    { id: 1, text: "Toyota Camry", state: "Unselect", src: "cars_0.png" },
  ]);

  function changeCover(index: number) {
    const newCover = [true, true];
    newCover[index] = false;
    setCover(newCover);

    const newItems = items.map((item, i) => ({
      ...item,
      state: i === index ? "Select" : "Unselect"
    }));
    setItems(newItems);
  }

  function jump() {
    router.push("/car");
  }

  function changeOption(option: number) {
    setSelectedOption(option);
  }

  function back() {
    setIsShow(isShow - 1);
    if (isShow === 1) {
      setProgress(50);
    }
  }

  function next() {
    const nextVal = isShow + 1;
    setIsShow(nextVal);
    if (nextVal === 1) {
      setProgress(100);
    }
  }

  // Slider logic: simplified - just two inputs and a range
  // We'll just show min and max as numeric inputs and a range input for demonstration.
  const handleMinChange = (val: number) => {
    if (val > maxValue) val = maxValue;
    setMinValue(val);
  };

  const handleMaxChange = (val: number) => {
    if (val < minValue) val = minValue;
    setMaxValue(val);
  };

  return (
    <div className="test pb-48">
      <NavBar />
      {/* Step 1 Screen */}
      {isShow === 0 && (
        <div className="one w-[70%] mx-auto max-w-full">
          <div className="progress_container w-[15%] mx-auto mt-8">
            <div className="progress h-2 border-2 border-[#2d5181]">
              <div
                className="progress-bar h-full bg-[#2d5181]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="title text-center">
            <p className="text-[#2d5181] text-xl">CarQuest Quiz</p>
          </div>
          <ul className="container_box list-none w-[90%] mx-auto">
            <li className="my-8">
              <div className="li_title mb-2">
                <p>1. <b>Where</b> are you shopping for a car?</p>
              </div>
              <div className="address w-[80%] h-10">
                <input
                  type="text"
                  placeholder="e.g., Los Angeles or 90210"
                  className="w-full h-full rounded-md pl-2 text-sm shadow border"
                />
              </div>
            </li>

            <li className="my-8">
              <div className="li_title mb-2">
                <p>2. What is your <b>budget?</b></p>
              </div>
              <div className="changeMenu w-[50%] h-6 flex items-center justify-center mx-auto rounded-full border border-[#c0d6f5]">
                <div
                  onClick={() => changeOption(1)}
                  className={`changeColorMenu flex-1 h-full flex justify-center items-center text-sm rounded-full cursor-pointer ${selectedOption === 1 ? 'bg-[#c0d6f5]' : 'bg-white'}`}
                >
                  Finance
                </div>
                <div
                  onClick={() => changeOption(2)}
                  className={`changeColorMenu flex-1 h-full flex justify-center items-center text-sm rounded-full cursor-pointer ${selectedOption === 2 ? 'bg-[#c0d6f5]' : 'bg-white'}`}
                >
                  Cash
                </div>
              </div>
              <div className="slider w-[80%] mx-auto mt-4">
                {/* Range slider simulation */}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={minValue}
                  onChange={(e) => handleMinChange(parseInt(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={maxValue}
                  onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                  className="w-full mt-2"
                />

                <div className="number flex mt-4 items-center justify-center">
                  <input
                    type="number"
                    value={minValue}
                    min={0}
                    max={maxValue}
                    onChange={(e) => handleMinChange(parseInt(e.target.value))}
                    className="border-2 border-black rounded-md text-center mr-8 w-20"
                  />
                  <div className="dash text-[#2d5181] text-xl">-</div>
                  <input
                    type="number"
                    value={maxValue}
                    min={minValue}
                    max={100000}
                    onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                    className="border-2 border-black rounded-md text-center ml-8 w-20"
                  />
                </div>
              </div>
            </li>

            <li className="my-8">
              <div className="li_title">
                <p>
                  3. <b>Describe a car</b> that would fit your life perfectly.
                  What’s your:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                  <li><b>&quot;Nice to haves?&quot;</b></li>
                  <li><b>&quot;Must haves?&quot;</b></li>
                </ul>
                <p className="mt-4">Use a little or a lot of detail.</p>
                <div className="word_text border-2 border-black h-20 rounded-lg overflow-hidden">
                  <textarea
                    placeholder="e.g., I am a 34-year old parent..."
                    className="w-full h-full p-2 rounded-lg outline-none"
                  ></textarea>
                </div>
              </div>
            </li>
          </ul>
          <div className="btn w-[85%] flex gap-[5%] mx-auto justify-center">
            <button
              className="w-[45%] h-[2.3rem] rounded-full bg-white text-[#2d5181] border-2 border-[#2d5181] text-sm"
            >
              Exit quiz
            </button>
            <button
              onClick={() => next()}
              className="w-[45%] h-[2.3rem] rounded-full bg-[#2d5181] text-white text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2 Screen */}
      {isShow === 1 && (
        <div className="two w-[85%] mx-auto">
          <div className="progress_container w-[15%] mx-auto mt-8">
            <div className="progress h-2 border-2 border-[#2d5181]">
              <div
                className="progress-bar h-full bg-[#2d5181]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="title text-center">
            <p className="text-[#2d5181] text-xl">CarQuest Quiz</p>
          </div>
          <p className="text-center mt-4">We need few more details!</p>
          <ul className="w-full">
            <li className="mt-4">
              <span>4. You mentioned a car that’s comfortable, but you didn’t mention the size. Which are you open to?</span>
              <div className="dis flex flex-wrap gap-[5%] justify-center items-center mt-4">
                {dis_one.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedOne(item.id)}
                    className={`dis_box w-[45%] h-[45%] border border-[#2d5181] rounded-lg flex flex-col items-center justify-center cursor-pointer ${selectedOne === item.id ? 'bg-[#c0d6f5]' : ''}`}
                  >
                    <div className="dis_top flex items-center justify-center h-[60%]">
                      <Image src={`/images/${item.src}`} alt="" width={50} height={50}/>
                    </div>
                    <div className="dis_btm text-center text-[#2d5181] font-bold text-sm">
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </li>

            <li className="mt-8">
              <span>5. You mentioned a car that’s <b>comfortable</b>, but you didn’t mention <b>the size</b>. Which are you open to?</span>
              <div className="dis flex flex-wrap gap-[5%] justify-center items-center mt-4">
                {dis_two.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTwo(item.id)}
                    className={`dis_box w-[45%] h-[45%] border border-[#2d5181] rounded-lg flex flex-col items-center justify-center cursor-pointer ${selectedTwo === item.id ? 'bg-[#c0d6f5]' : ''}`}
                  >
                    <div className="dis_top h-[60%] flex justify-center items-center">
                      <Image src={`/images/${item.src}`} alt="" width={50} height={50}/>
                    </div>
                    <div className="dis_btm text-center text-[#2d5181] font-bold text-sm">
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          </ul>
          <div className="btn w-[85%] flex gap-[5%] mx-auto justify-center mt-4">
            <button
              onClick={back}
              className="w-[45%] h-[2.3rem] rounded-full bg-white text-[#2d5181] border-2 border-[#2d5181] text-sm"
            >
              Back
            </button>
            <button
              onClick={next}
              className="w-[45%] h-[2.3rem] rounded-full bg-[#2d5181] text-white text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 Screen */}
      {isShow === 2 && (
        <div className="three w-[88%] mx-auto mt-8">
          <div className="title text-center mt-8">
            <p className="text-[#2d5181] text-xl">Quiz Results</p>
          </div>
          <p className="on text-center mt-4 text-lg">Based on your preferences,</p>
          <p className="on text-center text-lg">these 2 cars are a fit!</p>
          <ul className="cars flex gap-4 mt-4 list-none p-0">
            {items.map((item, index) => (
              <li
                key={item.id}
                onClick={() => changeCover(index)}
                className="car w-40 h-28 relative rounded-md border-4 border-[#2c5181] p-2 cursor-pointer"
              >
                {cover[index] && (
                  <div className="cover absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 rounded-sm"></div>
                )}
                <p className="text_w font-bold m-0 p-0 text-[#395a89]">{item.text}</p>
                <div className="ca w-full h-[60%] mt-2">
                  <Image src={`/images/${item.src}`} alt="" width={100} height={60}/>
                </div>
                <p className="word_w text-[#395a89] m-0 p-0">{item.state}</p>
              </li>
            ))}
            <li className="add w-20 h-28 flex flex-col items-center justify-center cursor-pointer">
              <div className="jia text-3xl text-[#2d5181]">+</div>
              <div className="jiawen text-[#2d5181] text-sm">Add car</div>
            </li>
          </ul>

          <div className="three_box mt-12">
            <p className="on text-center text-lg mb-2">Why these results?</p>
            <ul className="lis list-none w-full flex gap-4 justify-center">
              <li className="h-24 flex flex-col items-center justify-center">
                <div className="lis_top flex items-center justify-center h-3/4">
                  <Image src="/images/Reliability badge.png" alt="" width={40} height={40}/>
                </div>
                <div className="lis_btm flex justify-center">
                  <p className="text-sm">Reliability</p>
                </div>
              </li>
              <li className="h-24 flex flex-col items-center justify-center">
                <div className="lis_top flex items-center justify-center h-3/4">
                  <Image src="/images/Fuel efficiency badge.png" alt="" width={40} height={40}/>
                </div>
                <div className="lis_btm flex justify-center">
                  <p className="text-sm">Fuel efficiency</p>
                </div>
              </li>
              <li className="h-24 flex flex-col items-center justify-center">
                <div className="lis_top flex items-center justify-center h-3/4">
                  <Image src="/images/Comfort badge.png" alt="" width={40} height={40}/>
                </div>
                <div className="lis_btm flex justify-center">
                  <p className="text-sm">Comfort</p>
                </div>
              </li>
              <li className="h-24 flex flex-col items-center justify-center">
                <div className="lis_top flex items-center justify-center h-3/4">
                  <Image src="/images/Safety badge.png" alt="" width={40} height={40}/>
                </div>
                <div className="lis_btm flex justify-center">
                  <p className="text-sm">Safety</p>
                </div>
              </li>
            </ul>
            <p className="text-right text-[#2d5181] text-xs mt-2">View all recommendations</p>
          </div>
          <div className="btn w-[85%] flex gap-[5%] mx-auto justify-center mt-8">
            <button
              onClick={back}
              className="w-[45%] h-[2.3rem] rounded-full bg-white text-[#2d5181] border-2 border-[#2d5181] text-sm"
            >
              Back
            </button>
            <button
              onClick={jump}
              className="w-[45%] h-[2.3rem] rounded-full bg-[#2d5181] text-white text-sm"
            >
              See matches
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
