"use client";
import { useEffect } from "react";
import Link from "next/link";
import ProfileSection from "./ProfileSection";

const Sidebar = ({ user, isOpen, onClose, menuItems }) => {
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar fixed top-1 -left-1 bottom-3 rounded-sm w-60
          bg-neutral-300 text-black 
          transform ${isOpen ? "translate-x-3" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out z-50
          shadow-box border border-black flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-[9px] border-b border-black">
          <h2 className="text-base font-bold uppercase tracking-wide">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 nav-btn-box rounded-md text-black transition"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-3 space-y-1 px-2">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 text-sm font-bold
                 nav-btn-box rounded-sm tracking-wide"
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-black mt-auto">
          <ProfileSection user={user} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
