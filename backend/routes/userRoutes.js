const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model from models/User
const bcrypt = require('bcrypt');

// Create a new user
router.post('/users', async (req, res) => {
  console.log('Route /api/users was hit');

  try {
    const { email, phone_number, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      email,
      phone_number,
      password: hashedPassword, // Store the hashed password
      role,
    });

    const savedUser = await newUser.save(); // Save the user to the database
    res.status(201).json(savedUser); // Respond with the saved user
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle any errors
  }
});

module.exports = router; // Export the router
