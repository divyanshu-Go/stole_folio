"use client";

import React from "react";

// Renders container in a small, non-interactive preview format
const SmallPreviewContainer = ({ container, scale = 0.8, maxWidth = "200px", maxHeight = "120px" }) => {
  if (!container) return null;

  const containerStyle = {
    ...container.styles,
    transform: `scale(${scale})`,
    transformOrigin: "center center",
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    overflow: "hidden",
    pointerEvents: "none", // Disable all interactions
    fontSize: container.styles.fontSize ? `${parseFloat(container.styles.fontSize) * scale}px` : "12px",
    lineHeight: "1.2",
    minHeight: "fit-content",
    position: "relative",
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg bg-white shadow-sm"
      style={{ 
        width: maxWidth, 
        height: maxHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={containerStyle}>
        {/* Render text if no children or if it's a leaf node */}
        {container.text && !container.children.some((child) => child !== null) && (
          <span style={{ fontSize: containerStyle.fontSize }}>
            {container.text}
          </span>
        )}

        {/* Recursively render children */}
        {container.children.map(
          (child) =>
            child && (
              <SmallPreviewContainer
                key={child.container_Id}
                container={child}
                scale={scale}
                maxWidth="none"
                maxHeight="none"
              />
            )
        )}
      </div>
    </div>
  );
};

export default SmallPreviewContainer;