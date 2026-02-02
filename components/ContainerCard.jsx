"use client";

import React, { useState } from "react";
import ContainerRenderer from "@/components/ContainerRenderer";
import Container from "@/lib/utils/ContainerClass";
import { Edit, ExternalLink, Pin, MoreHorizontal, Trash2 } from "lucide-react";
import ContainerActions from "@/components/ContainerActions";

const ContainerCard = ({ containerData }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // optimistic delete flag

  const container = containerData ? Container.fromJSON(containerData) : null;

  const handleDelete = async () => {
    // Optimistic UI update → remove from screen immediately
    setIsDeleted(true);

    try {
      const res = await fetch(`/api/containers/${containerData._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        // If API failed → rollback UI
        setIsDeleted(false);
        alert(data.error || "Failed to delete container");
        return;
      }

    } catch (err) {
      console.error("Error deleting container:", err);
      setIsDeleted(false); // rollback
      alert("Something went wrong while deleting");
    }
  };

  const handleEdit = () => {
    window.location.href = `/ui-builder/edit/${containerData.container_Id}`;
  };

  const handleOpen = () => {
    window.location.href = `/ui-builder/${containerData._id}`;
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    console.log("Pin container:", containerData.container_Id, !isPinned);
  };

  if (isDeleted) {
    return null; // remove card from UI immediately
  }

  if (!container) {
    return (
      <div className="bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden">
        <div className="h-32 bg-neutral-50 flex items-center justify-center">
          <span className="text-neutral-400 text-sm">Invalid Container</span>
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
              {containerData.projectName || "Untitled Project"}
            </h3>
            <p className="text-xs text-neutral-500 truncate">
              {containerData.text || "No description"}
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
              <ContainerActions
                isPinned={isPinned}
                onOpen={handleOpen}
                onEdit={handleEdit}
                onPin={handlePin}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleOpen}
            className="flex-1 bg-neutral-800 text-white px-3 py-1.5 rounded-sm text-sm button-box transition-colors flex items-center justify-center gap-1"
          >
            <ExternalLink size={12} />
            Open
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
            ID: {containerData.container_Id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContainerCard;
