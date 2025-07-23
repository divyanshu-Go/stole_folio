import Container from "@/components/ContainerClass";

// Updated cloneContainer function
export function cloneContainer(container) {
  const cloned = new Container(container.type);
  cloned.container_Id = Math.random().toString(36).substr(2, 9);
  cloned.text = container.text;
  cloned.styles = { ...container.styles };
  cloned.hoverStyles = { ...container.hoverStyles };
  cloned.locked = container.locked;
  cloned.hidden = container.hidden;
  // NEW: Clone link properties
  cloned.linkUrl = container.linkUrl;
  cloned.linkTarget = container.linkTarget;
  cloned.linkTitle = container.linkTitle;
  cloned.isClickable = container.isClickable;
  cloned.children = container.children.map((child) =>
    child ? cloneContainer(child) : null
  );
  // NEW: Add image properties
  (cloned.imageUrl = container.imageUrl),
    (cloned.imageAlt = container.imageAlt),
    (cloned.imageMode = container.imageMode),
    (cloned.imagePosition = container.imagePosition),
    (cloned.imageSize = container.imageSize),
    (cloned.imageRepeat = container.imageRepeat),
    // NEW: Clone icon properties
    (cloned.iconName = container.iconName),
    (cloned.iconSize = container.iconSize),
    (cloned.iconColor = container.iconColor),
    (cloned.hasIcon = container.hasIcon);
  return cloned;
}

// Updated convertToPlainObject function
export function convertToPlainObject(doc) {
  if (!doc) return null;
  return {
    name: doc.name,
    container_Id: doc.container_Id,
    type: doc.type,
    text: doc.text,
    styles: doc.styles || {},
    hoverStyles: doc.hoverStyles || {},
    children: doc.children
      ? doc.children.map((child) => convertToPlainObject(child))
      : [null, null, null, null],
    locked: doc.locked || false,
    hidden: doc.hidden || false,
    // Link properties
    linkUrl: doc.linkUrl || "",
    linkTarget: doc.linkTarget || "_self",
    linkTitle: doc.linkTitle || "",
    isClickable: doc.isClickable || false,
    // NEW: Add image properties
    imageUrl: doc.imageUrl || "",
    imageAlt: doc.imageAlt || "",
    imageMode: doc.imageMode || "none",
    imagePosition: doc.imagePosition || "center",
    imageSize: doc.imageSize || "cover",
    imageRepeat: doc.imageRepeat || "no-repeat",
    // NEW: Include icon properties
    iconName: doc.iconName || "",
    iconSize: doc.iconSize || "16",
    iconColor: doc.iconColor || "transparent",
    hasIcon: doc.hasIcon || false,
  };
}

export function serializeContainer(container) {
  return container.toJSON();
}

export function deserializeContainer(data) {
  return Container.fromJSON(data);
}

// Recursively find container by ID
export function findContainer(container, container_Id) {
  if (container.container_Id === container_Id) return container;
  for (let child of container.children) {
    if (child) {
      const found = findContainer(child, container_Id);
      if (found) return found;
    }
  }
  return null;
}
