// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  educator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Educator', required: true },
  likes_count: { type: Number, default: 0 },
  views_count: { type: Number, default: 0 },
  upload_date: { type: Date, default: Date.now },
  is_premium: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
