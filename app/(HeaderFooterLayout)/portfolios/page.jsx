// app/portfolios/page.jsx (server component)

import PortfolioCard from "@/components/PortfolioCard";
import React from "react";

const fetchPortfolios = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/portfolios`, {
      cache: "no-store", // optional: to avoid caching
    });
    const result = await response.json();

    if (!response.ok || !result.success) throw new Error("Failed");

    return result.data;
  } catch (err) {
    console.error("Failed to fetch portfolios", err);
    return null;
  }
};

export default async function PortfolioGalleryPage() {
  const portfolios = await fetchPortfolios();

  if (!portfolios) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">Failed to load portfolios</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Portfolio Gallery</h1>
          <p className="text-gray-600 mt-2">
            Discover amazing portfolios created by our community. Find inspiration and use templates for your own projects.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {portfolios.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No portfolios yet</h2>
            <p className="text-gray-500">Be the first to publish a portfolio!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio._id} portfolio={portfolio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
