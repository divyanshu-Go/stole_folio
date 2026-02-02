// lib/utils/ContainerClass.js

export default class Container {
  constructor(type = "div") {
    this.name = "Container";
    this.container_Id = Math.random().toString(36).substr(2, 9);
    this.sectionId = "";
    this.type = type;
    this.text = "Click me";
    this.projectName = "Untitled Project";
    this.author = null; // can be null, safer than string placeholder
    this.children = [null, null, null, null]; // max 4 children

    // Link properties
    this.linkUrl = "";
    this.linkTarget = "_self"; 
    this.linkTitle = "";
    this.isClickable = false;

    // Image properties
    this.imageUrl = "";
    this.imageAlt = "";
    this.imageMode = "none";
    this.imagePosition = "center";
    this.imageSize = "cover";
    this.imageRepeat = "no-repeat";

    // Icon properties
    this.iconName = "";
    this.iconSize = "16";
    this.iconColor = "transparent";
    this.hasIcon = false;

    // Styles
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
      maxWidth: "100%",
      textAlign: "center",
      wordWrap: "break-word",
      lineHeight: "1rem",
      fontSize: "0.75rem",
      fontWeight: "400",
      borderRadius: "0px",
      boxShadow: "none",
      cursor: "pointer",
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
    cloned.name = this.name;
    cloned.container_Id = Math.random().toString(36).substr(2, 9);
    cloned.sectionId = this.sectionId;
    cloned.text = this.text;
    cloned.projectName = this.projectName;
    cloned.author = this.author;
    cloned.styles = { ...this.styles };
    cloned.hoverStyles = { ...this.hoverStyles };
    cloned.children = this.children.map((child) =>
      child ? child.clone() : null
    );
    cloned.locked = this.locked;
    cloned.hidden = this.hidden;

    // Link
    cloned.linkUrl = this.linkUrl;
    cloned.linkTarget = this.linkTarget;
    cloned.linkTitle = this.linkTitle;
    cloned.isClickable = this.isClickable;

    // Image
    cloned.imageUrl = this.imageUrl;
    cloned.imageAlt = this.imageAlt;
    cloned.imageMode = this.imageMode;
    cloned.imagePosition = this.imagePosition;
    cloned.imageSize = this.imageSize;
    cloned.imageRepeat = this.imageRepeat;

    // Icon
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
      projectName: this.projectName,
      author: this.author,
      styles: this.styles,
      hoverStyles: this.hoverStyles,
      children: this.children.map((child) => (child ? child.toJSON() : null)),
      locked: this.locked,
      hidden: this.hidden,
      linkUrl: this.linkUrl,
      linkTarget: this.linkTarget,
      linkTitle: this.linkTitle,
      isClickable: this.isClickable,
      imageUrl: this.imageUrl,
      imageAlt: this.imageAlt,
      imageMode: this.imageMode,
      imagePosition: this.imagePosition,
      imageSize: this.imageSize,
      imageRepeat: this.imageRepeat,
      iconName: this.iconName,
      iconSize: this.iconSize,
      iconColor: this.iconColor,
      hasIcon: this.hasIcon,
    };
  }

  static fromJSON(data) {
    const container = new Container(data.type);
    container.name = data.name || "Container";
    container.container_Id = data.container_Id || Math.random().toString(36).substr(2, 9);
    container.sectionId = data.sectionId || "";
    container.text = data.text || "Click me";
    container.author = data.author || null;
    container.projectName = data.projectName || "Untitled Project";
    container.styles = { ...container.styles, ...(data.styles || {}) };
    container.hoverStyles = { ...container.hoverStyles, ...(data.hoverStyles || {}) };
    container.children = Array.isArray(data.children)
      ? data.children.map((child) => (child ? Container.fromJSON(child) : null))
      : [null, null, null, null];
    container.locked = data.locked || false;
    container.hidden = data.hidden || false;

    // Link
    container.linkUrl = data.linkUrl || "";
    container.linkTarget = data.linkTarget || "_self";
    container.linkTitle = data.linkTitle || "";
    container.isClickable = data.isClickable || false;

    // Image
    container.imageUrl = data.imageUrl || "";
    container.imageAlt = data.imageAlt || "";
    container.imageMode = data.imageMode || "none";
    container.imagePosition = data.imagePosition || "center";
    container.imageSize = data.imageSize || "cover";
    container.imageRepeat = data.imageRepeat || "no-repeat";

    // Icon
    container.iconName = data.iconName || "";
    container.iconSize = data.iconSize || "16";
    container.iconColor = data.iconColor || "transparent";
    container.hasIcon = data.hasIcon || false;

    return container;
  }
}
