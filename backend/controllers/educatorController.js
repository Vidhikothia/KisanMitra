const Educator = require('../models/Educator');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const Video = require('../models/Video');
const Article = require('../models/Article');
const Content = require('../models/Content');
const User = require('../models/User'); // ✅ Import User model
const PastEducator = require('../models/PastEducator');

// Create a new educator
exports.createEducator = async (req, res) => {
    try {
        let photoUrl = null;
        const userId = req.user._id;
        const { bio } = req.body;
        console.log("Extracted userId from JWT:", userId);
        // Handle photo upload if a file is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'educators',
                use_filename: true,
                resource_type: 'auto'
            });
            photoUrl = result.secure_url;
        }

        // Create the educator object using authenticated user's ID
        const newEducator = new Educator({
            user_id: new mongoose.Types.ObjectId(userId), // Use the ID from the authenticated user
            photo: photoUrl,
            bio: bio || null
        });

        // Save the educator to the database
        const savedEducator = await newEducator.save();
        const user = await User.findById(userId);
        if (user.role !== 'Educator') {
            user.role = 'Educator';
            await user.save();
        }
        res.status(201).json({
            message: 'Educator created successfully!',
            educator: savedEducator
        });

    } catch (error) {
        console.error('Error creating educator:', error);
        res.status(500).json({
            message: 'Failed to create educator',
            error: error.message
        });
    }
};

exports.updateEducator = async (req, res) => {
    try {
        const { bio } = req.body;
        let photoUrl = null;

        const educator = await Educator.findById(req.params.id);
        if (!educator) {
            return res.status(404).json({ message: 'Educator not found' });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'educators',
                use_filename: true,
                resource_type: 'auto'
            });
            photoUrl = result.secure_url;
        }

        educator.bio = bio || educator.bio;
        educator.photo = photoUrl || educator.photo;

        const updatedEducator = await educator.save();
        res.status(200).json({ message: 'Educator updated successfully!', educator: updatedEducator });

    } catch (error) {
        console.error('Error updating educator:', error);
        res.status(500).json({ message: 'Failed to update educator', error: error.message });
    }
};

// ✅ Get Educator by ID
exports.getEducatorById = async (req, res) => {
    try {
        // Find the educator and populate user details
        const educator = await Educator.findById(req.params.id).populate('user_id', 'username email role');

        if (!educator) {
            return res.status(404).json({ message: 'Educator not found' });
        }

        // Fetch all content created by the educator
        const contentList = await Content.find({ creator: educator._id });

        // Extract content IDs
        const contentIds = contentList.map(content => content._id);

        // Fetch videos and articles based on content IDs
        const videos = await Video.find({ content_id: { $in: contentIds } }).populate('content_id', 'title description uploaded_date access_type category');
        const articles = await Article.find({ content_id: { $in: contentIds } }).populate('content_id', 'title description uploaded_date access_type category');

        res.status(200).json({
            educator,
            videos,   // List of videos uploaded by the educator
            articles  // List of articles uploaded by the educator
        });
    } catch (error) {
        console.error('Error fetching educator:', error);
        res.status(500).json({ message: 'Failed to fetch educator', error: error.message });
    }
};

exports.deleteEducator = async (req, res) => {
    try {
        const educator = await Educator.findById(req.params.id);
        if (!educator) {
            return res.status(404).json({ message: 'Educator not found' });
        }
        
        await PastEducator.create({
            user_id: educator.user_id,
            photo: educator.photo,
            bio: educator.bio,
            eduAccCreatedDate: educator.eduAccCreatedDate,
            eduAccDeletedDate: new Date(),
        });
        await Educator.findByIdAndDelete(req.params.id);

        // Update user role back to "Farmer" if deleted educator was an educator
        const user = await User.findById(educator.user_id);
        if (user && user.role === 'Educator') {
            user.role = 'Farmer';
            await user.save();
        }

        res.status(200).json({ message: 'Educator deleted successfully!' });

    } catch (error) {
        console.error('Error deleting educator:', error);
        res.status(500).json({ message: 'Failed to delete educator', error: error.message });
    }
};

exports.getAllEducators = async (req, res) => {
    try {
        // Fetch all educators and populate user details (name, email, role)
        const educators = await Educator.find().populate('user_id', 'username email');

        if (!educators || educators.length === 0) {
            return res.status(404).json({ message: "No educators found." });
        }

        res.status(200).json({ educators });
    } catch (error) {
        console.error("Error fetching educators:", error);
        res.status(500).json({ message: "Failed to fetch educators", error: error.message });
    }
};