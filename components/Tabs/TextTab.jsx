"use client";
import React from "react";
import {
  FontSizeSelector,
  FontWeightSelector,
  TextAlignSelector,
} from "../Controls"; // adjust path if needed

const TextTab = ({ container, handleStyleChange, handleTextChange, handleSectionIdChange }) => {
  return (
    <div className="space-y-3">
      {/* Text Content */}
      <div>
        <label className="block text-xs font-medium mb-1">Text Content</label>
        <input
          type="text"
          value={container.text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full p-1 border rounded text-xs"
          placeholder="Enter text..."
        />
      </div>

      {/* Section ID - NEW */}
      <div>
        <label className="block text-xs font-medium mb-1">Section ID</label>
        <input
          type="text"
          value={container.sectionId || ""}
          onChange={(e) => handleSectionIdChange(e.target.value)}
          className="w-full p-1 border rounded text-xs"
          placeholder="e.g., about, contact, hero..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Use this ID to scroll to this section (e.g., link to "#about")
        </p>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-xs font-medium mb-1">Text Align</label>
        <TextAlignSelector
          value={container.styles.textAlign}
          onChange={(value) => handleStyleChange("textAlign", value)}
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-xs font-medium mb-1">Font Size</label>
        <FontSizeSelector
          value={container.styles.fontSize}
          onChange={(value) => handleStyleChange("fontSize", value)}
        />
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-xs font-medium mb-1">Text Color</label>
        <input
          type="color"
          value={container.styles.color}
          onChange={(e) => handleStyleChange("color", e.target.value)}
          className="w-full p-0 border rounded h-6"
        />
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-xs font-medium mb-1">Font Weight</label>
        <FontWeightSelector
          value={container.styles.fontWeight}
          onChange={(value) => handleStyleChange("fontWeight", value)}
        />
      </div>
    </div>
  );
};

export default TextTab;
