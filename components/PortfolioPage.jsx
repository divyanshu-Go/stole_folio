"use client";

import React from "react";
import Container from "./ContainerClass";

// Full-screen portfolio renderer without any builder UI
const PortfolioPage = ({ containerData }) => {
  // Convert plain object back to Container instance if it exists
  const container = containerData ? Container.fromJSON(containerData) : null;

  if (!container) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">The requested portfolio could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PortfolioContainer container={container} />
    </div>
  );
};

// Recursive container renderer for portfolio display
const PortfolioContainer = ({ container }) => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    const hoverStyles = container.hoverStyles || {};

    // Apply hover styles if they exist
    if (hoverStyles.backgroundColor && hoverStyles.backgroundColor !== "transparent") {
      target.style.backgroundColor = hoverStyles.backgroundColor;
    }

    if (hoverStyles.color && hoverStyles.color !== "transparent") {
      target.style.color = hoverStyles.color;
    }

    if (hoverStyles.borderColor && hoverStyles.borderColor !== "transparent") {
      target.style.borderColor = hoverStyles.borderColor;
    }

    if (hoverStyles.opacity) {
      target.style.opacity = hoverStyles.opacity / 100;
    }

    if (hoverStyles.scale) {
      target.style.transform = `scale(${hoverStyles.scale / 100})`;
    }

    if (hoverStyles.boxShadow) {
      target.style.boxShadow = hoverStyles.boxShadow;
    }
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;

    // Reset to original styles
    target.style.backgroundColor = container.styles.backgroundColor;
    target.style.color = container.styles.color;
    target.style.borderColor = container.styles.borderColor;
    target.style.opacity = "1";
    target.style.transform = "scale(1)";
    target.style.boxShadow = container.styles.boxShadow || "none";
  };

  // Full-screen container styles (no selection outline or cursor pointer)
  const containerStyle = {
    ...container.styles,
    position: "relative",
    minHeight: container.styles.minHeight || "fit-content",
    maxWidth: "100%",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render text if no children or if it's a leaf node */}
      {container.text && !container.children.some((child) => child !== null) && (
        <span style={{ fontSize: container.styles.fontSize }}>
          {container.text}
        </span>
      )}

      {/* Recursively render children */}
      {container.children.map(
        (child) =>
          child && (
            <PortfolioContainer
              key={child.container_Id}
              container={child}
            />
          )
      )}
    </div>
  );
};

export default PortfolioPage;