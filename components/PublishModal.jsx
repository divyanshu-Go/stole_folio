// components/PublishModal.js
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
    author: "",
    title: "",
    url: "",
    description: "",
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Generate URL slug from title
  const generateUrlSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate URL from title
    if (field === "title") {
      const slug = generateUrlSlug(value);
      setFormData((prev) => ({
        ...prev,
        url: slug,
      }));
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Portfolio title is required";
    }

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
            author: formData.author.trim(),
            title: formData.title.trim(),
            url: formData.url.trim(),
            description: formData.description.trim(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPublishStatus("success");
        // Redirect to published portfolio after 2 seconds
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
      setFormData({ author: "", title: "", url: "", description: "" });
      setErrors({});
      setPublishStatus("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-500/30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Publish Portfolio
          </h2>
          <button
            onClick={handleClose}
            disabled={isPublishing}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Name *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your name"
              disabled={isPublishing}
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">{errors.author}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio URL *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                /portfolio/
              </span>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.url ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="my-portfolio"
                disabled={isPublishing}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
            {errors.url && (
              <p className="text-red-500 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of your portfolio..."
              disabled={isPublishing}
            />
          </div>

          {/* Status Messages */}
          {publishStatus === "success" && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              Portfolio published successfully! Redirecting to your portfolio...
            </div>
          )}

          {publishStatus === "error" && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              Failed to publish portfolio. Please try again.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={handleClose}
            disabled={isPublishing}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
