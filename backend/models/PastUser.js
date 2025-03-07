const mongoose = require('mongoose');

const pastUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  phone_number: { type: String, default: null },
  password: { type: String, required: true },
  role: { type: String, required: true },
  preferred_language: { type: String, required: true },
  city: { type: String, default: null },
  state: { type: String, default: null },
  isPremium: { type: Boolean, default: false },
  dateOfSubscription: { type: Date },
  accountCreatedDate: { type: Date },
  deletedAt: { type: Date, default: Date.now }, // Track deletion time
}, { timestamps: true });

const PastUser = mongoose.model('PastUser', pastUserSchema);
module.exports = PastUser;
