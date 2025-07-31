'use client';
import { useEffect } from 'react';
import Link from 'next/link';

const Sidebar = ({ isOpen, onClose, menuItems }) => {

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('.sidebar')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar fixed top-0.5 left-0 bottom-0.5 rounded-sm w-56 bg-emerald-800 text-white transform ${
          isOpen ? 'translate-x-0.5' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-700 rounded-sm">
          <h2 className="px- text-xl font-semibold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-sm text-emerald-200 hover:text-white hover:bg-emerald-700 focus:outline-none transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className="block px-4 py-3 text-sm font-medium text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors border-l-4 border-transparent hover:border-emerald-400 rounded-sm"
              onClick={onClose}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
