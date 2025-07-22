// Updated PreviewContainer with link support

"use client";

import React from "react";

const PreviewContainer = ({
  container,
  selectedContainerId,
  onSelect,
  previewMode = false,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();

    // In preview mode, allow link navigation
    if (previewMode && container.isClickable && container.linkUrl) {
      // Let the link handle its own navigation
      return;
    }

    // In edit mode, prevent link navigation and handle selection
    if (container.isClickable && container.linkUrl) {
      e.preventDefault();
    }

    onSelect(container.container_Id);
  };

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    const hoverStyles = container.hoverStyles || {};

    // Apply hover styles
    if (
      hoverStyles.backgroundColor &&
      hoverStyles.backgroundColor !== "transparent"
    ) {
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

  const isSelected = container.container_Id === selectedContainerId;

  const containerStyle = {
    ...container.styles,
    outline: isSelected ? "2px solid #3b82f6" : "none",
    // Add link-specific styling
    textDecoration:
      container.isClickable && container.linkUrl ? "underline" : "none",
    ...(container.imageMode === "background" &&
      container.imageUrl && {
        backgroundImage: `url(${container.imageUrl})`,
        backgroundPosition: container.imagePosition,
        backgroundSize: container.imageSize,
        backgroundRepeat: container.imageRepeat,
      }),
  };

  // Common props for both div and anchor elements
  const commonProps = {
    style: containerStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  const renderContent = () => {
    if (container.hasIcon && container.iconName) {
      try {
        // Dynamically import the Lucide icon
        const LucideIcon = require("lucide-react")[container.iconName];
        if (LucideIcon) {
          return React.createElement(LucideIcon, {
            size: parseInt(container.iconSize) || 16,
            color:
              container.iconColor === "inherit"
                ? container.styles.color
                : container.iconColor,
            style: { flexShrink: 0 },
          });
        } else {
          // Fallback icon for invalid names
          const HelpCircle = require("lucide-react").HelpCircle;
          return React.createElement(HelpCircle, {
            size: parseInt(container.iconSize) || 16,
            color:
              container.iconColor === "inherit"
                ? container.styles.color
                : container.iconColor,
            style: { flexShrink: 0 },
          });
        }
      } catch (error) {
        // Fallback for any import errors
        return <span style={{ fontSize: `${container.iconSize}px` }}>❓</span>;
      }
    }

    
    if (container.imageMode === "img" && container.imageUrl) {
      return (
        <img
          src={container.imageUrl}
          alt={container.imageAlt}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: container.imageSize === "cover" ? "cover" : "contain",
          }}
        />
      );
    }

    if (container.text && !container.children.some((child) => child !== null)) {
      return (
        <span style={{ fontSize: container.styles.fontSize }}>
          {container.text}
        </span>
      );
    }

    return container.children.map(
      (child) =>
        child && (
          <PreviewContainer
            key={child.container_Id}
            container={child}
            selectedContainerId={selectedContainerId}
            onSelect={onSelect}
            previewMode={previewMode}
          />
        )
    );
  };

  // Update both the anchor and div returns to use renderContent()
  if (container.isClickable && container.linkUrl) {
    return (
      <a {...commonProps}>
        {isSelected && (
          <div className="absolute -top-6 -left-1 bg-blue-500 font-normal text-white px-1.5 py-0.5 text-[10px] rounded-t-sm flex items-center gap-1">
            Selected
            <span className="text-[8px]">🔗</span>
          </div>
        )}
        {renderContent()}
      </a>
    );
  }

  return (
    <div {...commonProps}>
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-blue-500 font-normal text-white px-1.5 py-0.5 text-[10px] rounded-t-sm">
          Selected
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default PreviewContainer;
