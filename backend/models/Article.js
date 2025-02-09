const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  article_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId() 
  }, // Primary Key
  content_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Content', 
    required: true 
  }, // Foreign Key linking to Content table
  content: { 
    type: String, 
    required: true 
  }, // Full article content
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
