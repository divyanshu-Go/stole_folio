// components/UiBuilderComponents/Tabs/ImageTab.js
"use client";

import React from "react";

const ImageTab = ({ container, handleImageChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Mode
        </label>
        <select
          value={container.imageMode}
          onChange={(e) => handleImageChange("imageMode", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="none">No Image</option>
          <option value="background">Background Image</option>
          <option value="img">Image Element</option>
        </select>
      </div>

      {container.imageMode !== "none" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={container.imageUrl}
              onChange={(e) => handleImageChange("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={container.imageAlt}
              onChange={(e) => handleImageChange("imageAlt", e.target.value)}
              placeholder="Describe the image"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Size
            </label>
            <select
              value={container.imageSize}
              onChange={(e) => handleImageChange("imageSize", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {container.imageMode === "background" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  value={container.imagePosition}
                  onChange={(e) => handleImageChange("imagePosition", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat
                </label>
                <select
                  value={container.imageRepeat}
                  onChange={(e) => handleImageChange("imageRepeat", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="no-repeat">No Repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="repeat-x">Repeat X</option>
                  <option value="repeat-y">Repeat Y</option>
                </select>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ImageTab;