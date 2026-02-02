"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { Home, FolderKanban, LayoutTemplate, Info } from "lucide-react";


const Header = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Portfolios", path: "/portfolios", icon: FolderKanban },
    { name: "UI-Builder", path: "/ui-builder/blank", icon: LayoutTemplate },
    { name: "About-us", path: "/about", icon: Info },
  ];

  return (
    <>
      <header
        className="fixed top-1 left-2 right-2 rounded-sm 
      bg-neutral-300 text-black z-50 shadow-box"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 ">
            {/* Menu Icon - Left */}
            <button
              onClick={toggleSidebar}
              className="p-2 nav-btn-box rounded-md text-black focus:outline-none transition-colors"
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
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Center Navigation Menu */}
            <nav className="hidden md:flex space-x-6">
              {menuItems.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className="text-black  px-4 py-1 rounded-md text-sm 
                  font-bold nav-btn-box tracking-wide
                  transition-all duration-200 "
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Logo - Right */}
            <div className="px-3 py-2 rounded-sm">
              <span className="flex items-center gap-3">
                <img src="Logo.png" alt="Logo" width={25} />
                <p className="font-extrabold text-lg text-stone-600">
                  Stole Folio
                </p>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16">{/* Your page content goes here */}</div>

      {/* Sidebar Component */}
      <Sidebar
        user={user}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        menuItems={menuItems}
      />
    </>
  );
};

export default Header;
