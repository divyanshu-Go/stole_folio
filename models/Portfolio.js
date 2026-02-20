// models/Portfolio.js
import mongoose from "mongoose";
import Container from "./Container";

const PortfolioSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure author is always present
    },
    title: {
      type: String,
      required: [true, "Portfolio title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    url: {
      type: String,
      required: [true, "Portfolio URL is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "URL can only contain lowercase letters, numbers, and hyphens"],
      maxlength: [50, "URL cannot exceed 50 characters"],
    },
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      required: [true, "Associated container is required"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries on public portfolios sorted by creation date
PortfolioSchema.index({ isPublic: 1, createdAt: -1 });

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

export default Portfolio;
