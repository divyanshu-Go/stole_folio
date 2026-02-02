"use client";
import React from "react";
import {
  BorderColorInput,
  BorderRadiusSelector,
  BorderStyleInput,
  BorderWidthSelector,
  BoxShadowSelector,
} from "../Controls";

// BorderTab composed of BorderInputs
const BorderTab = ({ container, handleStyleChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Border Width
        </label>
        <BorderWidthSelector
          value={container.styles.borderWidth}
          onChange={handleStyleChange}
        />
      </div>

      <BorderStyleInput
        label="Border Style"
        property="borderStyle"
        value={container.styles.borderStyle}
        options={["none", "solid", "dashed", "dotted"]}
        onChange={handleStyleChange}
      />

      <BorderColorInput
        value={container.styles.borderColor}
        onChange={handleStyleChange}
      />

      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Border Radius
        </label>
        <BorderRadiusSelector
          value={container.styles.borderRadius}
          onChange={(val) => handleStyleChange("borderRadius", val)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Box Shadow
        </label>
        <BoxShadowSelector
          value={container.styles.boxShadow}
          onChange={(val) => handleStyleChange("boxShadow", val)}
        />
      </div>
    </div>
  );
};

export default BorderTab;
