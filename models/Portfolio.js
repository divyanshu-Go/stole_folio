// models/Portfolio.js
import Container from './Container';
import mongoose from 'mongoose';


const PortfolioSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'URL can only contain lowercase letters, numbers, and hyphens'],
    maxlength: 50
  },
  containerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container',
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster URL lookups
PortfolioSchema.index({ url: 1 });
PortfolioSchema.index({ isPublic: 1, createdAt: -1 });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
export default Portfolio;