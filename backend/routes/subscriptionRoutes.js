const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const subscriptionController = require('../controllers/subscriptionController');
const notificationController = require('../controllers/notificationController');

router.post('/subscribe/:educatorId', protect, subscriptionController.subscribeToEducator);
router.post('/unsubscribe/:educatorId', protect, subscriptionController.unsubscribeFromEducator);
router.get('/my-subscriptions', protect, subscriptionController.getSubscribedEducators);


router.get('/', protect, notificationController.getNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);
router.get('/subscriptionOfUser/:educatorId', protect, subscriptionController.checkSubscription);
router.get('/subscription-stats/:id', protect, subscriptionController.getSubscriptionStats);


module.exports = router;
