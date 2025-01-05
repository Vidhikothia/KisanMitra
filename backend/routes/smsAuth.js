// routes/smsAuth.js
const express = require('express');
const twilio = require('twilio');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let verificationCode;

router.post('/send-otp', async (req, res) => {
  const { phone_number } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP

  // Send OTP using Twilio
  try {
    await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone_number,
    });

    // Save OTP for verification later (you might want to expire it after a time limit)
    verificationCode = otp;

    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { phone_number, otp } = req.body;

  // Verify OTP
  if (otp == verificationCode) {
    // OTP is correct, check if user exists
    let user = await User.findOne({ phone_number });
    if (!user) {
      user = new User({ phone_number });
      await user.save();
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
