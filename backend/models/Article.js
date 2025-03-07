const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // Primary Key
  content_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Content', 
    required: true 
  }, // Foreign Key linking to Content table

  content: { 
    type: String, 
    maxlength: 500,
    required: true 
  }, // Full article content 

  photos: [{ 
    type: String 
  }], // Optional array to store up to 2 image URLs

}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
