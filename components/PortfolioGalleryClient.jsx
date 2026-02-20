"use client";

import { useState, useMemo } from "react";
import PublicPortfolioCard from "@/components/PublicPortfolioCard";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title",  label: "Title A–Z"   },
];

export default function PortfolioGalleryClient({ portfolios }) {
  const [sortBy, setSortBy] = useState("newest");

  const sorted = useMemo(() => {
    const copy = [...portfolios];
    switch (sortBy) {
      case "oldest":
        return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "title":
        return copy.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
      case "newest":
      default:
        return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [portfolios, sortBy]);

  return (
    <>
      {/* Filter/Sort Bar */}
      <div className="mb-6">
        <div className="bg-white rounded-sm shadow-box border border-neutral-300 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-neutral-300 rounded px-2 py-1 bg-white
                           focus:outline-none focus:ring-1 focus:ring-neutral-500 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-neutral-500">
              Showing {sorted.length} portfolio{sorted.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sorted.length > 0 ? (
          sorted.map((portfolio) => (
            <PublicPortfolioCard
              key={portfolio._id}
              portfolioData={portfolio}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-neutral-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              No portfolios available yet
            </h3>
            <p className="text-neutral-500 mb-4">
              Be the first to publish a portfolio to inspire others!
            </p>
            <button className="bg-neutral-800 text-white px-4 py-2 rounded-sm button-box transition-colors hover:bg-neutral-700">
              Create Your Portfolio
            </button>
          </div>
        )}
      </div>
    </>
  );
}