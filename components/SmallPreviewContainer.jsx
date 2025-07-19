"use client";

import React from "react";

// Simple, non-interactive preview component for library display
const SmallPreviewContainer = ({ container, maxWidth = "180px", maxHeight = "100px" }) => {
  if (!container) {
    return (
      <div 
        className="border border-gray-200 rounded bg-gray-50 flex items-center justify-center text-gray-400 text-xs"
        style={{ width: maxWidth, height: maxHeight }}
      >
        No Preview
      </div>
    );
  }

  // Create a simplified wrapper that constrains the preview
  const wrapperStyle = {
    width: maxWidth,
    height: maxHeight,
    overflow: "hidden",
    position: "relative",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={wrapperStyle}>
      <div style={{ 
        transform: "scale(0.6)", 
        transformOrigin: "center center",
        width: "150%", // Compensate for scale
        height: "150%", // Compensate for scale
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <PreviewElement container={container} />
      </div>
    </div>
  );
};

// Recursive component to render container elements without interactions
const PreviewElement = ({ container }) => {
  if (!container) return null;

  // Simplified styles - only the visual essentials
  const elementStyle = {
    // Layout
    display: container.styles.display || "flex",
    flexDirection: container.styles.flexDirection || "row",
    justifyContent: container.styles.justifyContent || "center",
    alignItems: container.styles.alignItems || "center",
    flexWrap: container.styles.flexWrap || "wrap",
    
    // Dimensions
    width: container.styles.width || "auto",
    height: container.styles.height || "auto",
    
    // Spacing
    padding: container.styles.padding || "4px",
    margin: container.styles.margin || "0px",
    
    // Colors
    backgroundColor: container.styles.backgroundColor || "transparent",
    color: container.styles.color || "#000000",
    
    // Border
    borderWidth: container.styles.borderWidth || "0px",
    borderStyle: container.styles.borderStyle || "solid",
    borderColor: container.styles.borderColor || "transparent",
    borderRadius: container.styles.borderRadius || "0px",
    
    // Typography
    fontSize: "10px", // Fixed small size for preview
    fontWeight: container.styles.fontWeight || "400",
    
    // Effects
    boxShadow: container.styles.boxShadow || "none",
    opacity: container.styles.opacity || "1",
    
    // Image support
    ...(container.imageMode === "background" && container.imageUrl && {
      backgroundImage: `url(${container.imageUrl})`,
      backgroundPosition: container.imagePosition || "center",
      backgroundSize: container.imageSize || "cover",
      backgroundRepeat: container.imageRepeat || "no-repeat",
    }),
    
    // Disable all interactions
    pointerEvents: "none",
    userSelect: "none",
    
    // Ensure content doesn't overflow
    overflow: "hidden",
    position: "relative",
  };

  // Handle image element mode
  if (container.imageMode === "img" && container.imageUrl) {
    return (
      <div style={elementStyle}>
        <img
          src={container.imageUrl}
          alt={container.imageAlt || "Preview"}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Handle text content
  const hasChildren = container.children && container.children.some(child => child !== null);
  const showText = container.text && !hasChildren;

  return (
    <div style={elementStyle}>
      {showText && (
        <span style={{ 
          fontSize: "10px", 
          lineHeight: "1.2",
          textAlign: "center",
          wordBreak: "break-word",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}>
          {container.text}
        </span>
      )}
      
      {hasChildren && container.children.map((child, index) =>
        child ? (
          <PreviewElement key={child.container_Id || index} container={child} />
        ) : null
      )}
    </div>
  );
};

export default SmallPreviewContainer;