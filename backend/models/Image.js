const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
   // Primary Key
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
