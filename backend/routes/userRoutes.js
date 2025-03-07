const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatorController');
const upload = require('../config/multerConfig');
const protect = require('../middleware/authMiddleware');
const { updateUser, getUserById, deleteUser } = require('../controllers/userController');

router.post(
    '/create-educator',
    protect,                  
    upload.single('photo'),   
    educatorController.createEducator
);
router.put('/update', protect, updateUser); // Update user
router.get('/:id', protect, getUserById); // Get user by ID
router.delete('/delete', protect, deleteUser); // Delete user

module.exports = router;
