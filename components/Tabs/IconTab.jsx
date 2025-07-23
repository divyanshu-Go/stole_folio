"use client";

import React, { useState } from "react";

// Icon Size Selector component
const IconSizeSelector = ({ value, onChange }) => {
  const options = [
    { value: "12", label: "XS" },
    { value: "16", label: "SM" },
    { value: "20", label: "MD" },
    { value: "24", label: "LG" },
    { value: "32", label: "XL" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Icon Color Input component
const IconColorInput = ({ label, property, value, onChange }) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onChange(property, "transparent")}
        className={`px-2 py-1 text-xs rounded ${
          value === "transparent"
            ? "bg-blue-500 text-white"
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

// Common Lucide icons for quick selection
const commonIcons = [
  "Heart",
  "Star",
  "Home",
  "User",
  "Settings",
  "Search",
  "Plus",
  "Minus",
  "Check",
  "X",
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Mail",
  "Phone",
  "Camera",
  "Image",
  "Download",
  "Upload",
  "Edit",
  "Trash2",
];

const IconTab = ({ container, handleIconChange }) => {
  const validateIconName = (iconName) => {
    if (!iconName) return true; // Empty is valid
    try {
      const LucideIcon = require("lucide-react")[iconName];
      return !!LucideIcon;
    } catch {
      return false;
    }
  };

  const isValidIconName = validateIconName(container.iconName);
  const hasIcon = container.hasIcon === true || container.hasIcon === "true";

  const handleQuickSelect = (iconName) => {
    handleIconChange("iconName", iconName);
    if (!hasIcon) {
      handleIconChange("hasIcon", true);
    }
  };

  return (
    <div className="space-y-3">
      {/* Icon Toggle */}
      <div>
        <label className="block text-xs font-medium mb-1">Show Icon</label>
        <button
          onClick={() => handleIconChange("hasIcon", !hasIcon)}
          className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
            hasIcon
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span>{hasIcon ? "✓" : "○"}</span>
          {hasIcon ? "Icon Enabled" : "Icon Disabled"}
        </button>
      </div>

      {/* Icon Name Input */}
      <div className={hasIcon ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">
          Lucide Icon Name
          {!isValidIconName && container.iconName && (
            <span className="text-red-500 ml-1">• Invalid Icon</span>
          )}
        </label>
        <input
          type="text"
          value={container.iconName}
          onChange={(e) => handleIconChange("iconName", e.target.value)}
          className={`w-full p-1 border rounded text-xs ${
            !isValidIconName && container.iconName
              ? "border-red-300 bg-red-50"
              : "border-gray-300"
          }`}
          placeholder="Heart, Star, Home, etc."
          disabled={!hasIcon}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter exact Lucide React icon name
        </p>
      </div>

      {/* Quick Icon Selection */}
      <div className={hasIcon ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Quick Select</label>
        <div className="grid grid-cols-4 gap-1">
          {commonIcons.map((iconName) => (
            <button
              key={iconName}
              onClick={() => handleQuickSelect(iconName)}
              className={`p-1 text-xs rounded border hover:bg-gray-100 ${
                container.iconName === iconName
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
              disabled={!hasIcon}
              title={iconName}
            >
              {iconName}
            </button>
          ))}
        </div>
      </div>

      {/* Icon Size */}
      <div className={hasIcon ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Icon Size</label>
        <IconSizeSelector
          value={container.iconSize}
          onChange={(value) => handleIconChange("iconSize", value)}
        />
      </div>

      {/* Icon Color */}
      <div className={hasIcon ? "" : "opacity-50 pointer-events-none"}>
        <IconColorInput
          label="Icon Color"
          property="iconColor"
          value={container.iconColor}
          onChange={handleIconChange}
        />
      </div>

      {/* Icon Status Indicator */}
      {hasIcon && (
        <div className="text-xs p-2 rounded bg-purple-50 border border-purple-200">
          <div className="flex items-center gap-1">
            <span className="text-purple-600">🎯</span>
            <span className="font-medium text-purple-800">Icon Status:</span>
          </div>
          <div className="mt-1 text-purple-700">
            <div>Name: {container.iconName || "None"}</div>
            {container.iconName ? (
              <div className="mt-1">
                {isValidIconName
                  ? "✓ Icon will display"
                  : "⚠ Invalid icon name"}
              </div>
            ) : (
              <div className="mt-1">Enter an icon name to display</div>
            )}
            <div className="mt-1">Size: {container.iconSize}px</div>
            <div>Color: {container.iconColor}</div>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!hasIcon && (
        <div className="text-xs p-2 rounded bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">💡</span>
            <span className="font-medium text-gray-800">Icon Feature:</span>
          </div>
          <div className="mt-1 text-gray-700">
            <div>• Icons replace text when enabled</div>
            <div>• Uses Lucide React icon library</div>
            <div>• Fallback icon shows for invalid names</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconTab;
