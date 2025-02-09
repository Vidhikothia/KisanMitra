const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId() 
  }, // Primary Key
  article_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article', 
    required: true 
  }, // Foreign Key linking to Article
  image_url: { 
    type: String, 
    required: true 
  }, // URL for the image
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
