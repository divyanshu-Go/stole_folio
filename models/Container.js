 // models/Container.js
import mongoose from "mongoose";

// Styles schema
const stylesSchema = new mongoose.Schema(
  {
    height: String,
    width: String,
    borderWidth: String,
    borderStyle: String,
    borderColor: String,
    boxSizing: String,
    padding: String,
    margin: String,
    backgroundColor: String,
    color: String,
    display: String,
    flexDirection: String,
    justifyContent: String,
    alignItems: String,
    gap: String,
    flexWrap: String,
    position: String,
    minHeight: String,
    maxWidth: String,
    textAlign: String,
    textWrap: String,
    wordWrap: String,
    lineHeight: String,
    fontSize: String,
    fontWeight: String,
    borderRadius: String,
    boxShadow: String,
    cursor: String,
    opacity: String,
    zIndex: String,
    transform: String,
    transition: String,
  },
  { _id: false }
);

// Hover styles schema
const hoverStylesSchema = new mongoose.Schema(
  {
    backgroundColor: String,
    color: String,
    borderColor: String,
    opacity: String,
    scale: String,
    boxShadow: String,
  },
  { _id: false }
);

// Recursive container schema
const ContainerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Container" },
    container_Id: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 11),
    },
    sectionId: { type: String, default: "" },
    type: { type: String, default: "div" },
    text: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectName: { type: String, default: "Untitled Project" },
    styles: { type: stylesSchema, default: () => ({}) },
    hoverStyles: { type: hoverStylesSchema, default: () => ({}) },

    // Link properties
    linkUrl: { type: String, default: "" },
    linkTarget: {
      type: String,
      enum: ["_self", "_blank", "_parent", "_top"],
      default: "_self",
    },
    linkTitle: { type: String, default: "" },
    isClickable: { type: Boolean, default: false },

    // Image properties
    imageUrl: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    imageMode: {
      type: String,
      enum: ["none", "background", "img"],
      default: "none",
    },
    imagePosition: { type: String, default: "center" },
    imageSize: { type: String, default: "cover" },
    imageRepeat: { type: String, default: "no-repeat" },

    // Icon properties
    iconName: { type: String, default: "" },
    iconSize: { type: String, default: "16" },
    iconColor: { type: String, default: "transparent" },
    hasIcon: { type: Boolean, default: false },

    isPublished: {
      type: Boolean,
      default: false,
    },

    // Behavior
    locked: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Recursive children with validation (max 4)
ContainerSchema.add({
  children: {
    type: [ContainerSchema],
    default: [],
    validate: {
      validator: (val) => val.length <= 4,
      message: "Container can have at most 4 children",
    },
  },
});

const Container =
  mongoose.models.Container || mongoose.model("Container", ContainerSchema);

export default Container;
