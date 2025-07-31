"use client";
import React from "react";

// Link Target Selector component
const LinkTargetSelector = ({ value, onChange }) => {
  const options = [
    { value: "_self", label: "Same Tab" },
    { value: "_blank", label: "New Tab" },
    { value: "_parent", label: "Parent Frame" },
    { value: "_top", label: "Top Frame" },
  ];

  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 py-1 text-xs rounded ${
            value === option.value
              ? "bg-emerald-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

const LinkTab = ({ 
  container, 
  handleLinkChange, 
  handleToggleClickable 
}) => {
  const validateUrl = (url) => {
    if (!url) return true; // Empty is valid
    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      // Check for relative paths
      return url.startsWith('/') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:');
    }
  };

  const isValidUrl = validateUrl(container.linkUrl);

  const handleTestLink = () => {
    if (container.linkUrl && isValidUrl) {
      const url = container.linkUrl.startsWith('http') ? container.linkUrl : `https://${container.linkUrl}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-3">
      {/* Enable/Disable Link */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium">
          <input
            type="checkbox"
            checked={container.isClickable}
            onChange={(e) => handleToggleClickable(container.container_Id, e.target.checked)}
            className="w-3 h-3"
          />
          Make this container clickable
        </label>
      </div>

      {/* URL Input */}
      <div className={container.isClickable ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">
          Link URL
          {!isValidUrl && container.linkUrl && (
            <span className="text-red-500 ml-1">• Invalid URL</span>
          )}
        </label>
        <input
          type="text"
          value={container.linkUrl}
          onChange={(e) => handleLinkChange("linkUrl", e.target.value)}
          className={`w-full p-1 border rounded text-xs ${
            !isValidUrl && container.linkUrl 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          }`}
          placeholder="https://example.com or /about"
          disabled={!container.isClickable}
        />
        <p className="text-xs text-gray-500 mt-1">
          External: https://example.com | Internal: /about | Email: mailto:user@example.com
        </p>
      </div>

      {/* Link Target */}
      <div className={container.isClickable ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Open Link In</label>
        <LinkTargetSelector
          value={container.linkTarget}
          onChange={(value) => handleLinkChange("linkTarget", value)}
        />
      </div>

      {/* Link Title (for accessibility) */}
      <div className={container.isClickable ? "" : "opacity-50 pointer-events-none"}>
        <label className="block text-xs font-medium mb-1">Link Title (Tooltip)</label>
        <input
          type="text"
          value={container.linkTitle}
          onChange={(e) => handleLinkChange("linkTitle", e.target.value)}
          className="w-full p-1 border rounded text-xs"
          placeholder="Optional tooltip text..."
          disabled={!container.isClickable}
        />
      </div>

      {/* Test Link Button */}
      {container.isClickable && container.linkUrl && isValidUrl && (
        <div>
          <button
            onClick={handleTestLink}
            className="w-full px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
          >
            🔗 Test Link
          </button>
        </div>
      )}

      {/* Link Status Indicator */}
      {container.isClickable && (
        <div className="text-xs p-2 rounded bg-emerald-50 border border-emerald-200">
          <div className="flex items-center gap-1">
            <span className="text-emerald-600">🔗</span>
            <span className="font-medium text-emerald-800">Link Status:</span>
          </div>
          {container.linkUrl ? (
            <div className="mt-1 text-emerald-700">
              {isValidUrl ? "✓ Ready to use" : "⚠ URL needs to be fixed"}
            </div>
          ) : (
            <div className="mt-1 text-emerald-700">Enter a URL to activate</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkTab;