const Video = require('../models/Video');
const Content = require('../models/Content');
const Educator = require('../models/Educator');
const cloudinary = require('cloudinary').v2;

// 🆕 Upload Video
exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, access_type, category } = req.body;
        const userId = req.user._id; 
        console.log("Received access_type:", req.body.access_type);

        const educator = await Educator.findOne({ user_id: userId });
        if (!educator) return res.status(403).json({ message: "Only educators can upload videos." });

        if (!req.files || !req.files.video) return res.status(400).json({ message: "Video file is required." });
        if (!req.files || !req.files.thumbnail) return res.status(400).json({ message: "Thumbnail is required." });

        // ✅ Upload video to Cloudinary
        const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
            folder: 'videos',
            resource_type: 'video'
        });

        let thumbnailUrl = null;
        if (req.files.thumbnail) {
            const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
                folder: 'thumbnails',
                resource_type: 'image'
            });
            thumbnailUrl = thumbnailResult.secure_url;
        }

        // ✅ Save content
        const newContent = new Content({
            content_type: 'video',
            title,
            description,
            creator: educator._id,
            access_type,
            category
        });
        const savedContent = await newContent.save();

        // ✅ Save video data
        const newVideo = new Video({
            content_id: savedContent._id,
            video_url: videoResult.secure_url,
            thumbnail_url: thumbnailUrl
        });

        await newVideo.save();
        

        // ✅ Fetch all farmers subscribed to this educator
        // const subscribers = await Subscription.find({ educator_id: educator._id }).populate('farmer_id', 'email');

        // // ✅ Send notifications to subscribed farmers
        // subscribers.forEach(async (subscription) => {
        //     await Notification.create({
        //         farmer_id: subscription.farmer_id,
        //         message: `New ${content_type} uploaded by ${educator.user_id.username}: ${title}`,
        //     });
        // });
        
        res.status(201).json({ message: "Video uploaded successfully!", video: newVideo, content: savedContent });

    } catch (error) {
        res.status(500).json({ message: "Failed to upload video", error: error.message });
    }
};

// 🔍 Get Video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('content_id');
        if (!video) return res.status(404).json({ message: "Video not found" });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: "Error fetching video", error: error.message });
    }
};

// 🔍 Get All Videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate({
                path: 'content_id',
                populate: {
                    path: 'creator', // 'creator' field in Content links to Educator
                    populate: {
                        path: 'user_id', // 'user_id' field in Educator links to User
                        select: 'username' // Get only the username from User model
                    }
                }
            });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error: error.message });
    }
};

// ❌ Delete Video
exports.deleteVideo = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        if (!deletedVideo) return res.status(404).json({ message: "Video not found" });
        res.json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting video", error: error.message });
    }
};
exports.updateVideo = async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
        res.json({ message: "Video updated successfully", updatedVideo });
    } catch (error) {
        res.status(500).json({ message: "Error updating video", error: error.message });
    }
};