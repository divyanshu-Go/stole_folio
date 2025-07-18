import Container from "@/components/ContainerClass";

// Clone container recursively
export function cloneContainer(container) {
  const cloned = new Container(container.type);
  cloned.container_Id = Math.random().toString(36).substr(2, 9);
  cloned.text = container.text;
  cloned.styles = { ...container.styles };
  cloned.hoverStyles = { ...container.hoverStyles };
  cloned.locked = container.locked;
  cloned.hidden = container.hidden;
  cloned.children = container.children.map(child => child ? cloneContainer(child) : null);
  return cloned;
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


export function convertToPlainObject(doc){
  if (!doc) return null;

  return {
    name: doc.name,
    container_Id: doc.container_Id,
    type: doc.type,
    text: doc.text,
    styles: doc.styles || {},
    hoverStyles: doc.hoverStyles || {},
    children: doc.children ? doc.children.map(child => convertToPlainObject(child)) : [null, null, null, null],
    locked: doc.locked || false,
    hidden: doc.hidden || false
  };
};