"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const PublishModal = ({
  isOpen,
  onClose,
  rootContainer,
  serializeContainer,
  deserializeContainer,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState("");
  const [errors, setErrors] = useState({});

  const generateUrlSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "title") {
      setFormData((prev) => ({ ...prev, url: generateUrlSlug(value) }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Portfolio title is required";
    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.url)) {
      newErrors.url =
        "URL can only contain lowercase letters, numbers, and hyphens";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsPublishing(true);
    setPublishStatus("");

    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          containerData: serializeContainer(
            deserializeContainer(rootContainer)
          ),
          portfolioData: {
            title: formData.title.trim(),
            url: formData.url.trim(),
            description: formData.description.trim(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPublishStatus("success");
        onClose();
        setTimeout(() => {
          window.location.href = result.data.redirectUrl;
        }, 1500);
      } else {
        setPublishStatus("error");
        if (result.error.includes("URL already exists")) {
          setErrors({ url: result.error });
        }
      }
    } catch (err) {
      console.error("Publish error:", err);
      setPublishStatus("error");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleClose = () => {
    if (!isPublishing) {
      setFormData({ title: "", url: "", description: "" });
      setErrors({});
      setPublishStatus("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-800/40 backdrop-blur-xs flex items-center
     justify-center z-50 p-4">
      <div className="bg-neutral-100 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] 
      overflow-y-auto border border-neutral-200 shadow-box">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">
            Publish Portfolio
          </h2>
          <button
            onClick={handleClose}
            disabled={isPublishing}
            className="text-neutral-400 hover:text-neutral-600 disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-5 text-sm">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Portfolio Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800 ${
                errors.title ? "border-red-500" : "border-neutral-300"
              }`}
              placeholder="My Amazing Portfolio"
              disabled={isPublishing}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Portfolio URL *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 text-sm">
                /portfolio/
              </span>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-neutral-800 ${
                  errors.url ? "border-red-500" : "border-neutral-300"
                }`}
                placeholder="my-portfolio"
                disabled={isPublishing}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
            {errors.url && (
              <p className="text-red-500 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
              placeholder="Brief description of your portfolio..."
              disabled={isPublishing}
            />
          </div>

          {/* Status Messages */}
          {publishStatus === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Portfolio published successfully! Redirecting to your portfolio...
            </div>
          )}

          {publishStatus === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              Failed to publish portfolio. Please try again.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className=" flex justify-end gap-3 p-5 border-t border-neutral-200
         bg-neutral-200 rounded-b-2xl">
          <button
            onClick={handleClose}
            disabled={isPublishing}
            className="px-4 py-2 text-neutral-600 border border-neutral-300 action-btn-box rounded-md hover:bg-neutral-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md button-box
             disabled:opacity-50 flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <div className="animate-spin disabled:cursor-pointer rounded-full h-4 w-4 border-b-2 border-white"></div>
                Publishing...
              </>
            ) : (
              "Publish Portfolio"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
