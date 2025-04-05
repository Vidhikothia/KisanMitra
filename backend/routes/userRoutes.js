const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatorController');
const upload = require('../config/multerConfig');
const protect = require('../middleware/authMiddleware');
const { updateUser, getUserById, deleteUser } = require('../controllers/userController');
const subscriptionRoutes = require("./subscriptionRoutes");

//educators
router.post(
    '/create-educator',
    protect,                  
    upload.single('photo'),   
    educatorController.createEducator
);
router.put(
    '/update-educator/:id',
    protect, 
    upload.single('photo'),
    educatorController.updateEducator 
);
router.get('/all-educators', educatorController.getAllEducators);
router.get('/get-educator/:id', protect, educatorController.getEducatorById);
router.delete('/delete-educator/:id', protect, educatorController.deleteEducator);
router.get('/profile-photo/:id', educatorController.getEducatorProfilePhoto);

//normal users
router.put('/update', protect, updateUser); // Update user
router.get('/:id', protect, getUserById); // Get user by ID
router.delete('/delete', protect, deleteUser); // Delete user


// Subscriptions ✅ Add subscription routes
router.use("/subscriptions", subscriptionRoutes);
module.exports = router;
