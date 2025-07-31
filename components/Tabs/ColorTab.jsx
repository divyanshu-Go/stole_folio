"use client";
import React from "react";

const ColorInput = ({ label, property, value, onChange }) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onChange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded ${
          value === "transparent"
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || "#000000" : "#000000"}
        onChange={(e) => onChange(property, e.target.value)}
        className="flex-1 p-0 border rounded h-8"
      />
    </div>
  </div>
);

const ColorTab = ({ container, handleStyleChange }) => {
  return (
    <div className="space-y-3">
      <ColorInput
        label="Background Color"
        property="backgroundColor"
        value={container.styles.backgroundColor}
        onChange={handleStyleChange}
      />

      <ColorInput
        label="Text Color"
        property="color"
        value={container.styles.color}
        onChange={handleStyleChange}
      />

      <ColorInput
        label="Border Color"
        property="borderColor"
        value={container.styles.borderColor}
        onChange={handleStyleChange}
      />
    </div>
  );
};

export default ColorTab;
