"use client";
import React from "react";
import { HoverColorInput, HoverShadowSelector } from "../Controls";

const HoverTab = ({ container, handleHoverChange }) => {
  return (
    <div className="space-y-3">
      <HoverColorInput
        label="Hover Background Color"
        property="backgroundColor"
        value={container.hoverStyles.backgroundColor}
        onchange={handleHoverChange}
        defaultColor="#f3f4f6"
      />
      <HoverColorInput
        label="Hover Text Color"
        property="color"
        value={container.hoverStyles?.color}
        onchange={handleHoverChange}
        defaultColor="#000000"
      />
      <HoverColorInput
        label="Hover Border Color"
        property="borderColor"
        value={container.hoverStyles?.borderColor}
        onchange={handleHoverChange}
        defaultColor="#000000"
      />

      {/* Opacity */}
      <div>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Hover Opacity ({container.hoverStyles?.opacity || "100"}%)
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={container.hoverStyles?.opacity || "100"}
          onChange={(e) => handleHoverChange("opacity", e.target.value)}
          className="w-full accent-neutral-700"
        />
      </div>

      {/* Scale */}
      <div>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Hover Scale ({container.hoverStyles?.scale || "100"}%)
        </label>
        <input
          type="range"
          min="50"
          max="150"
          value={container.hoverStyles?.scale || "100"}
          onChange={(e) => handleHoverChange("scale", e.target.value)}
          className="w-full accent-neutral-700"
        />
      </div>

      {/* Box Shadow */}
      <HoverShadowSelector
        value={container.hoverStyles?.boxShadow}
        onChange={(val) => handleHoverChange("boxShadow", val)}
      />
    </div>
  );
};

export default HoverTab;
