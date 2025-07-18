"use client";
import React from "react";
import {
  FlexDirectionToggle,
  JustifyContentSelector,
  AlignItemsSelector,
  SizeSelector,
  PaddingSelector,
} from "../Controls"; // adjust import path if needed

const LayoutTab = ({ container, handleStyleChange }) => {
  return (
    <div className="space-y-3">
      {/* Flex Direction */}
      <div>
        <label className="block text-xs font-medium mb-1">Direction</label>
        <FlexDirectionToggle
          value={container.styles.flexDirection}
          onChange={(value) => handleStyleChange("flexDirection", value)}
        />
      </div>

      {/* Justify Content */}
      <div>
        <label className="block text-xs font-medium mb-1">Justify Content</label>
        <JustifyContentSelector
          value={container.styles.justifyContent}
          onChange={(value) => handleStyleChange("justifyContent", value)}
          direction={container.styles.flexDirection}
        />
      </div>

      {/* Align Items */}
      <div>
        <label className="block text-xs font-medium mb-1">Align Items</label>
        <AlignItemsSelector
          value={container.styles.alignItems}
          onChange={(value) => handleStyleChange("alignItems", value)}
          direction={container.styles.flexDirection}
        />
      </div>

      {/* Width / Height */}
      <div className="space-y-2">
        <SizeSelector
          label="Width"
          value={container.styles.width}
          onChange={(val) => handleStyleChange("width", val)}
        />
        <SizeSelector
          label="Height"
          value={container.styles.height}
          onChange={(val) => handleStyleChange("height", val)}
        />
      </div>

      {/* Padding */}
      <div>
        <label className="block text-xs font-medium mb-1">Padding</label>
        <PaddingSelector
          value={container.styles.padding}
          onChange={(value) => handleStyleChange("padding", value)}
        />
      </div>
    </div>
  );
};

export default LayoutTab;
