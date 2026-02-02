"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ExternalLink, Copy, Eye } from "lucide-react";
import ContainerRenderer from "@/components/ContainerRenderer";
import Container from "@/lib/utils/ContainerClass";

const PublicPortfolioCard = ({ portfolioData }) => {
  const [showActions, setShowActions] = useState(false);

  // Extract container data from the nested containerId object
  const containerData = portfolioData?.containerId;
  const container = containerData ? Container.fromJSON(containerData) : null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleCopyTemplate = () => {
    // Navigate to template usage
    window.location.href = `/ui-builder/${containerData?._id}`;
  };

  const handleViewPortfolio = () => {
    // Open portfolio in new tab
    window.open(`/portfolio/${portfolioData.url}`, '_blank');
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-800 mb-1 truncate text-sm">
              {portfolioData.title || "Untitled Portfolio"}
            </h3>
            <p className="text-xs text-neutral-500 truncate mb-1">
              {portfolioData.description || "No description"}
            </p>
            
            {/* Author & Date Info */}
            <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
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

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>

            {showActions && (
              <div className="absolute right-0 top-8 bg-white border border-neutral-300 rounded-sm shadow-lg py-1 z-10 min-w-[140px]">
                <button
                  onClick={handleViewPortfolio}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <ExternalLink size={12} />
                  Open Portfolio
                </button>
                <button
                  onClick={handleCopyTemplate}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Copy size={12} />
                  Use as Template
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleViewPortfolio}
            className="flex-1 bg-neutral-800 text-white px-3 py-1.5 rounded-sm text-sm button-box transition-colors flex items-center justify-center gap-1"
          >
            <Eye size={12} />
            View
          </button>
          <button
            onClick={handleCopyTemplate}
            className="px-3 py-1.5 rounded-sm text-md font-bold action-btn-box text-blue-600 bg-blue-200 transition-colors flex items-center justify-center"
          >
            <Copy size={12} />
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-2 pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-400">
            Template ID: {containerData.container_Id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolioCard;