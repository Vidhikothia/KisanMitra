const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  educator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Educator', required: true },
  subscribed_at: { type: Date, default: Date.now }, // When user subscribed
  unsubscribed_at: { type: Date, default: null }, // When user unsubscribed (null if still subscribed)
  status: { type: String, enum: ['Subscribed', 'Unsubscribed'], default: 'Subscribed' } // Track status
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
