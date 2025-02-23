const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  adminAccCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Admin', adminSchema);
