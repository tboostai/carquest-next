// components/NavBar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Quiz", href: "/quiz" },
    { label: "Search", href: "/car" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {/* Avatar Circle */}
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Hamburger Icon */}
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );

  return (
    <div>
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/Logo.png" alt="CarQuest" width={32} height={32} />
              <span className="text-xl font-semibold text-[#2d5181] dark:text-[#4b7ac7]">CarQuest</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className="text-gray-600 dark:text-gray-300 hover:text-[#2d5181] dark:hover:text-[#4b7ac7] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-[#2d5181] transition-colors"
              >
                Profile
              </Link>
              
              {/* Menu Button - Desktop */}
              <MenuButton />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MenuButton />
            </div>
          </div>
        </div>

        {/* Mobile & Desktop Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg z-50"
              >
                {/* Menu Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                  {/* Theme Toggle */}
                  {mounted && (
                    <div className="mb-4 px-4 flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Theme</span>
                      <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                      >
                        {theme === 'dark' ? '🌞' : '🌙'}
                      </button>
                    </div>
                  )}
                  
                  <Link 
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-4 py-2 text-sm text-[#2d5181] dark:text-[#4b7ac7] border-2 border-[#2d5181] dark:border-[#4b7ac7] rounded-full hover:bg-[#2d5181] dark:hover:bg-[#4b7ac7] hover:text-white transition-colors block text-center"
                  >
                    My Profile
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </div>
  );
}
