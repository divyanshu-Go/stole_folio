"use client";
import { AlertTriangle, CheckCircle, LinkIcon } from "lucide-react";
import React from "react";

// Link Target Selector component
const LinkTargetSelector = ({ value, onChange }) => {
  const options = [
    { value: "_self", label: "Same Tab" },
    { value: "_blank", label: "New Tab" },
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

const LinkTab = ({ container, handleLinkChange, handleToggleClickable }) => {
  const validateUrl = (url) => {
    if (!url) return true; // Empty is valid
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return (
        url.startsWith("/") ||
        url.startsWith("#") ||
        url.startsWith("mailto:") ||
        url.startsWith("tel:")
      );
    }
  };

  const isValidUrl = validateUrl(container.linkUrl);

  const handleTestLink = () => {
    if (container.linkUrl && isValidUrl) {
      const url = container.linkUrl.startsWith("http")
        ? container.linkUrl
        : `https://${container.linkUrl}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-3">
      {/* Enable/Disable Link */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-neutral-700">
          <input
            type="checkbox"
            checked={container.isClickable}
            onChange={(e) =>
              handleToggleClickable(container.container_Id, e.target.checked)
            }
            className="w-3 h-3 accent-neutral-700 text-neutral-50 rounded-sm"
          />
          Make this container clickable
        </label>
      </div>

      {/* URL Input */}
      <div
        className={
          container.isClickable ? "" : "opacity-50 pointer-events-none"
        }
      >
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Link URL
          {!isValidUrl && container.linkUrl && (
            <span className="text-red-500 ml-1">• Invalid URL</span>
          )}
        </label>
        <input
          type="text"
          value={container.linkUrl}
          onChange={(e) => handleLinkChange("linkUrl", e.target.value)}
          className={`w-full p-1 border rounded-sm text-xs ${
            !isValidUrl && container.linkUrl
              ? "border-red-300 bg-red-50"
              : "border-neutral-300 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
          }`}
          placeholder="https://example.com or /about"
          disabled={!container.isClickable}
        />
        <p className="text-xs text-neutral-500 mt-1">
          External: https://example.com | Internal: /about | Email:
          mailto:user@example.com
        </p>
      </div>

      {/* Link Target */}
      <div
        className={
          container.isClickable ? "" : "opacity-50 pointer-events-none"
        }
      >
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Open Link In
        </label>
        <LinkTargetSelector
          value={container.linkTarget}
          onChange={(value) => handleLinkChange("linkTarget", value)}
        />
      </div>

      {/* Link Title */}
      <div
        className={
          container.isClickable ? "" : "opacity-50 pointer-events-none"
        }
      >
        <label className="block text-xs font-medium mb-1 text-neutral-700">
          Link Title (Tooltip)
        </label>
        <input
          type="text"
          value={container.linkTitle}
          onChange={(e) => handleLinkChange("linkTitle", e.target.value)}
          className="w-full p-1 border rounded-sm text-xs border-neutral-300 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
          placeholder="Optional tooltip text..."
          disabled={!container.isClickable}
        />
      </div>

      {/* Test Link Button */}
      {container.isClickable && container.linkUrl && isValidUrl && (
        <div>
          <button
            onClick={handleTestLink}
            className="w-full px-3 py-1 bg-neutral-700 text-neutral-50 text-xs rounded-sm hover:bg-neutral-800 transition-colors"
          >
            🔗 Test Link
          </button>
        </div>
      )}

      {/* Link Status Indicator */}
      {container.isClickable && (
        <div className="text-xs p-2 rounded-sm bg-neutral-200 border border-neutral-300">
          <div className="flex items-center gap-1">
            <LinkIcon size={14} className="text-neutral-600" />
            <span className="font-medium text-neutral-800">Link Status:</span>
          </div>
          {container.linkUrl ? (
            <div className="mt-1 text-neutral-700 flex items-center gap-1">
              {isValidUrl ? (
                <>
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Ready to use</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} className="text-yellow-600" />
                  <span>URL needs to be fixed</span>
                </>
              )}
            </div>
          ) : (
            <div className="mt-1 text-neutral-700">Enter a URL to activate</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkTab;
