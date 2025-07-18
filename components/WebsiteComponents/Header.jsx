'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = ['Home', 'Portfolios', 'UI-Builder', 'About-us'];

  return (
    <>
      <header className="bg-emerald-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              <svg
                className="h-6 w-6"
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

            {/* Center Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace('-', '')}`}
                  className="text-emerald-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-emerald-800"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-emerald-700 px-3 py-2 rounded-lg">
                <span className="text-white font-bold text-lg">LOGO</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} menuItems={menuItems} />
    </>
  );
};

export default Header;