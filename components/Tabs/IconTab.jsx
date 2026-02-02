"use client";

import React, { useState } from "react";
import { IconColorInput, IconSizeSelector } from "../Controls";
import { CheckCircle, Circle } from "lucide-react";





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
        ? "bg-neutral-700 text-white"
        : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
    }`}
  >
    {hasIcon ? (
      <CheckCircle size={14} className="text-white" />
    ) : (
      <Circle size={14} className="text-neutral-600" />
    )}
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
              : "border-neutral-300"
          }`}
          placeholder="Heart, Star, Home, etc."
          disabled={!hasIcon}
        />
        <p className="text-xs text-neutral-500 mt-1">
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
              className={`p-1 text-xs rounded border overflow-hidden hover:bg-neutral-200 ${
                container.iconName === iconName
                  ? "border-neutral-700 bg-neutral-200"
                  : "border-neutral-300 bg-neutral-100"
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
    </div>
  );
};

export default IconTab;
