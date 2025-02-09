const mongoose = require('mongoose');

// Cheat Sheet Schema
const schemeSchema = new mongoose.Schema({
    scheme_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId() 
  }, // Primary Key
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
