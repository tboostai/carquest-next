"use client";

import { useState } from 'react';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

export default function FavoritesPage() {
  const [lis, setLis] = useState([
    { id: 0, title: 'Entertainment', showCover: false },
    { id: 1, title: 'Performance', showCover: false },
    { id: 2, title: 'Engine', showCover: false },
    { id: 3, title: 'Tires & Wheels', showCover: false },
    { id: 4, title: 'Weight & Capacity', showCover: false },
    { id: 5, title: 'Safety', showCover: false },
    { id: 6, title: 'Suspension', showCover: false },
    { id: 7, title: 'Brakes', showCover: false },
    { id: 8, title: 'Dimensions', showCover: false },
  ]);

  function toggleCover(id:number) {
    setLis(prev=> prev.map(item=>{
      if(item.id===id){
        return {...item, showCover:!item.showCover};
      }
      return item;
    }));
  }

  return (
    <div className="favorites">
      <NavBar/>
      <div className="container mx-auto">
        <p className="title text-xl mt-4">Compare Your Favorites</p>
        <table className="table border-collapse border w-full mt-4">
          <tbody>
            <tr>
              <td className="border text-center align-bottom p-2">Price</td>
              <td className="border text-center p-2">
                <div className="flex justify-center">
                  <Image src="/images/group_1.png" alt="" width={100} height={60}/>
                </div>
                <div><p className="m-0">Toyota Camry Hybrid 2023</p></div>
                <div><p className="m-0 text-xs underline cursor-pointer">Change</p></div>
                <div className="align-bottom"><p>$18,886</p></div>
              </td>
              <td className="border text-center p-2">
                <div className="flex justify-center">
                  <Image src="/images/group_2.png" alt="" width={100} height={60}/>
                </div>
                <div><p className="m-0">Honda Accord Hybrid 2023</p></div>
                <div><p className="m-0 text-xs underline cursor-pointer">Change</p></div>
                <div className="align-bottom"><p>$18,886</p></div>
              </td>
            </tr>
          </tbody>
        </table>

        <ul className="xiala list-none m-0 p-0">
          {lis.map(item=>(
            <li key={item.id} className="mt-4">
              <div
                className="flex items-center border-b border-gray-400 pb-2 cursor-pointer"
                onClick={()=>toggleCover(item.id)}
              >
                <Image src="/images/xia.png" alt="" width={20} height={20} className="mr-2"/>
                <p className="m-0">{item.title}</p>
              </div>
              {item.showCover && (
                <div className="cover h-60 bg-blue-500 mt-2"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
}
