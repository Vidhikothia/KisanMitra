const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
   // Primary Key

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
    ref: 'Educator', 
    required: true 
  }, // Foreign Key linking to User table

  access_type: { 
    type: String, 
    enum: ['premium', 'standard', 'basic'],  // Ensure "basic" is in the enum list
    default: 'basic' 
  },// Access type (instead of two boolean fields)

  uploaded_date: { 
    type: Date, 
    default: Date.now 
  }, // Date of content upload

  category: { 
    type: String 
  }, // Optional field to categorize the content

}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
