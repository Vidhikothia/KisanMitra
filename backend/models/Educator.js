// models/Educator.js
const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  degree: { type: String },
  photo: { type: String },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }],
  uploaded_videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  cheat_sheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CheatSheet' }],
}, { timestamps: true });

module.exports = mongoose.model('Educator', educatorSchema);
