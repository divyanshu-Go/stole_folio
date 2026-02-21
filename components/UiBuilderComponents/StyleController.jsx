// components/UiBuilderComponents/StyleController.jsx
"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import SaveProjectSection from "../Tabs/SaveProjectSection";
import TabNavigation from "../Tabs/TabNavigation";
import LayoutTab from "../Tabs/LayoutTab";
import TextTab from "../Tabs/TextTab";
import ColorTab from "../Tabs/ColorTab";
import BorderTab from "../Tabs/BorderTab";
import HoverTab from "../Tabs/HoverTab";
import ActionButtons from "../ActionButtons";
import LibraryTab from "../Tabs/LibraryTab";
import LinkTab from "../Tabs/LinkTab";
import ImageTab from "../Tabs/ImageTab";
import IconTab from "../Tabs/IconTab";

const tabs = [
  "Layout",
  "Text",
  "Color",
  "Border",
  "Hover",
  "Link",
  "Image",
  "Icon",
  "Library",
  "Save to Library",
];

const StyleController = ({
  container,
  onStyleChange,
  onTextChange,
  onHoverStyleChange,
  onAddChild,
  onDeleteChild,
  onCopy,
  onPaste,
  copiedContainer,
  isRootSelected,
  rootContainer,
  serializeContainer,
  deserializeContainer,
  onAddLibraryComponent,
  onLinkChange,
  onToggleClickable,
  onImageChange,
  onIconChange,
  onSectionIdChange,
  user,
}) => {
  const [activeTab, setActiveTab] = useState("Layout");
  const [projectName, setProjectName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSectionIdChange = (sectionId) =>
    onSectionIdChange(container.container_Id, sectionId);

  const handleIconChange = (property, value) =>
    onIconChange(container.container_Id, property, value);

  const handleImageChange = (property, value) =>
    onImageChange(container.container_Id, property, value);

  const handleLinkChange = (property, value) =>
    onLinkChange(container.container_Id, property, value);

  const handleToggleClickable = (containerId, isClickable) =>
    onToggleClickable(containerId, isClickable);

  const handleStyleChange = (property, value) =>
    onStyleChange(container.container_Id, property, value);

  const handleTextChange = (value) =>
    onTextChange(container.container_Id, value);

  const handleHoverChange = (property, value) =>
    onHoverStyleChange(container.container_Id, property, value);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please log in to save your project.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/containers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          containerData: serializeContainer(
            deserializeContainer(rootContainer)
          ),
          projectName: projectName || "Untitled Project",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Project saved successfully 🚀");
        setProjectName("");
      } else {
        toast.error(result.error || "Failed to save project");
        console.error("Save failed:", result.error);
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Something went wrong while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const tabProps = {
    container,
    handleStyleChange,
    handleTextChange,
    handleHoverChange,
    handleImageChange,
    handleIconChange,
    handleSectionIdChange,
  };

  return (
    <div className="p-2 space-y-4">
      {/* Active Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Content */}
      <div className="space-y-3 shadow-box p-3 rounded-sm">
        {activeTab === "Layout" && <LayoutTab {...tabProps} />}
        {activeTab === "Text" && <TextTab {...tabProps} />}
        {activeTab === "Color" && <ColorTab {...tabProps} />}
        {activeTab === "Border" && <BorderTab {...tabProps} />}
        {activeTab === "Hover" && <HoverTab {...tabProps} />}
        {activeTab === "Link" && (
          <LinkTab
            container={container}
            handleLinkChange={handleLinkChange}
            handleToggleClickable={handleToggleClickable}
          />
        )}
        {activeTab === "Image" && (
          <ImageTab
            container={container}
            handleImageChange={handleImageChange}
          />
        )}
        {activeTab === "Icon" && (
          <IconTab container={container} handleIconChange={handleIconChange} />
        )}
        {activeTab === "Save to Library" && (
          <SaveProjectSection
            isSaving={isSaving}
            onSave={handleSave}
            projectName={projectName}
            setProjectName={setProjectName}
          />
        )}
        {activeTab === "Library" && (
          <LibraryTab
            selectedContainerId={container.container_Id}
            onAddLibraryComponent={onAddLibraryComponent}
          />
        )}
      </div>

      {/* Action Buttons */}
      <ActionButtons
        container={container}
        copiedContainer={copiedContainer}
        isRootSelected={isRootSelected}
        onCopy={onCopy}
        onPaste={onPaste}
        onAddChild={onAddChild}
        onDeleteChild={onDeleteChild}
      />
    </div>
  );
};

export default StyleController;