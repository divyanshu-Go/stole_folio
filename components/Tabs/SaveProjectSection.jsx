"use client";
import { CheckCircle, XCircle } from "lucide-react";

const SaveProjectSection = ({
  isSaving,
  saveStatus,
  onSave,
  projectName,
  setProjectName,
}) => {
  return (
    <div className=" bg-neutral-50 rounded-sm">
      <h3 className="text-sm font-medium my-2 text-neutral-800">
        Save UI to Library
      </h3>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Project name (optional)"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-1 min-w-0 px-2 py-1 text-sm border border-neutral-300 rounded 
          focus:outline-none focus:ring-1 focus:ring-neutral-500 bg-neutral-100 text-neutral-700"
        />
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
            isSaving
              ? "bg-neutral-400 text-neutral-100 cursor-not-allowed"
              : "bg-neutral-700 button-box text-neutral-100"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {saveStatus === "success" && (
        <div className=" items-center gap-1 text-xs text-neutral-700 bg-neutral-200 px-2 py-1 rounded inline-flex">
          <CheckCircle size={14} className="text-green-600" />
          <span>Project saved successfully!</span>
        </div>
      )}
      {saveStatus === "error" && (
        <div className=" items-center gap-1 text-xs text-red-700 bg-red-100 px-2 py-1 rounded inline-flex">
          <XCircle size={14} className="text-red-600" />
          <span>Failed to save project. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default SaveProjectSection;
