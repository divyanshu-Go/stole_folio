"use client";

import React, { useState, useEffect } from "react";
import SmallPreviewContainer from "@/components/SmallPreviewContainer";
import Container from "@/components/ContainerClass";
import { convertToPlainObject } from "@/lib/utils/container";

const LibraryTab = ({ selectedContainerId, onAddLibraryComponent }) => {
    const [libraryComponents, setLibraryComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLibraryItem, setSelectedLibraryItem] = useState(null);


    // Fetch library components from API
    useEffect(() => {
        const fetchLibraryComponents = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/containers');
                const result = await response.json();

                if (result.success) {
                    const processedComponents = result.data.map(item => ({
                        id: item._id,
                        name: item.projectName,
                        container: Container.fromJSON(convertToPlainObject(item))
                    }));
                    setLibraryComponents(processedComponents);
                } else {
                    setError("Failed to fetch library components");
                }
            } catch (err) {
                setError("Error loading library components");
                console.error("Library fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryComponents();
    }, []);

    // Handle library item selection
    const handleLibraryItemClick = (item) => {
        setSelectedLibraryItem(item);
    };

    // Handle add to container
    const handleAddToContainer = () => {
        if (selectedLibraryItem && selectedContainerId) {
            onAddLibraryComponent(selectedContainerId, selectedLibraryItem.container);
            setSelectedLibraryItem(null); // Clear selection after adding
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">Loading library components...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Component Library</h3>
                
            </div>

            {libraryComponents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No components in library
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto py-4 ">
                    {libraryComponents.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleLibraryItemClick(item)}
                            className={`cursor-pointer transition-all duration-200 mx-auto p-1 ${selectedLibraryItem?.id === item.id
                                ? "ring-2 ring-emerald-500 bg-emerald-50 rounded-xs"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <SmallPreviewContainer container={item.container} />
                            <div className="p-2 text-center">
                                <p className="text-xs text-gray-600 truncate">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            <button
                onClick={handleAddToContainer}
                disabled={!selectedLibraryItem || !selectedContainerId}
                className={`w-full px-3 py-3 text-xs rounded transition-colors ${selectedLibraryItem && selectedContainerId
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Add to Container
            </button>
        </div>
    );
};

export default LibraryTab;