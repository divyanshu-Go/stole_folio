"use client";

import React from "react";
import {
  Ban,
  Image as ImageIcon,
  PictureInPicture,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Upload,
} from "lucide-react";

// Image Mode Selector component
const ImageModeSelector = ({ value, onChange }) => {
  const options = [
    { value: "none", label: "No Image", icon: <Ban size={14} /> },
    {
      value: "background",
      label: "Background",
      icon: <PictureInPicture size={14} />,
    },
    { value: "img", label: "Image Element", icon: <ImageIcon size={14} /> },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded-sm flex items-center gap-1 ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Image Size Selector
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
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Image Position Selector
const ImagePositionSelector = ({ value, onChange }) => {
  const options = ["center", "top", "bottom", "left", "right"];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// Image Repeat Selector
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
          className={`px-2 py-1 text-xs rounded-sm ${
            value === option.value
              ? "bg-neutral-700 text-neutral-50"
              : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
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
    if (!url) return true;
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const isValidImageUrl = validateImageUrl(container.imageUrl);
  const hasImage = container.imageMode !== "none";

  const handleTestImage = () => {
    if (container.imageUrl && isValidImageUrl) {
      const url = container.imageUrl.startsWith("http")
        ? container.imageUrl
        : `https://${container.imageUrl}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-3">
      {/* Image Mode */}
      <div>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Image Mode
        </label>
        <ImageModeSelector
          value={container.imageMode}
          onChange={(value) => handleImageChange("imageMode", value)}
        />
      </div>

      {/* Image URL */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Image URL
          {!isValidImageUrl && container.imageUrl && (
            <span className="text-red-500 ml-1">• Invalid URL</span>
          )}
        </label>
        <input
          type="text"
          value={container.imageUrl}
          onChange={(e) => handleImageChange("imageUrl", e.target.value)}
          className={`w-full p-1 border rounded-sm text-xs ${
            !isValidImageUrl && container.imageUrl
              ? "border-red-300 bg-red-50"
              : "border-neutral-300 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
          }`}
          placeholder="https://example.com/image.jpg"
          disabled={!hasImage}
        />
        <p className="text-xs text-neutral-500 mt-1">
          JPG, PNG, GIF, SVG, WebP supported
        </p>
      </div>

      {/* Alt Text */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Alt Text (Accessibility)
        </label>
        <input
          type="text"
          value={container.imageAlt}
          onChange={(e) => handleImageChange("imageAlt", e.target.value)}
          className="w-full p-1 border rounded-sm text-xs border-neutral-300 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
          placeholder="Describe the image..."
          disabled={!hasImage}
        />
      </div>

      {/* Image Size */}
      <div className={hasImage ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Image Size
        </label>
        <ImageSizeSelector
          value={container.imageSize}
          onChange={(value) => handleImageChange("imageSize", value)}
        />
      </div>

      {/* Background Options */}
      {container.imageMode === "background" && (
        <>
          <div>
            <label className="block text-xs font-medium mb-1 text-neutral-700">
              Position
            </label>
            <ImagePositionSelector
              value={container.imagePosition}
              onChange={(value) => handleImageChange("imagePosition", value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-neutral-700">
              Repeat
            </label>
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
            className="w-full px-3 py-1 bg-neutral-700 text-neutral-50 text-xs rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1"
          >
            <ImageIcon size={14} /> Preview Image
          </button>
        </div>
      )}

      {/* Image Status */}
      {hasImage && (
        <div className="text-xs p-2 rounded-sm bg-neutral-200 border border-neutral-300">
          <div className="flex items-center gap-1">
            <ImageIcon size={14} className="text-neutral-600" />
            <span className="font-medium text-neutral-800">Image Status:</span>
          </div>

          {container.imageUrl ? (
            <div className="mt-1 text-neutral-700 flex items-center gap-1">
              {isValidImageUrl ? (
                <>
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Image ready</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} className="text-yellow-600" />
                  <span>Invalid image URL</span>
                </>
              )}
            </div>
          ) : (
            <div className="mt-1 text-neutral-700 flex items-center gap-1">
              <Upload size={14} className="text-neutral-500" />
              <span>No image uploaded</span>
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      {!hasImage && (
        <div className="text-xs p-2 rounded-sm bg-neutral-50 border border-neutral-200">
          <div className="flex items-center gap-1">
            <HelpCircle size={14} className="text-neutral-600" />
            <span className="font-medium text-neutral-800">Image Options:</span>
          </div>
          <div className="mt-1 text-neutral-700">
            <div>
              • <strong>Background:</strong> Image behind content
            </div>
            <div>
              • <strong>Element:</strong> Standalone image
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTab;
