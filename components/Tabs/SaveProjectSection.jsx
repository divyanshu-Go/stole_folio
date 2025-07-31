"use client";
import React from "react";

const SaveProjectSection = ({
  isSaving,
  saveStatus,
  onSave,
  projectName,
  setProjectName,
}) => {
  return (
    <div className="mb-4 p-3 bg-white rounded border">
      <h3 className="text-sm font-medium mb-2">Save Project</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Project name (optional)"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {saveStatus === "success" && (
        <div className="text-green-600 text-xs">
          ✓ Project saved successfully!
        </div>
      )}
      {saveStatus === "error" && (
        <div className="text-red-600 text-xs">
          ✗ Failed to save project. Please try again.
        </div>
      )}
    </div>
  );
};

export default SaveProjectSection;
