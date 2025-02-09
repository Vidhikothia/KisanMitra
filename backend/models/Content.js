const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  content_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Primary Key
  content_type: { 
    type: String, 
    enum: ['video', 'article'], 
    required: true 
  }, // Enum for type of content
  title: { 
    type: String, 
    required: true 
  }, // Content title
  description: { 
    type: String 
  }, // Content description
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Foreign Key linking to User table
  is_premium: { 
    type: Boolean, 
    default: false 
  }, // Boolean to indicate if the content is premium
  is_standard: { 
    type: Boolean, 
    default: false 
  }, // Boolean to indicate if the content is standard
  uploaded_date: { 
    type: Date, 
    default: Date.now 
  }, // Date of content upload
  category: { 
    type: String 
  }, // Optional field to categorize the content
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
