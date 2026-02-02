"use client";
import React from "react";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-4 gap-1 mb-4 rounded-sm p-3 shadow-box">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-1 text-xs rounded font-medium ${
            activeTab === tab
              ? "bg-neutral-800 text-neutral-50"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          } ${
            tab === "Save to Library" ? "col-span-2" : "col-span-1"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;