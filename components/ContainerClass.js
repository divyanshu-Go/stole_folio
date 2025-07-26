// components/ui-builder/ContainerClass.js

export default class Container {
  constructor(type = "div") {
    this.name = "New Container";
    this.container_Id = Math.random().toString(36).substr(2, 9);
    this.sectionId = "";
    this.type = type;
    this.text = "Click me";
    this.children = [null, null, null, null];

    // NEW: Link properties
    this.linkUrl = "";
    this.linkTarget = "_self"; // "_self", "_blank", "_parent", "_top"
    this.linkTitle = ""; // For accessibility/tooltip
    this.isClickable = false; // Toggle to enable/disable link functionality

    // NEW: Image properties
    this.imageUrl = "";
    this.imageAlt = "";
    this.imageMode = "none"; // "none", "background", "img"
    this.imagePosition = "center"; // for background images
    this.imageSize = "cover"; // "cover", "contain", "auto"
    this.imageRepeat = "no-repeat";

    // NEW: Icon properties
    this.iconName = ""; // Lucide icon name (e.g., "Heart", "Star", "Home")
    this.iconSize = "16"; // Icon size in pixels
    this.iconColor = "transparent"; // Icon color (inherit from container or custom)
    this.hasIcon = false; // Toggle to show/hide icon

    this.styles = {
      height: "100px",
      width: "100px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#cccccc",
      boxSizing: "border-box",
      padding: "4px",
      margin: "0px",
      backgroundColor: "#ffffff",
      color: "#000000",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
      flexWrap: "wrap",
      position: "relative",
      minHeight: "fit-content",
      // minWidth: "fit-content",
      maxWidth: "100%",
      textAlign: "center",
      textWrap: "wrap",
      wordWrap: "break-word",
      lineHeight: "1rem",
      fontSize: "0.75rem",
      fontWeight: "400",
      borderRadius: "0px",
      boxShadow: "none",
      cursor: "pointer",
      outlineOffset: "2px",
      opacity: "1",
      zIndex: "0",
      transition: "all 0.2s ease",
    };
    this.hoverStyles = {
      backgroundColor: "transparent",
      color: "transparent",
      borderColor: "transparent",
      opacity: "100",
      scale: "100",
      boxShadow: "none",
    };
    this.locked = false;
    this.hidden = false;
  }

  clone() {
    const cloned = new Container(this.type);
    cloned.container_Id = Math.random().toString(36).substr(2, 9);
    cloned.sectionId = this.sectionId;
    cloned.text = this.text;
    cloned.styles = { ...this.styles };
    cloned.hoverStyles = { ...this.hoverStyles };
    cloned.children = this.children.map((child) =>
      child ? child.clone() : null
    );
    cloned.locked = this.locked;
    cloned.hidden = this.hidden;

    // NEW: Clone link properties
    cloned.linkUrl = this.linkUrl;
    cloned.linkTarget = this.linkTarget;
    cloned.linkTitle = this.linkTitle;
    cloned.isClickable = this.isClickable;

    // NEW: Clone image properties
    cloned.imageUrl = this.imageUrl;
    cloned.imageAlt = this.imageAlt;
    cloned.imageMode = this.imageMode;
    cloned.imagePosition = this.imagePosition;
    cloned.imageSize = this.imageSize;
    cloned.imageRepeat = this.imageRepeat;

    // NEW: Clone icon properties
    cloned.iconName = this.iconName;
    cloned.iconSize = this.iconSize;
    cloned.iconColor = this.iconColor;
    cloned.hasIcon = this.hasIcon;

    return cloned;
  }

  toJSON() {
    return {
      name: this.name,
      container_Id: this.container_Id,
      sectionId: this.sectionId,
      type: this.type,
      text: this.text,
      styles: this.styles,
      hoverStyles: this.hoverStyles,
      children: this.children.map((child) => (child ? child.toJSON() : null)),
      locked: this.locked,
      hidden: this.hidden,
      // NEW: Include link properties in serialization
      linkUrl: this.linkUrl,
      linkTarget: this.linkTarget,
      linkTitle: this.linkTitle,
      isClickable: this.isClickable,

      // NEW: Include image properties
      imageUrl: this.imageUrl,
      imageAlt: this.imageAlt,
      imageMode: this.imageMode,
      imagePosition: this.imagePosition,
      imageSize: this.imageSize,
      imageRepeat: this.imageRepeat,

      // NEW: Include icon properties
      iconName: this.iconName,
      iconSize: this.iconSize,
      iconColor: this.iconColor,
      hasIcon: this.hasIcon,
    };
  }

  static fromJSON(data) {
    const container = new Container(data.type);
    container.name = data.name;
    container.container_Id = data.container_Id;
    container.sectionId = data.sectionId;
    container.text = data.text;
    container.styles = { ...container.styles, ...data.styles };
    container.hoverStyles = { ...container.hoverStyles, ...data.hoverStyles };
    container.children = data.children.map((child) =>
      child ? Container.fromJSON(child) : null
    );
    container.locked = data.locked;
    container.hidden = data.hidden;

    // NEW: Restore link properties (with defaults for backward compatibility)
    container.linkUrl = data.linkUrl || "";
    container.linkTarget = data.linkTarget || "_self";
    container.linkTitle = data.linkTitle || "";
    container.isClickable = data.isClickable || false;

    // NEW: Restore image properties
    container.imageUrl = data.imageUrl || "";
    container.imageAlt = data.imageAlt || "";
    container.imageMode = data.imageMode || "none";
    container.imagePosition = data.imagePosition || "center";
    container.imageSize = data.imageSize || "cover";
    container.imageRepeat = data.imageRepeat || "no-repeat";

    // NEW: Restore icon properties
    container.iconName = data.iconName || "";
    container.iconSize = data.iconSize || "16";
    container.iconColor = data.iconColor || "transparent";
    container.hasIcon = data.hasIcon || false;

    return container;
  }
}
