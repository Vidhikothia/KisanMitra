const Notification = require('../models/Notification');

// ✅ Get Notifications for a Farmer
exports.getNotifications = async (req, res) => {
    try {
        const farmerId = req.user._id;
        const notifications = await Notification.find({ farmer_id: farmerId }).sort({ created_at: -1 });
        res.json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

// ✅ Mark Notification as Read
exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.json({ message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error: error.message });
    }
};
