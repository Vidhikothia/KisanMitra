const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  phone_number: { type: String,default: null},
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Educator', 'Farmer'], required: true },
  preferred_language: { type: String, enum: ['English', 'Hindi', 'Gujarati'], required: true },
  country: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  isPremium: { type: Boolean, default: false },
  dateOfSubscription: { type: Date }, // This field will remain empty if not subscribed
  accountCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Create the User model using the userSchema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
