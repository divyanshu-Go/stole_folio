'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Link from 'next/link';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Define menu items with correct label and path
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolios', path: '/portfolios' },
    { name: 'UI-Builder', path: '/ui-builder' },
    { name: 'About-us', path: '/about' },
  ];

  return (
    <>
      <header className="fixed top-0.5 left-0.5 right-0.5 rounded-sm bg-emerald-900 text-white shadow-lg z-30">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Menu Icon - Left */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-sm text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Center Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className="text-emerald-200 hover:text-white px-3 py-2 rounded-sm text-sm font-medium transition-colors hover:bg-emerald-800"
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Logo - Right */}
            <div className="bg-emerald-700 px-3 py-2 rounded-sm">
              <span className="text-white font-bold text-lg">LOGO</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16">
        {/* Your page content goes here */}
      </div>

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        menuItems={menuItems} 
      />
    </>
  );
};

export default Header;
