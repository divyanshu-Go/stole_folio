"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import PreviewContainer from "@/components/UiBuilderComponents/PreviewContainer";
import StyleController from "@/components/UiBuilderComponents/StyleController";
import Container from "../../lib/utils/ContainerClass";
import {
  cloneContainer,
  deserializeContainer,
  findContainer,
  serializeContainer,
} from "@/lib/utils/container";
import PublishModal from "../PublishModal";
import { Upload } from "lucide-react";

export default function UIBuilder({ initialContainer, user }) {
  
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
    return rootContainer.container_Id;
  });

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handleOpenPublishModal = () => {
    if (!user) {
      toast.error("Please log in to publish your portfolio.");
      return;
    }
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
    <div className="min-h-screen bg-neutral-50 p-3 ">
      <div className="max-w-[100rem] w-full mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
          {/* Preview Section */}
          <div className="b flex flex-col bg-neutral-100 rounded-sm h-[60vh] md:col-span-3 md:h-[100vh] shadow-box">
            <h2 className="text-lg text-neutral-100 font-bold  py-1 rounded-t-sm text-center bg-neutral-800">
              Preview
            </h2>
            <div className="flex-1 border-[0.5px] border-dashed border-neutral-400 py-6 px-2 overflow-y-auto min-h-0 bg-neutral-100">
              <PreviewContainer
                container={rootContainer}
                selectedContainerId={selectedContainerId}
                onSelect={setSelectedContainerId}
              />
            </div>
            <div className="p-3 bg-neutral-50 rounded-sm shadow-box">
                  <button
                    onClick={handleOpenPublishModal}
                    className="w-full bg-neutral-800 text-white py-2 px-4 rounded button-box transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    Publish Portfolio
                  </button>
            </div>
          </div>


          {/* Controller Section */}
          <div className="flex flex-col bg-neutral-100 rounded-sm md:col-span-2 shadow-box">
            <h2 className="text-lg text-neutral-100 font-bold py-1 rounded-t-sm text-center bg-neutral-800">
              Controls
            </h2>
            <div className="p-2 rounded-sm bg-neutral-100">
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
                user={user}
              />
            )}
            </div>
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