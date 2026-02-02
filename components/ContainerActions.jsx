"use client";

import React from "react";
import { Edit, ExternalLink, Pin, Trash2 } from "lucide-react";

const ContainerActions = ({ isPinned, onOpen, onEdit, onPin, onDelete }) => {
  return (
    <div className="absolute right-0 bottom-8 bg-white shadow-box border border-neutral-300 rounded-sm py-0.5 z-10 min-w-[120px] text-xs">
      <button
        onClick={onOpen}
        className="w-full px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-200 flex items-center gap-1.5"
      >
        <ExternalLink size={12} />
        Open in Builder
      </button>
      <button
        onClick={onEdit}
        className="w-full px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-200 flex items-center gap-1.5"
      >
        <Edit size={12} />
        Edit
      </button>
      <button
        onClick={onPin}
        className="w-full px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-200 flex items-center gap-1.5"
      >
        <Pin size={12} />
        {isPinned ? "Unpin" : "Pin"}
      </button>
      <hr className="my-1 border-neutral-200" />
      <button
        onClick={onDelete}
        className="w-full px-2 py-1.5 text-left text-xs text-red-600 hover:bg-red-100 flex items-center gap-1.5"
      >
        <Trash2 size={12} />
        Delete
      </button>
    </div>
  );
};

export default ContainerActions;
