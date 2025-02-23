const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
   // Primary Key
  content_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Content', 
    required: true 
  }, // Foreign Key linking to Content table
  view_count: { 
    type: Number, 
    default: 0 
  }, // Number of times the video has been viewed
  like_count: { 
    type: Number, 
    default: 0 
  }, // Number of likes on the video
  saved_count: { 
    type: Number, 
    default: 0 
  }, // Number of times the video has been saved
  video_url: { 
    type: String, 
    required: true 
  }, // URL pointing to the video file
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
