"use client";

import React from "react";

const Loader = ({ text = "Loading preview..." }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100">
      {/* Spinning Circle */}
      <div className="w-10 h-10 border-4 border-neutral-300 border-t-neutral-800 rounded-full animate-spin mb-3 shadow-sm"></div>
      
      {/* Loading Text */}
      <p className="text-sm text-neutral-700 font-medium">{text}</p>
    </div>
  );
};

export default Loader;
