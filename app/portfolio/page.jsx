// app/portfolio/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

const PortfolioGallery = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolios');
      const result = await response.json();

      if (response.ok && result.success) {
        setPortfolios(result.data);
      } else {
        setError('Failed to fetch portfolios');
      }
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      setError('Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
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

      {/* Portfolio Grid */}
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
};

const PortfolioCard = ({ portfolio }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

   const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className=" rounded-lg shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow">
      {/* Iframe Section */}
      <div className=" bg-gray-100 ">
        {/* Loading overlay */}
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
          className="w-full border-0 "
          style={{
            transform: 'scale(0.8)',
            transformOrigin: 'top left',
            width: '127%',
            height: '375px',
            pointerEvents: 'none', // Disable interactions
            overflow: 'hidden'
          }}
          onLoad={() => setIframeLoaded(true)}
          title={`Preview of ${portfolio.title}`}
        />
      </div>

      {/* Info Section */}
      <div className="p-6 bg-zinc-50 -mt-20 z-50">
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
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {portfolio.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* View Portfolio Button */}
          <Link
            href={`/portfolio/${portfolio.url}`}
            target="_blank"
            className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-center text-sm font-medium"
          >
            View Portfolio
          </Link>

          {/* Use Template Button */}
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

export default PortfolioGallery;