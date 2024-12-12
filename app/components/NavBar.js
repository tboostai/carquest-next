// components/NavBar.js
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function toggleSearch() {
    setIsShow(!isShow);
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="w-screen h-14 flex bg-[#c0d6f5]">
      {/* Left Section */}
      <div className="flex-1 flex items-center pl-2">
        <Link href="/">
          <div className="flex items-center">
            <div className="w-12 h-12">
              <Image src="/images/Logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="ml-2">
              <p className="leading-[3rem] text-[#2d5181] font-bold">CarQuest</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex-2 flex justify-end items-center pr-4">
        <ul className="flex list-none">
          <li>
            {isShow ? (
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onBlur={toggleSearch}
                className="pt-4"
                placeholder="请输入内容"
              />
            ) : (
              <img src="/images/search.png" alt="Search" className="pt-6 cursor-pointer" onClick={toggleSearch} />
            )}
          </li>
          <li className="relative ml-4">
            <button className="btn" type="button" onClick={toggleMenu} style={{ paddingTop: "1.3rem" }}>
              <img src="/images/menu.png" alt="Menu" />
            </button>
            {showMenu && (
              <ul className="absolute right-0 bg-white shadow-md z-10 w-40">
                <li>
                  <a className="block px-4 py-2" href="#">
                    Quiz
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2" href="#">
                    Search
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2" href="#">
                    Compare Favorites
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2" href="#">
                    About CarQuest
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2" href="#">
                    How It Works
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2" href="#">
                    Support & Contact
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 border-t font-semibold" href="#">
                    My Profile
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
