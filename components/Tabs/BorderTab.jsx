"use client";
import React from "react";
import { BorderRadiusSelector, BoxShadowSelector } from "../Controls";

const BorderTab = ({ container, handleStyleChange }) => {
  const borderWidths = ["0px", "1px", "2px", "4px", "6px"];
  const borderStyles = ["none", "solid", "dashed", "dotted"];

  return (
    <div className="space-y-3">
      {/* Border Width */}
      <div>
        <label className="block text-xs font-medium mb-1">Border Width</label>
        <div className="flex gap-1">
          {borderWidths.map((width) => (
            <button
              key={width}
              onClick={() => handleStyleChange("borderWidth", width)}
              className={`px-2 py-1 text-xs rounded ${
                container.styles.borderWidth === width
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {width}
            </button>
          ))}
        </div>
      </div>

      {/* Border Style */}
      <div>
        <label className="block text-xs font-medium mb-1">Border Style</label>
        <div className="flex gap-1">
          {borderStyles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange("borderStyle", style)}
              className={`px-2 py-1 text-xs rounded ${
                container.styles.borderStyle === style
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Border Color */}
      <div>
        <label className="block text-xs font-medium mb-1">Border Color</label>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleStyleChange("borderColor", "transparent")}
            className={`px-2 py-1 text-xs rounded ${
              container.styles.borderColor === "transparent"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Transparent
          </button>
          <input
            type="color"
            value={
              container.styles.borderColor !== "transparent"
                ? container.styles.borderColor || "#000000"
                : "#000000"
            }
            onChange={(e) =>
              handleStyleChange("borderColor", e.target.value)
            }
            className="flex-1 p-0 border rounded h-8"
          />
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-xs font-medium mb-1">Border Radius</label>
        <BorderRadiusSelector
          value={container.styles.borderRadius}
          onChange={(value) => handleStyleChange("borderRadius", value)}
        />
      </div>

      {/* Box Shadow */}
      <div>
        <label className="block text-xs font-medium mb-1">Box Shadow</label>
        <BoxShadowSelector
          value={container.styles.boxShadow}
          onChange={(value) => handleStyleChange("boxShadow", value)}
        />
      </div>
    </div>
  );
};

export default BorderTab;
