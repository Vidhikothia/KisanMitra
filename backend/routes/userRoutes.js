const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatorController');
const upload = require('../config/multerConfig');
const protect = require('../middleware/authMiddleware');

// Route to create an educator with JWT authentication and optional photo upload
router.post(
    '/create-educator',
    protect,                  // Check for valid JWT token
    upload.single('photo'),   // Handle optional photo upload
    educatorController.createEducator
);

module.exports = router;
