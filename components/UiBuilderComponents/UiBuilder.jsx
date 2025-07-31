"use client";

import React, { useState } from "react";
import PreviewContainer from "@/components/UiBuilderComponents/PreviewContainer";
import StyleController from "@/components/UiBuilderComponents/StyleController";
import Container from "../ContainerClass";
import {
  cloneContainer,
  deserializeContainer,
  findContainer,
  serializeContainer,
} from "@/lib/utils/container";
import PublishModal from "../PublishModal";

export default function UIBuilder({ initialContainer }) {
  const createDefaultContainer = () => new Container();

  // Initialize rootContainer with prop or default
  const [rootContainer, setRootContainer] = useState(() => {
    if (initialContainer) {
      // Convert plain object back to Container class instance
      return Container.fromJSON(initialContainer);
    }
    return createDefaultContainer();
  });

  // Initialize selectedContainerId with the root container's ID
  const [selectedContainerId, setSelectedContainerId] = useState(() => {
    if (initialContainer) {
      return initialContainer.container_Id;
    }
    return createDefaultContainer().container_Id;
  });

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handleOpenPublishModal = () => {
    setIsPublishModalOpen(true);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  const [copiedContainer, setCopiedContainer] = useState(null);

  // Copy container function
  const copyContainer = (containerId) => {
    const containerToCopy = findContainer(rootContainer, containerId);
    if (containerToCopy) {
      setCopiedContainer(cloneContainer(containerToCopy));
    }
  };

  // Paste container function
  const pasteContainer = (parentId) => {
    if (!copiedContainer) return;

    const update = (container) => {
      if (container.container_Id === parentId) {
        const idx = container.children.findIndex((child) => child === null);
        if (idx !== -1) {
          const newChildren = [...container.children];
          // Create a fresh clone with new ID
          const pastedContainer = copiedContainer.clone();
          newChildren[idx] = pastedContainer;
          return {
            ...container,
            children: newChildren,
          };
        }
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Update container sectionId
  const updateContainerSectionId = (container_Id, sectionId) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          sectionId: sectionId,
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Add library component to selected container
  const addLibraryComponent = (parentId, libraryContainer) => {
    const update = (container) => {
      if (container.container_Id === parentId) {
        const idx = container.children.findIndex((child) => child === null);
        if (idx !== -1) {
          const newChildren = [...container.children];
          // Clone the library component with new ID
          const clonedComponent = libraryContainer.clone();
          newChildren[idx] = clonedComponent;
          return {
            ...container,
            children: newChildren,
          };
        }
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  const updateContainerIcon = (container_Id, property, value) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          [property]: value,
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  const updateContainerImage = (container_Id, property, value) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          [property]: value,
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Update container link properties
  const updateContainerLink = (container_Id, linkProperty, value) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          [linkProperty]: value,
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Toggle clickable functionality for a container
  const toggleContainerClickable = (container_Id, isClickable) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          isClickable: isClickable,
          // Clear URL when disabling clickable to avoid confusion
          linkUrl: isClickable ? container.linkUrl : "",
          linkTitle: isClickable ? container.linkTitle : "",
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Recursively updates the style of the container with given ID
  const updateContainerStyle = (container_Id, property, value) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          styles: {
            ...container.styles,
            [property]: value,
          },
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Recursively updates the text of a container by ID
  const updateContainerText = (container_Id, text) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return { ...container, text };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  const updateContainerHoverStyle = (container_Id, property, value) => {
    const update = (container) => {
      if (container.container_Id === container_Id) {
        return {
          ...container,
          hoverStyles: {
            ...container.hoverStyles,
            [property]: value,
          },
        };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Adds a child container to the parent with given ID
  const addChildContainer = (parentId) => {
    const update = (container) => {
      if (container.container_Id === parentId) {
        const newChild = new Container();
        newChild.text = "New Container";
        newChild.styles.width = "fit-content";
        newChild.styles.height = "fit-content";
        newChild.styles.backgroundColor = "#f3f4f6";

        const idx = container.children.findIndex((child) => child === null);
        if (idx !== -1) {
          const newChildren = [...container.children];
          newChildren[idx] = newChild;
          return {
            ...container,
            children: newChildren,
          };
        }
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };
    setRootContainer(update(rootContainer));
  };

  // Recursively deletes the container with given ID from the tree
  const deleteChildContainer = (containerId) => {
    if (containerId === rootContainer.container_Id) return;

    const update = (container) => {
      const idx = container.children.findIndex(
        (child) => child && child.container_Id === containerId
      );
      if (idx !== -1) {
        const newChildren = [...container.children];
        newChildren[idx] = null;
        return { ...container, children: newChildren };
      }
      return {
        ...container,
        children: container.children.map((child) =>
          child ? update(child) : null
        ),
      };
    };

    setRootContainer(update(rootContainer));

    if (containerId === selectedContainerId) {
      setSelectedContainerId(rootContainer.container_Id);
    }
  };

  const selectedContainer = findContainer(rootContainer, selectedContainerId);
  const isRootSelected = selectedContainerId === rootContainer.container_Id;

  return (
    <div className="min-h-screen bg-emerald-50 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preview Section */}
          <div className="flex flex-col bg-white rounded h-[60vh] md:h-[90vh]">
            <h2 className="text-lg text-white font-bold  py-1 rounded-t text-center bg-emerald-600">
              Preview
            </h2>
            <div className="flex-1 border border-dashed border-emerald-300 py-4 px-2 overflow-y-auto min-h-0 bg-zinc-50">
              <PreviewContainer
                container={rootContainer}
                selectedContainerId={selectedContainerId}
                onSelect={setSelectedContainerId}
              />
            </div>
          </div>

          {/* Controller Section */}
          <div className="flex flex-col bg-white rounded">
            <h2 className="text-lg text-white font-bold mb-4 py-1 rounded-t text-center bg-emerald-600">
              Controls
            </h2>
            {selectedContainer && (
              <StyleController
                container={selectedContainer}
                onStyleChange={updateContainerStyle}
                onTextChange={updateContainerText}
                onHoverStyleChange={updateContainerHoverStyle}
                onAddChild={addChildContainer}
                onDeleteChild={deleteChildContainer}
                onCopy={copyContainer}
                onPaste={pasteContainer}
                copiedContainer={copiedContainer}
                isRootSelected={isRootSelected}
                rootContainer={rootContainer}
                serializeContainer={serializeContainer}
                deserializeContainer={deserializeContainer}
                onAddLibraryComponent={addLibraryComponent}
                onLinkChange={updateContainerLink}
                onToggleClickable={toggleContainerClickable}
                onImageChange={updateContainerImage}
                onIconChange={updateContainerIcon}
                onSectionIdChange={updateContainerSectionId}
                onOpenPublishModal={handleOpenPublishModal}
              />
            )}
          </div>
        </div>
      </div>
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={handleClosePublishModal}
        rootContainer={rootContainer}
        serializeContainer={serializeContainer}
        deserializeContainer={deserializeContainer}
      />
    </div>
  );
}
