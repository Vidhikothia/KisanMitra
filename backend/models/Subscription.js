const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscription_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: () => new mongoose.Types.ObjectId() 
  }, // Primary Key
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

module.exports = mongoose.model('Subscription', subscriptionSchema);
