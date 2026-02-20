"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, User, ExternalLink, Copy, Eye, MoreVertical } from "lucide-react";
import ContainerRenderer from "@/components/ContainerRenderer";
import Container from "@/lib/utils/ContainerClass";

const PublicPortfolioCard = ({ portfolioData }) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef(null);

  const containerData = portfolioData?.containerId;
  const container = containerData ? Container.fromJSON(containerData) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowActions(false);
      }
    };
    if (showActions) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showActions]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleUseTemplate = () => {
    window.location.href = `/ui-builder/${containerData?._id}`;
  };

  const handleViewLive = () => {
    window.open(`/portfolio/${portfolioData.url}`, "_blank");
  };

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
    <div className="bg-neutral-100 rounded-sm shadow-box border border-neutral-300 overflow-hidden hover:shadow-lg transition-shadow duration-200">

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
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-neutral-800 mb-1 truncate text-sm">
              {portfolioData.title || "Untitled Portfolio"}
            </h3>
            <p className="text-xs text-neutral-500 truncate mb-1">
              {portfolioData.description || "No description"}
            </p>

            {/* Author & Date */}
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-1">
                <User size={10} />
                <span>{portfolioData.author?.name || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={10} />
                <span>{formatDate(portfolioData.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Three-dot menu — darker */}
          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 rounded transition-colors"
              aria-label="More options"
            >
              <MoreVertical size={15} />
            </button>

            {showActions && (
              <div className="absolute right-0 top-8 bg-neutral-800 border border-neutral-700 rounded-sm shadow-lg py-1 z-10 min-w-[150px]">
                <button
                  onClick={() => { handleViewLive(); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <ExternalLink size={12} />
                  Open Portfolio
                </button>
                <button
                  onClick={() => { handleUseTemplate(); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Copy size={12} />
                  Use as Template
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions — Use Template (left, half width) | View Live (right, half width) */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleUseTemplate}
            className="flex-1 bg-blue-600 text-neutral-100 hover:bg-neutral-900
                       px-3 py-1.5 rounded-sm text-xs font-medium action-btn-box transition-colors
                       flex items-center justify-center gap-1.5"
          >
            <Copy size={11} />
            Use Template
          </button>
          <button
            onClick={handleViewLive}
            className="flex-1 bg-neutral-800 text-white hover:bg-neutral-900
                       px-3 py-1.5 rounded-sm text-xs font-medium button-box transition-colors
                       flex items-center justify-center gap-1.5"
          >
            <Eye size={11} />
            View Live
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-2 pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 truncate">
            ID: {containerData.container_Id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolioCard;