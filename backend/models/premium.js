const mongoose = require('mongoose');

const premiumSchema = new mongoose.Schema({
   // Primary Key
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Foreign Key linking to User
  payment_date: { 
    type: Date, 
    required: true,
    default: Date.now 
  }, // Payment date
  payment_mode: { 
    type: String, 
    enum: ['paytm', 'upipayment'], 
    required: true 
  }, // Payment mode (Enum)
  payment: { 
    type: Number, 
    required: true 
  }, // Amount paid
}, { timestamps: true });

module.exports = mongoose.model('Premium', premiumSchema);
