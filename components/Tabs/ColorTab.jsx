"use client";
import React from "react";
import { ColorInput } from "../Controls";



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




