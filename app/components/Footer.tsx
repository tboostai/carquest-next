import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { label: "Take the Quiz", href: "/quiz" },
    { label: "Search Cars", href: "/car" },
    { label: "Compare", href: "/favorites" },
    { label: "How It Works", href: "/how-it-works" }
  ];

  const aboutLinks = [
    { label: "About Us", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin.png", href: "https://linkedin.com" },
    { name: "Twitter", icon: "Twitter.png", href: "https://twitter.com" },
    { name: "Facebook", icon: "Facebook.png", href: "https://facebook.com" },
    { name: "Instagram", icon: "Instagram.png", href: "https://instagram.com" }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          {/* Update all text colors with dark mode variants */}
          <p>© 2024 CarQuest. All rights reserved.</p>
          {/* Add dark mode classes to any other footer content */}
        </div>
      </div>
    </footer>
  );
}