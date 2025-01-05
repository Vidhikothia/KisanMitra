// models/Farmer.js
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  language: { type: String, enum: ['English', 'Hindi', 'Gujarati'], required: true },
  location: {
    city: String,
    state: String,
    pincode: String,
  },
  phone_number: { type: String },
  saved_videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  liked_videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  is_premium: { type: Boolean, default: false },
  subscription_date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);
