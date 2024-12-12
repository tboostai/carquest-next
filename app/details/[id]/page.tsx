"use client";

import Image from "next/image";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default function DetailsPage() {
  const params = useParams();
  const { id } = params; // use this id if needed
  const router = useRouter();

  console.log('id:', id);

  // Example state from Vue code
  const [aixin, setAixin] = useState(true);
  const [main, setMain] = useState({ src: 'cars_0.png', count: 0 });

  const lis = [
    { id:0,src:'cars_0.png' },
    { id:1,src:'cars_1.png' },
    { id:2,src:'cars_4.png' },
    { id:3,src:'cars_3.png' },
    { id:4,src:'cars_2.png' },
  ];

  const icons = [
    { id:0,src:'icon_0.png',word:'Fuel Type',text:'Hybrid' },
    { id:1,src:'icon_1.png',word:'Mileage',text:'Hybrid' },
    { id:2,src:'icon_2.png',word:'MPG',text:'58 MPG' },
    { id:3,src:'icon_3.png',word:'Transmission',text:'Automatic' },
    { id:4,src:'icon_4.png',word:'Exterior Color',text:'Navy' },
    { id:5,src:'icon_5.png',word:'Interior',text:'Leather' },
    { id:6,src:'icon_6.png',word:'Drivetrain',text:'Font Wheel Drive' },
    { id:7,src:'icon_7.png',word:'Engine',text:'4-Cyl, 2.0L' },
  ];

  const cars = [
    { id:0, name: '2023 Toyota Camry Hybrid',estimated: 'SE 45K miles', price: '$19,800', miles: '45K miles $409/mo', cash: '$0 cash down', milesAway: '10 miles away', src: '2023_toyota_camry-hybrid_sedan_se-nightshade_s_oem_1_1600x1067 1.png' },
    { id:1, name: '2023 Toyota Camry Hybrid',estimated: 'SE 45K miles', price: '$19,800', miles: '45K miles $409/mo', cash: '$0 cash down', milesAway: '11 miles away', src: 'Screenshot 2024-10-04 at 4.01.16 PM 1.png' },
    { id:2, name: '2021 Toyota Camry Hybrid',estimated: 'SE 90K miles', price: '$16,808', miles: '45K miles $409/mo', cash: '$0 cash down', milesAway: '19 miles away', src: 'Image 17 1.png' },
    { id:3, name: '2023 Toyota Camry Hybrid',estimated: 'SE 40K miles', price: '$19,500', miles: '45K miles $409/mo', cash: '$0 cash down', milesAway: '21 miles away', src: 'Image 18 1.png' },
  ];

  function changeAixin(){
    setAixin(!aixin);
  }

  function changeSrc(src:string){
    setMain(prev => ({...prev, src}));
  }

  function jump(){
    router.push('/favorites');
  }

  function changeLi(i:number){
    // If needed, handle state highlight logic here
    console.log('change function, li:', i);
  }

  function changeSlider(flag:number){
    setMain(prev=>{
      let count = prev.count;
      if(flag===0 && count>0){
        count--;
      } else if (flag===1 && count<lis.length-1){
        count++;
      }
      return {...prev, count, src: lis[count].src};
    });
  }

  return (
    <div className="details min-h-screen flex flex-col">
      <NavBar />

      <div className="container mx-auto w-full md:w-1/2 p-4">
        {/* Title */}
        <div className="w-full mt-3 flex items-center">
          <p className="text-xl font-bold flex-1 truncate">2023 Toyota Camry Hybrid</p>
          <p className="text-xl font-bold flex-none">$19,800</p>
        </div>

        {/* Info */}
        <div className="w-full mt-3 flex items-center h-12">
          <div className="flex-1 h-full">
            <p className="m-0 text-gray-500 text-sm">SE . 45K miles</p>
            <p className="m-0 text-gray-500 text-sm">Los Angeles,CA(10 miles away)</p>
          </div>
          <ul className="flex items-center h-full list-none m-0 p-0">
            <li className="mx-1 flex flex-col justify-center items-center cursor-pointer">
              <div className="flex justify-center items-center h-1/2">
                <Image 
                  src={`/images/${aixin ? 'Vector.png' : 'aixin.png'}`} 
                  alt="favorite" 
                  width={21} 
                  height={19}
                  onClick={changeAixin} 
                />
              </div>
              <p className="text-[0.7rem] h-1/2 flex items-center">Favorite</p>
            </li>
            <li className="mx-1 flex flex-col justify-center items-center cursor-pointer">
              <div className="flex justify-center items-center h-1/2 text-2xl font-bold">+</div>
              <p className="text-[0.7rem] h-1/2 flex items-center">Compare</p>
            </li>
          </ul>
        </div>

        {/* Slider Section */}
        <div className="mt-3" style={{height:'18rem'}}>
          <div className="w-full flex items-center h-[70%]">
            <div className="flex-1 flex items-center justify-center text-2xl font-bold cursor-pointer" onClick={()=>changeSlider(0)}> &lt; </div>
            <div className="flex-8 flex items-center justify-center h-full">
              <div className="w-full h-full flex justify-center items-center cursor-pointer" onClick={jump}>
                <Image 
                  src={`/images/${main.src}`} 
                  alt="car image" 
                  width={300} 
                  height={200} 
                  className="rounded object-contain" 
                />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-2xl font-bold cursor-pointer" onClick={()=>changeSlider(1)}>&gt;</div>
          </div>

          <div className="w-full mt-2 h-[30%] relative">
            <ul className="absolute flex gap-2 list-none p-0 m-0" style={{width:'130%'}}>
              {lis.map(item=>(
                <li key={item.id} className="w-20 h-20 flex items-center justify-center cursor-pointer" onClick={()=>changeSrc(item.src)}>
                  <Image 
                    src={`/images/${item.src}`} 
                    alt="thumbnail"
                    width={60} 
                    height={60}
                    className="object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vehicle Highlights */}
        <div className="icons_lis mt-4 text-xl font-semibold">
          <p>Vehicle Highlights</p>
          <ul className="flex justify-between items-center mx-auto mt-4" style={{width:'80%', height:'3rem'}}>
            <li className="flex-1 h-full flex items-center justify-center">
              <Image src="/images/Reliability badge.png" alt="" width={40} height={40}/>
            </li>
            <li className="flex-1 h-full flex items-center justify-center">
              <Image src="/images/Fuel efficiency badge.png" alt="" width={40} height={40}/>
            </li>
            <li className="flex-1 h-full flex items-center justify-center">
              <Image src="/images/Comfort badge.png" alt="" width={40} height={40}/>
            </li>
            <li className="flex-1 h-full flex items-center justify-center">
              <Image src="/images/Safety badge.png" alt="" width={40} height={40}/>
            </li>
          </ul>
        </div>

        {/* Overview and Features */}
        <div className="icons_words mt-5 mb-3">
          <p className="text-xl font-semibold">Overview and Features</p>
          <ul className="flex flex-wrap justify-between list-none p-0 mt-4">
            {icons.map(item=>(
              <li key={item.id} className="flex items-center mb-3 w-1/2 md:w-1/4 h-[2.3rem]">
                <div className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                  <Image src={`/images/${item.src}`} alt="" width={20} height={20}/>
                </div>
                <div className="ml-2 text-sm">
                  <p className="font-bold m-0 p-0" style={{fontSize:'0.9rem'}}>{item.word}</p>
                  <p className="m-0 p-0 text-gray-500" style={{fontSize:'0.7rem'}}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* History */}
        <div className="word mb-5">
          <p className="text-xl font-semibold">History</p>
          <div className="word_box w-full pl-4 mt-3">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16}/>
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">Clean Title</p>
                  <p className="m-0 p-0 text-sm">No Issues Reported</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16}/>
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">0 Accidents</p>
                  <p className="m-0 p-0 text-sm">No Accidents or Damage Reported</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-3 px-2 flex gap-2">
                <div className="mt-1">
                  <Image src="/images/Checkmark Outline.png" alt="" width={16} height={16}/>
                </div>
                <div>
                  <p className="m-0 p-0 text-sm">1 Previous Owner</p>
                  <p className="m-0 p-0 text-sm">Vehicle has One Previous Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="from mb-5">
          <div className="from_box w-full h-36 flex">
            <div className="from_box_left bg-[#2d5181] flex-1.2 p-2 text-white">
              <p className="text-lg font-bold m-0">Seller Information</p>
              <div className="h-[70%] mt-2">
                <Image src="/images/from.png" alt="" width={200} height={80} className="object-contain"/>
              </div>
            </div>
            <div className="from_box_right flex-1 relative flex items-end justify-center">
              <Image src="/images/shot.png" alt="" width={300} height={144} className="object-cover"/>
              <button className="absolute bottom-2 bg-white border-none px-8 py-2 rounded-full">Contact</button>
            </div>
          </div>
        </div>

        {/* Build Your Offer */}
        <div className="cards mt-5">
          <div className="card border p-5 text-center">
            <p className="text-xl font-semibold">Build Your Offer</p>
            <ul className="change flex border rounded-full mx-auto mt-4 w-52 h-10 list-none">
              <li onClick={()=>changeLi(0)} className="flex-1 flex items-center justify-center text-sm cursor-pointer">Lease/finance</li>
              <li onClick={()=>changeLi(1)} className="flex-1 flex items-center justify-center text-sm cursor-pointer">Buy cash</li>
            </ul>
            <div className="pl-4 text-left mt-5">
              <p className="mt-5 text-sm">Listing price</p>
              <p className="text-sm">Down payment</p>
              <input type="text" className="w-[90%] border p-1 rounded" />
              <p className="mt-4 text-sm">Estimated trade-in value</p>
              <input type="text" className="w-[90%] border p-1 rounded" />
              <p className="mt-4 text-sm">Term</p>
              <input type="text" className="w-[90%] border p-1 rounded" />
              <div className="flex justify-between mt-4 w-[90%] text-sm">
                <p>Taxes & Fees</p>
                <p className="underline cursor-pointer">Calculate</p>
              </div>
              <div className="flex justify-center mt-4 w-[90%] gap-4">
                <button className="px-4 py-1 border border-black rounded-full text-sm">Calculate</button>
                <button className="px-4 py-1 border border-black rounded-full text-sm">Send offer</button>
              </div>
            </div>
          </div>
        </div>

        {/* Peace of Mind Section */}
        <div className="icon_s mt-5 text-center">
          <p className="text-lg font-semibold">Have Peace of Mind When You Buy</p>
          <ul className="items flex flex-wrap gap-10 mt-4 justify-center list-none p-0">
            <li className="bg-[#f5f5f5] shadow rounded p-2 flex w-40 h-24">
              <div className="imgI flex-4 flex items-center justify-center">
                <Image src="/images/noun_0.png" alt="" width={40} height={40}/>
              </div>
              <div className="txt flex-6 pl-2 text-sm">
                <p className="m-0 font-bold">Factory</p>
                <p className="m-0 font-bold">Warranty</p>
                <p className="m-0 text-xs underline">See details</p>
              </div>
            </li>
            <li className="bg-[#f5f5f5] shadow rounded p-2 flex w-40 h-24">
              <div className="imgI flex-4 flex items-center justify-center">
                <Image src="/images/noun_1.png" alt="" width={40} height={40}/>
              </div>
              <div className="txt flex-6 pl-2 text-sm">
                <p className="m-0 font-bold">Optional</p>
                <p className="m-0 font-bold">add-on</p>
                <p className="m-0 font-bold">protections</p>
                <p className="m-0 text-xs underline">Explore</p>
              </div>
            </li>
            <li className="bg-[#f5f5f5] shadow rounded p-2 flex w-40 h-24">
              <div className="imgI flex-4 flex items-center justify-center">
                <Image src="/images/noun_2.png" alt="" width={40} height={40}/>
              </div>
              <div className="txt flex-6 pl-2 text-sm">
                <p className="m-0 font-bold">Free Carfax</p>
                <p className="m-0 font-bold">ReportView</p>
                <p className="m-0 text-xs underline">View</p>
              </div>
            </li>
            <li className="bg-[#f5f5f5] shadow rounded p-2 flex w-40 h-24">
              <div className="imgI flex-4 flex items-center justify-center">
                <Image src="/images/noun_3.png" alt="" width={40} height={40}/>
              </div>
              <div className="txt flex-6 pl-2 text-sm">
                <p className="m-0 font-bold">No Safety</p>
                <p className="m-0 font-bold">Recalls</p>
                <p className="m-0 text-xs underline">Explore</p>
              </div>
            </li>
          </ul>
        </div>

        {/* You Might Also Like */}
        <div className="car_lis_box mt-5">
          <p className="text-xl font-semibold">You Might Also Like</p>
          <ul className="flex flex-wrap list-none p-0 mt-4 gap-4">
            {cars.map(item=>(
              <li key={item.id} className="w-[48%] bg-white shadow border-4 border-black flex flex-col">
                <Image src={`/images/${item.src}`} alt="" width={200} height={120} className="object-contain mx-auto mt-2"/>
                <div className="btm flex w-full p-3 border-t-2 border-black h-32 text-xs">
                  <div className="left w-1/2">
                    <b className="block text-[0.6rem]">{item.name}</b>
                    <p className="m-0 p-0 text-[0.6rem]">{item.estimated}</p>
                    <p className="m-0 p-0 text-[0.6rem]">{item.price}</p>
                  </div>
                  <div className="right w-1/2 text-right">
                    <p className="m-0 p-0 text-[0.6rem]">{item.miles}</p>
                    <p className="m-0 p-0 text-[0.6rem]">{item.cash}</p>
                    <p className="m-0 p-0 text-[0.6rem]">{item.milesAway}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
