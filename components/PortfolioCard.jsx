"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

const PortfolioCard = ({ portfolio }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className=" w-full lg:w-[600px] md:w-[400px] rounded-md shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow">
      {/* Iframe */}
      <div className="relative bg-gray-100">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading preview...</p>
            </div>
          </div>
        )}
        <iframe
          src={`/portfolio/${portfolio.url}`}
          className="w-full border-0"
          style={{
            transform: "scale(0.8)",
            transformOrigin: "top left",
            width: "125%",
            height: "375px",
            pointerEvents: "none",
            overflow: "hidden",
          }}
          onLoad={() => setIframeLoaded(true)}
          title={`Preview of ${portfolio.title}`}
        />
      </div>

      {/* Info */}
      <div className="p-6 bg-zinc-50 -mt-20  relative">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{portfolio.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>by {portfolio.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(portfolio.createdAt)}</span>
            </div>
          </div>
          {portfolio.description && (
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">{portfolio.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/portfolio/${portfolio.url}`}
            target="_blank"
            className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-center text-sm font-medium"
          >
            View Portfolio
          </Link>
          <Link
            href={`/ui-builder/${portfolio.containerId}`}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center text-sm font-medium"
          >
            Use This Template
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
