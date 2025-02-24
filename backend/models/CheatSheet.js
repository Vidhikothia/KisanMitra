const mongoose = require('mongoose');

// Cheat Sheet Schema
const cheatSheetSchema = new mongoose.Schema({
   // Primary Key
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Foreign Key linking to User
  description: { 
    type: String, 
    required: true 
  }, // Description of the cheat sheet
  uploaded_date: { 
    type: Date, 
    default: Date.now 
  }, // Date when the cheat sheet was uploaded
}, { timestamps: true });

module.exports = mongoose.model('CheatSheet', cheatSheetSchema);
