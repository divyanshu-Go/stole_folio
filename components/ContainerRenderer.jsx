"use client";

import React from "react";

/**
 * ContainerRenderer - Utility component to render Container objects as static JSX
 * 
 * This component converts Container class instances into view-only React components.
 * Features:
 * - Recursive rendering of children containers
 * - Support for text, images, icons, and all styling
 * - No hover effects or interactive elements (view-only)
 * - Modular and extensible design
 * 
 * @param {Object} container - Container class instance to render
 * @param {string} containerKey - Optional React key for list rendering
 */
const ContainerRenderer = ({ container, containerKey = null }) => {
  // Early return if no container provided
  if (!container) {
    return null;
  }

  /**
   * Process and prepare inline styles from container.styles
   * Excludes hover-related styles and handles special cases
   */
  const getProcessedStyles = () => {
    const baseStyles = { ...container.styles };
    
    // Add background image styles if container uses background image mode
    if (container.imageMode === "background" && container.imageUrl) {
      baseStyles.backgroundImage = `url(${container.imageUrl})`;
      baseStyles.backgroundPosition = container.imagePosition || "center";
      baseStyles.backgroundSize = container.imageSize || "cover";
      baseStyles.backgroundRepeat = container.imageRepeat || "no-repeat";
    }

    // Remove cursor pointer for view-only mode
    baseStyles.cursor = "default";
    
    return baseStyles;
  };

  /**
   * Render icon content using Lucide React icons
   * Handles dynamic import and fallbacks gracefully
   */
  const renderIcon = () => {
    if (!container.hasIcon || !container.iconName) {
      return null;
    }

    try {
      // Dynamically import the Lucide icon
      const LucideIcon = require("lucide-react")[container.iconName];
      
      if (LucideIcon) {
        return React.createElement(LucideIcon, {
          size: parseInt(container.iconSize) || 16,
          color: container.iconColor === "transparent" 
            ? container.styles.color 
            : container.iconColor,
          style: { flexShrink: 0 }
        });
      } else {
        // Fallback icon for invalid names
        const HelpCircle = require("lucide-react").HelpCircle;
        return React.createElement(HelpCircle, {
          size: parseInt(container.iconSize) || 16,
          color: container.iconColor === "transparent" 
            ? container.styles.color 
            : container.iconColor,
          style: { flexShrink: 0 }
        });
      }
    } catch (error) {
      // Text fallback for any import errors
      return (
        <span style={{ fontSize: `${container.iconSize}px` }}>
          ❓
        </span>
      );
    }
  };

  /**
   * Render image content when container uses img mode
   */
  const renderImage = () => {
    if (container.imageMode !== "img" || !container.imageUrl) {
      return null;
    }

    return (
      <img
        src={container.imageUrl}
        alt={container.imageAlt || ""}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: container.imageSize === "cover" ? "cover" : "contain",
        }}
      />
    );
  };

  /**
   * Render text content with proper styling
   */
  const renderText = () => {
    // Only render text if there's text content and no children with content
    const hasContentChildren = container.children.some(child => child !== null);
    
    if (!container.text || hasContentChildren) {
      return null;
    }

    return (
      <span style={{ fontSize: container.styles.fontSize }}>
        {container.text}
      </span>
    );
  };

  /**
   * Recursively render children containers
   */
  const renderChildren = () => {
    if (!container.children || container.children.length === 0) {
      return null;
    }

    return container.children.map((child, index) => {
      // Skip null children
      if (child === null) {
        return null;
      }

      return (
        <ContainerRenderer
          key={child.container_Id || `child-${index}`}
          container={child}
          containerKey={child.container_Id}
        />
      );
    });
  };

  /**
   * Determine what content to render based on priority:
   * 1. Icon (if hasIcon is true)
   * 2. Image (if imageMode is "img")
   * 3. Text (if no children)
   * 4. Children (recursive)
   */
  const renderContent = () => {
    // Priority 1: Icon
    const iconContent = renderIcon();
    if (iconContent) {
      return iconContent;
    }

    // Priority 2: Image
    const imageContent = renderImage();
    if (imageContent) {
      return imageContent;
    }

    // Priority 3: Text (only if no children)
    const textContent = renderText();
    if (textContent) {
      return textContent;
    }

    // Priority 4: Children
    return renderChildren();
  };

  // Prepare component props (excluding key)
  const componentProps = {
    style: getProcessedStyles(),
    id: container.sectionId || undefined, // Add section ID if provided
  };

  // Render the container as a div with processed styles and content
  // Key is passed directly, not through spread operator
  return (
    <div key={containerKey} {...componentProps}>
      {renderContent()}
    </div>
  );
};

/**
 * Main export - ContainerRenderer component
 * 
 * Usage:
 * import ContainerRenderer from './ContainerRenderer';
 * 
 * // In your component:
 * <ContainerRenderer container={myContainerObject} />
 */
export default ContainerRenderer;

/**
 * Alternative named export for specific use cases
 * Useful when you need to render a container tree starting from root
 */
export const renderContainerTree = (rootContainer) => {
  return <ContainerRenderer container={rootContainer} />;
};