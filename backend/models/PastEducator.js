const mongoose = require('mongoose');

const pastEducatorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  photo: { type: String, default: null },
  bio: { type: String, maxlength: 500, default: null }, 
  eduAccCreatedDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('PastEducator', pastEducatorSchema);
