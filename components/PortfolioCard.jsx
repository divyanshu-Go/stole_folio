"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Loader from "./Loader";
import ContainerRenderer from "./ContainerRenderer"; // Import the JSX renderer
import Container from "@/lib/utils/ContainerClass"; // Import Container class

const PortfolioCard = ({ portfolio }) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  
  // Convert the container data to Container instance
  const containerInstance = portfolio.containerId;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Simulate loading for consistency (since JSX renders instantly)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 100); // Small delay to show loader briefly

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full md:max-w-[500px] rounded-lg shadow-box hover-box
     bg-neutral-100 border border-neutral-200 overflow-hidden">
      
      {/* JSX Preview using ContainerRenderer */}
      <div className="relative bg-neutral-100 h-[300px] overflow-hidden">
        {!isContentLoaded && <Loader />}

        <div 
          className="w-full h-full"
          style={{
            transform: "scale(0.5)", // Reduced to half size as requested
            transformOrigin: "top left", // Origin at top-left corner
            width: "200%", // Double width to accommodate scaling
            height: "200%", // Double height to accommodate scaling
            pointerEvents: "none", // Disable interactions in preview
            overflow: "hidden", // Clip extra content
          }}
        >
          {isContentLoaded && (
            <ContainerRenderer 
              container={containerInstance}
            />
          )}
        </div>

        {/* Loading overlay */}
        {!isContentLoaded && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>

      {/* Portfolio Info */}
      <div className="p-6 bg-neutral-50 -mt-20 relative z-10">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            {portfolio.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-neutral-700 mb-3">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>by {portfolio.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(portfolio.createdAt)}</span>
            </div>
          </div>
          {portfolio.description && (
            <p className="text-neutral-700 mt-3 text-sm leading-relaxed">
              {portfolio.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/portfolio/${portfolio.url}`}
            target="_blank"
            className="flex-1 px-4 py-2 bg-neutral-200 text-neutral-900 rounded-md flex items-center
            hover:bg-neutral-300 action-btn-box transition-colors text-center text-sm font-medium"
          >
            View Portfolio
          </Link>
          <Link
            href={`/ui-builder/${containerInstance._id}`}
            className="flex-1 px-4 py-2  text-neutral-50 rounded-md flex items-center
             button-box text-center text-sm font-medium"
          >
            Use This Template
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;