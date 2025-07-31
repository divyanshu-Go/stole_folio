"use client";
import React, { useState } from "react";
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
  onOpenPublishModal,
}) => {
  const [activeTab, setActiveTab] = useState("Layout");
  const [projectName, setProjectName] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
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
    setIsSaving(true);
    setSaveStatus("");
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
      setSaveStatus(response.ok ? "success" : "error");
      if (!response.ok) console.error("Save failed:", result.error);
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(""), 3000);
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
    <div className="p-3 bg-zinc-50 rounded-lg">
      <SaveProjectSection
        isSaving={isSaving}
        saveStatus={saveStatus}
        onSave={handleSave}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <div className="mb-4 p-3 bg-white rounded border border-emerald-200">
        <button
          onClick={onOpenPublishModal}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Publish Portfolio
        </button>
      </div>
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="space-y-3">
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
        {activeTab === "Library" && (
          <LibraryTab
            selectedContainerId={container.container_Id}
            onAddLibraryComponent={onAddLibraryComponent}
          />
        )}
      </div>

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
