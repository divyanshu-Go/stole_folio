// components/ui-builder/ContainerClass.js

export default class Container {
  constructor(type = "div") {
    this.name = "New Container";
    this.container_Id = Math.random().toString(36).substr(2, 9);
    this.type = type;
    this.text = "Sample Text";
    this.children = [null, null, null, null];
    
    // NEW: Link properties
    this.linkUrl = "";
    this.linkTarget = "_self"; // "_self", "_blank", "_parent", "_top"
    this.linkTitle = ""; // For accessibility/tooltip
    this.isClickable = false; // Toggle to enable/disable link functionality
    
    this.styles = {
      height: "200px",
      width: "200px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#cccccc",
      padding: "4px",
      margin: "0px",
      backgroundColor: "#ffffff",
      color: "#000000",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.75rem",
      fontWeight: "400",
      flexWrap: "wrap",
      borderRadius: "0px",
      boxShadow: "none",
      opacity: "1",
      zIndex: "0",
    };
    this.hoverStyles = {
      backgroundColor: "#ffffff",
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
    cloned.text = this.text;
    cloned.styles = { ...this.styles };
    cloned.hoverStyles = { ...this.hoverStyles };
    cloned.children = this.children.map(child => child ? child.clone() : null);
    cloned.locked = this.locked;
    cloned.hidden = this.hidden;
    
    // NEW: Clone link properties
    cloned.linkUrl = this.linkUrl;
    cloned.linkTarget = this.linkTarget;
    cloned.linkTitle = this.linkTitle;
    cloned.isClickable = this.isClickable;
    
    return cloned;
  }

  toJSON() {
    return {
      name: this.name,
      container_Id: this.container_Id,
      type: this.type,
      text: this.text,
      styles: this.styles,
      hoverStyles: this.hoverStyles,
      children: this.children.map(child => child ? child.toJSON() : null),
      locked: this.locked,
      hidden: this.hidden,
      // NEW: Include link properties in serialization
      linkUrl: this.linkUrl,
      linkTarget: this.linkTarget,
      linkTitle: this.linkTitle,
      isClickable: this.isClickable,
    };
  }

  static fromJSON(data) {
    const container = new Container(data.type);
    container.name = data.name;
    container.container_Id = data.container_Id;
    container.text = data.text;
    container.styles = { ...container.styles, ...data.styles };
    container.hoverStyles = { ...container.hoverStyles, ...data.hoverStyles };
    container.children = data.children.map(child =>
      child ? Container.fromJSON(child) : null
    );
    container.locked = data.locked;
    container.hidden = data.hidden;
    
    // NEW: Restore link properties (with defaults for backward compatibility)
    container.linkUrl = data.linkUrl || "";
    container.linkTarget = data.linkTarget || "_self";
    container.linkTitle = data.linkTitle || "";
    container.isClickable = data.isClickable || false;
    
    return container;
  }
}
