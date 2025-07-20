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
  !container.isClickable &&
  !container.imageUrl &&
  container.children.filter((child) => child !== null).length < 4;



  return (
    <div className="pt-3 mt-3 border-t space-y-2">
      {/* Copy / Paste */}
      <div className="flex gap-2">
        <button
          onClick={() => onCopy(container.container_Id)}
          className="flex-1 bg-green-500 text-white p-2 rounded text-xs hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
        >
          <Copy className="w-3 h-3" />
          Copy
        </button>

        <button
          onClick={() => onPaste(container.container_Id)}
          disabled={!copiedContainer || !canAddChild}
          className={`flex-1 p-2 rounded text-xs transition-colors flex items-center justify-center gap-1 ${copiedContainer && canAddChild
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          <Clipboard className="w-3 h-3" />
          Paste
        </button>
      </div>

      {/* Add Child / Delete */}
      <div className="flex gap-2">
        {canAddChild && (
          <button
            onClick={() => onAddChild(container.container_Id)}
            className="flex-1 bg-blue-500 text-white p-2 rounded text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Child ({container.children.filter((child) => child !== null).length}/4)
          </button>
        )}

        <button
          onClick={() => onDeleteChild(container.container_Id)}
          disabled={isRootSelected}
          className={`flex-1 p-2 rounded text-xs transition-colors flex items-center justify-center gap-1 
              ${!isRootSelected 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          title="Delete this container"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>

      </div>

      {/* Copied status */}
      {copiedContainer && (
        <div className="text-xs text-gray-600 bg-gray-100 rounded p-2 flex items-center gap-1">
          <Copy className="w-3 h-3" />
          Copied: "{copiedContainer.text}" ready to paste
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
