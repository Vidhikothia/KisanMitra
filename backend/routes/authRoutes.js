// authRoutes.js or inside your main route file (e.g., index.js)
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const router = express.Router();

router.post('/google/callback', async (req, res) => {
  const { tokenId } = req.body; // The tokenId sent from frontend (Google login token)

  try {
    // Verify the token by sending it to Google
    const response = await axios.post(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
    );

    const { sub, email, name } = response.data; // sub is the unique Google user ID

    // Check if the user already exists in your database
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId: sub,
        email: email,
        name: name,
        role: 'Farmer', // Set default role (you can change this logic)
      });
      await user.save(); // Save new user to the database
    }

    // Create a JWT token to authenticate the user for future requests
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token back to the frontend for user authentication
    res.json({ token });
  } catch (error) {
    // Handle errors such as invalid token, network errors, etc.
    res.status(400).json({ message: 'Google authentication failed', error: error.message });
  }
});

module.exports = router;
