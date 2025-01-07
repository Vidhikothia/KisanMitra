const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true }, // Primary key
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  adminAccCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Admin', adminSchema);
