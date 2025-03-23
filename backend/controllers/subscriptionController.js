const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Educator = require('../models/Educator');

// ✅ Subscribe to an Educator
exports.subscribeToEducator = async (req, res) => {
    try {
        const farmerId = req.user._id; // Get farmer ID from token
        const { educator_id } = req.body;

        // Check if already subscribed
        const existingSubscription = await Subscription.findOne({ farmer_id: farmerId, educator_id });

        if (existingSubscription) {
            if (existingSubscription.status === "Subscribed") {
                return res.status(400).json({ message: "Already subscribed!" });
            } else {
                // Reactivate old subscription
                existingSubscription.status = "Subscribed";
                existingSubscription.subscribed_at = new Date();
                existingSubscription.unsubscribed_at = null; // Reset unsubscription date
                await existingSubscription.save();
                return res.status(200).json({ message: "Re-subscribed successfully", subscription: existingSubscription });
            }
        }

        // Create new subscription
        const newSubscription = new Subscription({ farmer_id: farmerId, educator_id });
        await newSubscription.save();

        res.status(201).json({ message: "Subscribed successfully", subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ message: "Error subscribing", error: error.message });
    }
};

// ✅ Unsubscribe from an Educator
exports.unsubscribeFromEducator = async (req, res) => {
    try {
        const farmerId = req.user._id;
        const { educator_id } = req.body;

        // Check if subscription exists
        const subscription = await Subscription.findOne({ farmer_id: farmerId, educator_id });

        if (!subscription || subscription.status === "Unsubscribed") {
            return res.status(400).json({ message: "You are not subscribed to this educator." });
        }

        // Mark as unsubscribed
        subscription.status = "Unsubscribed";
        subscription.unsubscribed_at = new Date();
        await subscription.save();

        res.status(200).json({ message: "Unsubscribed successfully", subscription });
    } catch (error) {
        res.status(500).json({ message: "Error unsubscribing", error: error.message });
    }
};

// ✅ Get all Educators a Farmer is Subscribed To
exports.getSubscribedEducators = async (req, res) => {
    try {
        const farmerId = req.user._id;

        const subscriptions = await Subscription.find({ farmer_id: farmerId }).populate('educator_id', 'user_id')
            .populate({ path: 'educator_id', populate: { path: 'user_id', select: 'username email' } });

        res.json({ subscriptions });

    } catch (error) {
        res.status(500).json({ message: "Error fetching subscriptions", error: error.message });
    }
};

// ✅ Get Subscription Stats for an Educator
exports.getSubscriptionStats = async (req, res) => {
    try {
        const educatorId = req.params.id;

        // Count current subscribers
        const currentSubscribers = await Subscription.countDocuments({ educator_id: educatorId, status: "Subscribed" });

        // Count unsubscribed users
        const unsubscribers = await Subscription.find({ educator_id: educatorId, status: "Unsubscribed" })
                                                .select('farmer_id unsubscribed_at')
                                                .populate('farmer_id', 'username email');

        res.status(200).json({
            total_subscribers: currentSubscribers,
            total_unsubscribers: unsubscribers.length,
            unsubscribers: unsubscribers 
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching subscription stats", error: error.message });
    }
};
