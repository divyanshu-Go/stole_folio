"use client";
import React from "react";
import { Copy, Clipboard, Plus, Trash2 } from "lucide-react";

const ActionButtons = ({
  container,
  copiedContainer,
  isRootSelected,
  onCopy,
  onPaste,
  onAddChild,
  onDeleteChild,
}) => {
  const canAddChild =
    (container.hasIcon !== true && container.hasIcon !== "true") &&
    !container.isClickable &&
    !container.imageUrl &&
    container.children.filter((child) => child !== null).length < 4;

  return (
    <div className="p-2 mt-3 rounded-sm space-y-2 shadow-box">
      {/* Copy / Paste */}
      <div className="flex gap-2 font-medium">
        <button
          onClick={() => onCopy(container.container_Id)}
          className="flex-1  bg-blue-500 text-white p-2 rounded text-xs action-btn-box
           hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
        >
          <Copy className="w-3 h-3" />
          Copy
        </button>

        <button
          onClick={() => onPaste(container.container_Id)}
          disabled={!copiedContainer || !canAddChild}
          className={`flex-1 p-2 rounded text-xs transition-colors flex items-center 
            justify-center gap-1 ${
            copiedContainer && canAddChild
              ? "bg-indigo-500 text-white hover:bg-indigo-600 action-btn-box"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Clipboard className="w-3 h-3" />
          Paste
        </button>
      </div>

      {/* Add Child / Delete */}
      <div className="flex gap-2 font-medium">
        {canAddChild && (
          <button
            onClick={() => onAddChild(container.container_Id)}
            className="flex-1 bg-neutral-800 text-white p-2 rounded text-xs action-btn-box
             hover:bg-neutral-900 transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Child ({container.children.filter((child) => child !== null).length}/4)
          </button>
        )}

        <button
          onClick={() => onDeleteChild(container.container_Id)}
          disabled={isRootSelected}
          className={`flex-1 p-2 rounded text-xs transition-colors flex items-center justify-center gap-1
            ${
              !isRootSelected
                ? "bg-red-500 text-white hover:bg-red-600 action-btn-box"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          title="Delete this container"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>

      {/* Copied status */}
      {copiedContainer && (
        <div className="text-xs w-fit text-neutral-600 border border-dashed bg-neutral-100 rounded px-2 py-1 flex items-center gap-1">
          <Copy className="w-3 h-3" />
          Copied: "{copiedContainer.text}" ready to paste
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
