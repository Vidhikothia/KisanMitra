const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');

router.get('/', protect, notificationController.getNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
