"use client";

import React from "react";

// Image Mode Selector component
const ImageModeSelector = ({ value, onChange }) => {
  const options = [
    { value: "none", label: "No Image", icon: "🚫" },
    { value: "background", label: "Background", icon: "🖼️" },
    { value: "img", label: "Image Element", icon: "🏞️" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span>{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Image Size Selector component
const ImageSizeSelector = ({ value, onChange }) => {
  const options = [
    { value: "cover", label: "Cover" },
    { value: "contain", label: "Contain" },
    { value: "auto", label: "Auto" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Image Position Selector component (for background images)
const ImagePositionSelector = ({ value, onChange }) => {
  const options = [
    { value: "center", label: "Center" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Image Repeat Selector component (for background images)
const ImageRepeatSelector = ({ value, onChange }) => {
  const options = [
    { value: "no-repeat", label: "No Repeat" },
    { value: "repeat", label: "Repeat" },
    { value: "repeat-x", label: "Repeat X" },
    { value: "repeat-y", label: "Repeat Y" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

const ImageTab = ({ container, handleImageChange }) => {
  const validateImageUrl = (url) => {
    if (!url) return true; // Empty is valid
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const isValidImageUrl = validateImageUrl(container.imageUrl);
  const hasImage = container.imageMode !== "none";

  const handleTestImage = () => {
    if (container.imageUrl && isValidImageUrl) {
      const url = container.imageUrl.startsWith('http') ? container.imageUrl : `https://${container.imageUrl}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-3">
      {/* Image Mode Selection */}
      <div>
        <label className="block text-xs font-medium mb-1">Image Mode</label>
        <ImageModeSelector
          value={container.imageMode}
          onChange={(value) => handleImageChange("imageMode", value)}
        />
      </div>

      {/* Image URL Input */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">
          Image URL
          {!isValidImageUrl && container.imageUrl && (
            <span className="text-red-500 ml-1">• Invalid URL</span>
          )}
        </label>
        <input
          type="text"
          value={container.imageUrl}
          onChange={(e) => handleImageChange("imageUrl", e.target.value)}
          className={`w-full p-1 border rounded text-xs ${
            !isValidImageUrl && container.imageUrl 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          }`}
          placeholder="https://example.com/image.jpg"
          disabled={!hasImage}
        />
        <p className="text-xs text-gray-500 mt-1">
          JPG, PNG, GIF, SVG, WebP supported
        </p>
      </div>

      {/* Alt Text */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Alt Text (Accessibility)</label>
        <input
          type="text"
          value={container.imageAlt}
          onChange={(e) => handleImageChange("imageAlt", e.target.value)}
          className="w-full p-1 border rounded text-xs"
          placeholder="Describe the image..."
          disabled={!hasImage}
        />
      </div>

      {/* Image Size */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Image Size</label>
        <ImageSizeSelector
          value={container.imageSize}
          onChange={(value) => handleImageChange("imageSize", value)}
        />
      </div>

      {/* Background Image Specific Options */}
      {container.imageMode === "background" && (
        <>
          <div>
            <label className="block text-xs font-medium mb-1">Position</label>
            <ImagePositionSelector
              value={container.imagePosition}
              onChange={(value) => handleImageChange("imagePosition", value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Repeat</label>
            <ImageRepeatSelector
              value={container.imageRepeat}
              onChange={(value) => handleImageChange("imageRepeat", value)}
            />
          </div>
        </>
      )}

      {/* Test Image Button */}
      {hasImage && container.imageUrl && isValidImageUrl && (
        <div>
          <button
            onClick={handleTestImage}
            className="w-full px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
          >
            🖼️ Preview Image
          </button>
        </div>
      )}

      {/* Image Status Indicator */}
      {hasImage && (
        <div className="text-xs p-2 rounded bg-purple-50 border border-purple-200">
          <div className="flex items-center gap-1">
            <span className="text-purple-600">
              {container.imageMode === "background" ? "🖼️" : "🏞️"}
            </span>
            <span className="font-medium text-purple-800">Image Status:</span>
          </div>
          <div className="mt-1 text-purple-700">
            <div>Mode: {container.imageMode === "background" ? "Background Image" : "Image Element"}</div>
            {container.imageUrl ? (
              <div className="mt-1">
                {isValidImageUrl ? "✓ Image ready to display" : "⚠ URL needs to be fixed"}
              </div>
            ) : (
              <div className="mt-1">Enter an image URL to display</div>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      {!hasImage && (
        <div className="text-xs p-2 rounded bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">💡</span>
            <span className="font-medium text-gray-800">Image Options:</span>
          </div>
          <div className="mt-1 text-gray-700">
            <div>• <strong>Background:</strong> Image behind content</div>
            <div>• <strong>Element:</strong> Standalone image</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTab;