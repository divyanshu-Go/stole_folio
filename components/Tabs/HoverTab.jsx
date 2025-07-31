"use client";
import React from "react";


const ColorInput = ({ label, property, value, onchange, defaultColor }) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onchange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded ${value === "transparent"
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Transparent
      </button>
      <input
        type="color"
        value={value !== "transparent" ? value || defaultColor : defaultColor}
        onChange={(e) => onchange(property, e.target.value)}
        className="flex-1 p-0 border rounded h-8"
      />
    </div>
  </div>
);

const HoverTab = ({ container, handleHoverChange }) => {


  return (
    <div className="space-y-3">
      <ColorInput
        label="Hover Background Color"
        property="backgroundColor"
        value={container.hoverStyles.backgroundColor}
        onchange={handleHoverChange}
        defaultColor="#f3f4f6"
      />
      <ColorInput
        label="Hover Text Color"
        property="color"
        value={container.hoverStyles?.color}
        onchange={handleHoverChange}
        defaultColor="#000000"
      />
      <ColorInput
        label="Hover Border Color"
        property="borderColor"
        value={container.hoverStyles?.borderColor}
        onchange={handleHoverChange}
        defaultColor="#000000"
      />


      {/* Opacity */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Hover Opacity ({container.hoverStyles?.opacity || "100"}%)
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={container.hoverStyles?.opacity || "100"}
          onChange={(e) =>
            handleHoverChange("opacity", e.target.value)
          }
          className="w-full accent-emerald-500"
        />
      </div>

      {/* Scale */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Hover Scale ({container.hoverStyles?.scale || "100"}%)
        </label>
        <input
          type="range"
          min="50"
          max="150"
          value={container.hoverStyles?.scale || "100"}
          onChange={(e) =>
            handleHoverChange("scale", e.target.value)
          }
          className="w-full accent-emerald-500"
        />
      </div>

      {/* Box Shadow */}
      <div>
        <label className="block text-xs font-medium mb-1">Hover Shadow</label>
        <div className="flex gap-1">
          {[
            { value: "none", label: "none" },
            { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", label: "small" },
            { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", label: "medium" },
            { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", label: "large" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleHoverChange("boxShadow", option.value)}
              className={`px-2 py-1 text-xs rounded ${container.hoverStyles?.boxShadow === option.value
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoverTab;
