"use client";
import React, { useState } from "react";
import SaveProjectSection from "./SaveProjectSection";
import TabNavigation from "./TabNavigation";
import LayoutTab from "./Tabs/LayoutTab";
import TextTab from "./Tabs/TextTab";
import ColorTab from "./Tabs/ColorTab";
import BorderTab from "./Tabs/BorderTab";
import HoverTab from "./Tabs/HoverTab";
import ActionButtons from "./ActionButtons";
import LibraryTab from "./Tabs/LibraryTab";

const tabs = ["Layout", "Text", "Color", "Border", "Hover", "Library"];

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
  onAddLibraryComponent
}) => {
  const [activeTab, setActiveTab] = useState("Layout");
  const [projectName, setProjectName] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleStyleChange = (property, value) =>
    onStyleChange(container.container_Id, property, value);

  const handleTextChange = (value) =>
    onTextChange(container.container_Id, value);

  const handleHoverChange = (property, value) => 
    onHoverStyleChange(container.container_Id, property, value);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('');
    try {
      const response = await fetch('/api/containers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          containerData: serializeContainer(deserializeContainer(rootContainer)),
          projectName: projectName || 'Untitled Project',
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
  };

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <SaveProjectSection
        isSaving={isSaving}
        saveStatus={saveStatus}
        onSave={handleSave}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="space-y-3">
        {activeTab === "Layout" && <LayoutTab {...tabProps} />}
        {activeTab === "Text" && <TextTab {...tabProps} />}
        {activeTab === "Color" && <ColorTab {...tabProps} />}
        {activeTab === "Border" && <BorderTab {...tabProps} />}
        {activeTab === "Hover" && <HoverTab {...tabProps} />}
        {activeTab === "Library" && <LibraryTab selectedContainerId={container.container_Id} onAddLibraryComponent={onAddLibraryComponent}/>}
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
