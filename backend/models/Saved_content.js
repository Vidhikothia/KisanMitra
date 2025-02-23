const mongoose = require('mongoose');

// Saved Content Schema
const savedContentSchema = new mongoose.Schema({
   // Primary Key
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Foreign Key linking to User
  content_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Content', 
    required: true 
  }, // Foreign Key linking to Content
  saved_date: { 
    type: Date, 
    default: Date.now 
  }, // Date when content was saved
}, { timestamps: true });

module.exports = mongoose.model('SavedContent', savedContentSchema);
