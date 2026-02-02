"use client";

import React, { useState } from "react";
import ContainerRenderer from "@/components/ContainerRenderer";
import Container from "@/lib/utils/ContainerClass";
import { Edit, ExternalLink, Pin, MoreHorizontal, Trash2, Eye } from "lucide-react";

const PortfolioCard = ({ portfolioData }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Extract container data from the nested containerId object
  const containerData = portfolioData?.containerId;
  const container = containerData ? Container.fromJSON(containerData) : null;

  const handleDelete = async () => {
    setIsDeleted(true);

    try {
      const res = await fetch(`/api/portfolios/${portfolioData._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setIsDeleted(false);
        alert(data.error || "Failed to delete portfolio");
        return;
      }
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      setIsDeleted(false);
      alert("Something went wrong while deleting");
    }
  };

  const handleEdit = () => {
    // Navigate to portfolio edit page
    window.location.href = `/portfolio/edit/${portfolioData._id}`;
  };

  const handleView = () => {
    // Navigate to public portfolio view
    window.location.href = `/portfolio/${portfolioData.url}`;
  };

  const handleEditContainer = () => {
    // Navigate to container editor
    window.location.href = `/ui-builder/edit/${containerData?.container_Id}`;
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    console.log("Pin portfolio:", portfolioData._id, !isPinned);
  };

  if (isDeleted) {
    return null;
  }

  if (!container || !containerData) {
    return (
      <div className="bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden">
        <div className="h-32 bg-neutral-50 flex items-center justify-center">
          <span className="text-neutral-400 text-sm">Invalid Portfolio</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
        isPinned ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Pin Indicator */}
      {isPinned && (
        <div className="bg-blue-500 text-white text-xs px-2 py-1 text-center">
          📌 Pinned
        </div>
      )}

      {/* Public Indicator */}
      {portfolioData.isPublic && (
        <div className="bg-green-500 text-white text-xs px-2 py-1 text-center">
          🌐 Public
        </div>
      )}

      {/* Preview */}
      <div className="h-32 bg-white border-b border-neutral-300 p-2 overflow-hidden">
        <div
          className="w-full h-full rounded-sm border border-neutral-200 overflow-hidden"
          style={{
            transform: "scale(0.4)",
            transformOrigin: "top left",
            width: "250%",
            height: "250%",
          }}
        >
          <ContainerRenderer container={container} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-800 mb-1 truncate text-sm">
              {portfolioData.title || "Untitled Portfolio"}
            </h3>
            <p className="text-xs text-neutral-500 truncate mb-1">
              {portfolioData.description || "No description"}
            </p>
            <p className="text-xs text-neutral-400 truncate">
              URL: /{portfolioData.url}
            </p>
          </div>

          {/* More Actions */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded"
            >
              <MoreHorizontal size={16} />
            </button>

            {showActions && (
              <div className="absolute right-0 top-8 bg-white border border-neutral-300 rounded-sm shadow-lg py-1 z-10 min-w-[120px]">
                <button
                  onClick={handleView}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Eye size={12} />
                  View Public
                </button>
                <button
                  onClick={handleEdit}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Edit size={12} />
                  Edit Portfolio
                </button>
                <button
                  onClick={handleEditContainer}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Edit size={12} />
                  Edit Container
                </button>
                <button
                  onClick={handlePin}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Pin size={12} />
                  {isPinned ? "Unpin" : "Pin"}
                </button>
                <hr className="my-1 border-neutral-200" />
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleView}
            className="flex-1 bg-neutral-800 text-white px-3 py-1.5 rounded-sm text-sm button-box transition-colors flex items-center justify-center gap-1"
          >
            <Eye size={12} />
            View
          </button>
          <button
            onClick={handleEdit}
            className="px-3 py-1.5 rounded-sm text-md font-bold action-btn-box text-blue-600 bg-blue-200 transition-colors flex items-center justify-center"
          >
            <Edit size={12} />
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-sm text-sm danger-btn-box bg-red-200 text-red-600 transition-colors flex items-center justify-center"
          >
            <Trash2 size={12} />
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-2 pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-400">
            Container ID: {containerData.container_Id}
          </p>
          <p className="text-xs text-neutral-400">
            Created: {new Date(portfolioData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;