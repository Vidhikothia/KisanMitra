const mongoose = require('mongoose');

// Cheat Sheet Schema
const schemeSchema = new mongoose.Schema({
    // Primary Key
  description: { 
    type: String, 
    required: true 
  }, // Description of the cheat sheet
  uploaded_date: { 
    type: Date, 
    default: Date.now 
  }, // Date when the cheat sheet was uploaded
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
