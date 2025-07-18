"use client"

import React, { useState } from 'react';

// Container class definition
class Container {
  constructor() {
    this.id = Math.random().toString(36).substr(2, 9);
    this.text = "Sample Text";
    this.children = [null, null, null, null]; // Max 4 containers
    this.styles = {
      height: "200px",
      width: "300px",
      border: "1px solid #ccc",
      padding: "16px",
      backgroundColor: "#ffffff",
      color: "#000000",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch"
    };
  }
}

// Preview Container Component
const PreviewContainer = ({ container, selectedContainerId, onSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(container.id);
  };

  const isSelected = container.id === selectedContainerId;

  const containerStyle = {
    ...container.styles,
    border: isSelected ? "2px solid #3b82f6" : container.styles.border,
    cursor: "pointer",
    position: "relative",
    minHeight: "fit-content",
    minWidth: "max-content"
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded">
          Selected
        </div>
      )}
      
      {container.text && !container.children.some(child => child !== null) && (
        <span>{container.text}</span>
      )}
      
      {container.children.map((child, index) => 
        child ? (
          <PreviewContainer
            key={child.id}
            container={child}
            selectedContainerId={selectedContainerId}
            onSelect={onSelect}
          />
        ) : null
      )}
    </div>
  );
};

// Style Controller Component
const StyleController = ({ container, onStyleChange, onTextChange, onAddChild, onDeleteChild, isRootSelected }) => {
  const handleStyleChange = (property, value) => {
    onStyleChange(container.id, property, value);
  };

  const handleTextChange = (value) => {
    onTextChange(container.id, value);
  };

  const canAddChild = container.children.filter(child => child !== null).length < 4;
  const isRootContainer = container.id === container.id; // We'll fix this logic

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Container Controls</h3>
        {/* Delete button - only show for non-root containers */}
        {!isRootSelected && (
          <button
            onClick={() => onDeleteChild(container.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
            title="Delete this container"
          >
            Delete
          </button>
        )}
      </div>
      
      {/* Text Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Text Content</label>
        <input
          type="text"
          value={container.text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter text..."
        />
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Width</label>
          <input
            type="text"
            value={container.styles.width}
            onChange={(e) => handleStyleChange('width', e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="300px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Height</label>
          <input
            type="text"
            value={container.styles.height}
            onChange={(e) => handleStyleChange('height', e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="200px"
          />
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium">Padding</label>
        <input
          type="text"
          value={container.styles.padding}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="16px"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Background Color</label>
          <input
            type="color"
            value={container.styles.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-full p-1 border rounded-md h-10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Text Color</label>
          <input
            type="color"
            value={container.styles.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-full p-1 border rounded-md h-10"
          />
        </div>
      </div>

      {/* Border */}
      <div>
        <label className="block text-sm font-medium">Border</label>
        <input
          type="text"
          value={container.styles.border}
          onChange={(e) => handleStyleChange('border', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="1px solid #ccc"
        />
      </div>

      {/* Flex Properties */}
      <div className="space-y-3">
        <h4 className="font-medium">Flex Layout</h4>
        
        <div>
          <label className="block text-sm font-medium">Flex Direction</label>
          <select
            value={container.styles.flexDirection}
            onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="row">Row</option>
            <option value="column">Column</option>
            <option value="row-reverse">Row Reverse</option>
            <option value="column-reverse">Column Reverse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Justify Content</label>
          <select
            value={container.styles.justifyContent}
            onChange={(e) => handleStyleChange('justifyContent', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
            <option value="center">Center</option>
            <option value="space-between">Space Between</option>
            <option value="space-around">Space Around</option>
            <option value="space-evenly">Space Evenly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Align Items</label>
          <select
            value={container.styles.alignItems}
            onChange={(e) => handleStyleChange('alignItems', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="stretch">Stretch</option>
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
            <option value="center">Center</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>
      </div>

      {/* Add Child Button */}
      {canAddChild && (
        <div className="pt-3 border-t">
          <button
            onClick={() => onAddChild(container.id)}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Child Container ({container.children.filter(child => child !== null).length}/4)
          </button>
        </div>
      )}
    </div>
  );
};

// Main UI Builder Component
const UIBuilder = () => {
  const [rootContainer, setRootContainer] = useState(new Container());
  const [selectedContainerId, setSelectedContainerId] = useState(rootContainer.id);

  // Find container by ID recursively
  const findContainer = (container, id) => {
    if (container.id === id) return container;
    
    for (let child of container.children) {
      if (child) {
        const found = findContainer(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Update container style
  const updateContainerStyle = (id, property, value) => {
    const updateContainer = (container) => {
      if (container.id === id) {
        return {
          ...container,
          styles: {
            ...container.styles,
            [property]: value
          }
        };
      }
      
      return {
        ...container,
        children: container.children.map(child => 
          child ? updateContainer(child) : null
        )
      };
    };

    setRootContainer(updateContainer(rootContainer));
  };

  // Update container text
  const updateContainerText = (id, text) => {
    const updateContainer = (container) => {
      if (container.id === id) {
        return {
          ...container,
          text
        };
      }
      
      return {
        ...container,
        children: container.children.map(child => 
          child ? updateContainer(child) : null
        )
      };
    };

    setRootContainer(updateContainer(rootContainer));
  };

  // Add child container
  const addChildContainer = (parentId) => {
    const updateContainer = (container) => {
      if (container.id === parentId) {
        const newChild = new Container();
        newChild.text = "New Container";
        newChild.styles.width = "150px";
        newChild.styles.height = "100px";
        newChild.styles.backgroundColor = "#f3f4f6";
        
        const firstEmptyIndex = container.children.findIndex(child => child === null);
        if (firstEmptyIndex !== -1) {
          const newChildren = [...container.children];
          newChildren[firstEmptyIndex] = newChild;
          return {
            ...container,
            children: newChildren
          };
        }
      }
      
      return {
        ...container,
        children: container.children.map(child => 
          child ? updateContainer(child) : null
        )
      };
    };

    setRootContainer(updateContainer(rootContainer));
  };

  // Delete child container
  const deleteChildContainer = (containerId) => {
    // Don't allow deleting the root container
    if (containerId === rootContainer.id) return;
    
    const updateContainer = (container) => {
      // Check if this container has the child to delete
      const childIndex = container.children.findIndex(child => child && child.id === containerId);
      if (childIndex !== -1) {
        const newChildren = [...container.children];
        newChildren[childIndex] = null;
        return {
          ...container,
          children: newChildren
        };
      }
      
      // Otherwise, recursively check children
      return {
        ...container,
        children: container.children.map(child => 
          child ? updateContainer(child) : null
        )
      };
    };

    setRootContainer(updateContainer(rootContainer));
    
    // If we deleted the selected container, select the root
    if (containerId === selectedContainerId) {
      setSelectedContainerId(rootContainer.id);
    }
  };

  const selectedContainer = findContainer(rootContainer, selectedContainerId);
  const isRootSelected = selectedContainerId === rootContainer.id;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">UI Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border-2 border-dashed border-gray-300 p-4 min-h-96 bg-gray-50">
              <PreviewContainer
                container={rootContainer}
                selectedContainerId={selectedContainerId}
                onSelect={setSelectedContainerId}
              />
            </div>
          </div>

          {/* Controller Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Controls</h2>
            {selectedContainer && (
              <StyleController
                container={selectedContainer}
                onStyleChange={updateContainerStyle}
                onTextChange={updateContainerText}
                onAddChild={addChildContainer}
                onDeleteChild={deleteChildContainer}
                isRootSelected={isRootSelected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIBuilder;