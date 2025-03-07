const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  photo: { type: String, default: null },
  bio: { type: String, maxlength: 500, default: null }, // Allow educators to add a bio (max 500 characters)
  eduAccCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Educator', educatorSchema);
