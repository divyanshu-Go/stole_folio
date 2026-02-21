"use client";

import React, { useState } from "react";
import ContainerCard from "@/components/ContainerCard";
import PortfolioCard from "@/components/PortfolioCard1";

const UserDashboardClient = ({ containers: initialContainers, portfolios: initialPortfolios }) => {
  const [activeTab, setActiveTab] = useState("containers");

  // Lift into local state so deletions persist across tab switches
  const [containers, setContainers] = useState(initialContainers ?? []);
  const [portfolios, setPortfolios] = useState(initialPortfolios ?? []);

  const handleContainerDelete = (id) =>
    setContainers((prev) => prev.filter((c) => c._id !== id));

  const handlePortfolioDelete = (id) =>
    setPortfolios((prev) => prev.filter((p) => p._id !== id));

  const currentData   = activeTab === "containers" ? containers : portfolios;
  const currentCount  = currentData.length;

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">My Dashboard</h1>
          <p className="text-neutral-600">Manage and organize your containers and portfolios</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-sm shadow-box border border-neutral-300 overflow-hidden">
            <div className="flex">
              {["containers", "portfolios"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-neutral-800 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {tab} ({tab === "containers" ? containers.length : portfolios.length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <div className="bg-neutral-100 rounded-sm shadow-box p-4 border border-neutral-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Total {activeTab === "containers" ? "Containers" : "Portfolios"}
                </p>
                <p className="text-2xl font-semibold text-neutral-800">{currentCount}</p>
              </div>
              <div className="text-neutral-400">
                {activeTab === "containers" ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentData.length > 0 ? (
            currentData.map((item, index) =>
              activeTab === "containers" ? (
                <ContainerCard
                  key={item._id || index}
                  containerData={item}
                  onDelete={handleContainerDelete}
                />
              ) : (
                <PortfolioCard
                  key={item._id || index}
                  portfolioData={item}
                  onDelete={handlePortfolioDelete}
                />
              )
            )
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-neutral-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                No {activeTab} yet
              </h3>
              <p className="text-neutral-500 mb-4">
                Start creating your first {activeTab === "containers" ? "container" : "portfolio"}
              </p>
              <button className="bg-neutral-800 text-white px-4 py-2 rounded-sm button-box transition-colors hover:bg-neutral-700">
                Create New {activeTab === "containers" ? "Container" : "Portfolio"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardClient;