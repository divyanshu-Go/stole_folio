// Updated PreviewContainer with link support

"use client";

import React from "react";

const PreviewContainer = ({ container, selectedContainerId, onSelect, previewMode = false }) => {
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

  const isSelected = container.container_Id === selectedContainerId;

  const containerStyle = {
    ...container.styles,
    cursor: container.isClickable ? "pointer" : "pointer", // Always pointer for selection
    position: "relative",
    minHeight: "fit-content",
    maxWidth: "100%",
    fontSize: "0.75rem", 
    lineHeight: "1rem",
    outline: isSelected ? "2px solid #3b82f6" : "none",
    outlineOffset: "2px",
    transition: "all 0.2s ease",
    // Add link-specific styling
    textDecoration: container.isClickable && container.linkUrl ? "underline" : "none",
  };

  // Common props for both div and anchor elements
  const commonProps = {
    style: containerStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  // Render as anchor tag if it's clickable and has a URL
  if (container.isClickable && container.linkUrl) {
    return (
      <a
        {...commonProps}
        href={container.linkUrl}
        target={container.linkTarget}
        title={container.linkTitle}
        rel={container.linkTarget === "_blank" ? "noopener noreferrer" : undefined}
      >
        {isSelected && (
          <div className="absolute -top-6 -left-1 bg-blue-500 font-normal text-white px-1.5 py-0.5 text-[10px] rounded-t-sm flex items-center gap-1">
            Selected
            <span className="text-[8px]">🔗</span>
          </div>
        )}

        {container.text && !container.children.some((child) => child !== null) && (
          <span style={{ fontSize: container.styles.fontSize }}>{container.text}</span>
        )}

        {container.children.map(
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
        )}
      </a>
    );
  }

  // Render as div for non-clickable containers
  return (
    <div {...commonProps}>
      {isSelected && (
        <div className="absolute -top-6 -left-1 bg-blue-500 font-normal text-white px-1.5 py-0.5 text-[10px] rounded-t-sm">
          Selected
        </div>
      )}

      {container.text && !container.children.some((child) => child !== null) && (
        <span style={{ fontSize: container.styles.fontSize }}>{container.text}</span>
      )}

      {container.children.map(
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
      )}
    </div>
  );
};

export default PreviewContainer;