const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phone_number: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Educator', 'Farmer'], required: true },
  googleId: { type: String }, // To store the google OAuth ID if Google login is used
  isLoggedIn: { type: Boolean, default: false }, // Track whether the user is logged in
}, { timestamps: true });

// Create the User model using the userSchema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
