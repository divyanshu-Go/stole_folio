"use client";

import React, { useState, useRef, useEffect } from "react";
import ContainerRenderer from "@/components/ContainerRenderer";
import Container from "@/lib/utils/ContainerClass";
import { ExternalLink, Pin, MoreHorizontal, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

const ContainerCard = ({ containerData, onDelete }) => {
  const [isPinned, setIsPinned]       = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting]   = useState(false);
  const menuRef = useRef(null);

  const container = containerData ? Container.fromJSON(containerData) : null;

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowActions(false);
    };
    if (showActions) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showActions]);

  const handleDelete = async () => {
    if (!confirm("Delete this container?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/containers/${containerData._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete container");
        setIsDeleting(false);
        return;
      }
      toast.success("Container deleted");
      onDelete?.(containerData._id);
    } catch {
      toast.error("Something went wrong while deleting");
      setIsDeleting(false);
    }
  };

  // Opens container in ui-builder — existing working route
  const handleUse = () => {
    window.location.href = `/ui-builder/${containerData._id}`;
  };

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
    <div className={`bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${isPinned ? "ring-2 ring-blue-500" : ""}`}>
      {isPinned && (
        <div className="bg-blue-500 text-white text-xs px-2 py-1 text-center">📌 Pinned</div>
      )}

      {/* Preview */}
      <div className="h-32 bg-white border-b border-neutral-300 p-2 overflow-hidden">
        <div className="w-full h-full rounded-sm border border-neutral-200 overflow-hidden"
          style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%", height: "250%" }}>
          <ContainerRenderer container={container} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-neutral-800 mb-1 truncate text-sm">
              {containerData.projectName || "Untitled Project"}
            </h3>
            <p className="text-xs text-neutral-500 truncate">
              {containerData.text || "No description"}
            </p>
          </div>

          {/* Three-dot menu */}
          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 rounded transition-colors"
            >
              <MoreHorizontal size={15} />
            </button>
            {showActions && (
              <div className="absolute right-0 bottom-8 bg-neutral-800 border border-neutral-700 rounded-sm shadow-lg py-1 z-10 min-w-[140px]">
                <button onClick={() => { handleUse(); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 flex items-center gap-2">
                  <ExternalLink size={12} /> Open in Builder
                </button>
                <button onClick={() => { setIsPinned(p => !p); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 flex items-center gap-2">
                  <Pin size={12} /> {isPinned ? "Unpin" : "Pin"}
                </button>
                <hr className="my-1 border-neutral-700" />
                <button onClick={() => { handleDelete(); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-neutral-700 flex items-center gap-2">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <button onClick={handleUse}
            className="flex-1 border border-neutral-500 text-neutral-800 hover:bg-neutral-800 hover:text-white
                       px-3 py-1.5 rounded-sm text-xs font-medium transition-colors
                       flex items-center justify-center gap-1.5">
            <Copy size={11} /> Use Container
          </button>
          <button onClick={handleUse}
            className="flex-1 bg-neutral-800 text-white hover:bg-neutral-900
                       px-3 py-1.5 rounded-sm text-xs font-medium button-box transition-colors
                       flex items-center justify-center gap-1.5">
            <ExternalLink size={11} /> Open
          </button>
          <button onClick={handleDelete} disabled={isDeleting}
            className="px-3 py-1.5 rounded-sm text-xs bg-red-200 text-red-600 hover:bg-red-300
                       transition-colors flex items-center justify-center disabled:opacity-50">
            <Trash2 size={11} />
          </button>
        </div>

        <div className="mt-2 pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 truncate">ID: {containerData.container_Id}</p>
        </div>
      </div>
    </div>
  );
};

export default ContainerCard;