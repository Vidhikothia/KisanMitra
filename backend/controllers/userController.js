const User = require('../models/User');
const PastUser = require('../models/PastUser');

// ✅ 1. Update User
exports.updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateFields = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// ✅ 2. Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// ✅ 3. Delete User (Move to PastUser before deletion)
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Move user data to PastUser collection
        await PastUser.create({
            username: user.username, 
            email: user.email,
            phone_number: user.phone_number,
            password: user.password,
            role: user.role,
            preferred_language: user.preferred_language,
            city: user.city,
            state: user.state,
            isPremium: user.isPremium,
            dateOfSubscription: user.dateOfSubscription,
            accountCreatedDate: user.accountCreatedDate,
        });

        // Delete user from the Users table
        await User.findByIdAndDelete(userId);

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting account", error: error.message });
    }
};
