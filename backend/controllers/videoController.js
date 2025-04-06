const Video = require('../models/Video');
const Content = require('../models/Content');
const Educator = require('../models/Educator');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const cloudinary = require('cloudinary').v2;

// 🆕 Upload Video
exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, access_type, category } = req.body;
        const userId = req.user._id;
        
        const educator = await Educator.findOne({ user_id: userId }).populate('user_id');
        if (!educator) return res.status(403).json({ message: "Only educators can upload videos." });
       

        if (!req.files || !req.files.video) return res.status(400).json({ message: "Video file is required." });
        if (!req.files || !req.files.thumbnail) return res.status(400).json({ message: "Thumbnail is required." });
       
        // ✅ Upload video to Cloudinary
        const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
            folder: 'videos',
            resource_type: 'video',
            timeout: 180000
        });

        let thumbnailUrl = null;
        if (req.files.thumbnail) {
            const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
                folder: 'thumbnails',
                resource_type: 'image',
                timeout: 180000
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
        // const savedContent = await newContent.save();
        const savedContent = await newContent.save();
        // ✅ Save video data
        const newVideo = new Video({
            content_id: savedContent._id,
            video_url: videoResult.secure_url,
            thumbnail_url: thumbnailUrl
        });

        
        await newVideo.save();
        // const content_type = "video"; // ✅ Define content_type
      
// ✅ Fetch subscribers with better error handling
        const content_type = "video";
        const subscribers = await Subscription.find({ educator_id: educator._id }).populate('farmer_id');
        console.log("No subscribers found",subscribers);
        if (!subscribers || subscribers.length === 0) {
            console.log("No subscribers found for this educator.");
        } else {
            console.log(`Found ${subscribers.length} subscribers`);

            for (const subscription of subscribers) {
                console.log("Processing notification for:", subscription.farmer_id);

                if (!subscription.farmer_id) {
                    console.warn("Skipping notification: farmer_id is missing.");
                    continue; // ❌ Prevents breaking loop on error
                }

                if (!educator.user_id || !educator.user_id.username) {
                    console.warn("Skipping notification: educator username is missing.");
                    continue;
                }

                await Notification.create({
                    farmer_id: subscription.farmer_id,
                    message: `New ${content_type} uploaded by ${educator.user_id.username}: ${title}`,
                });

                console.log("Notification sent to:", subscription.farmer_id);
            }
        }
        res.status(201).json({ message: "Video uploaded successfully!", video: newVideo, content: savedContent });

    } catch (error) {
        res.status(500).json({ message: "Failed to upload video", error: error.message });
    }
};

// 📌 Like a Video
exports.likeVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { like_count: 1 } },
            { new: true }
        );

        if (!video) return res.status(404).json({ message: "Video not found" });

        res.json({ message: "Video liked successfully", like_count: video.like_count });
    } catch (error) {
        res.status(500).json({ message: "Error liking video", error: error.message });
    }
};


// 📌 Save a Video
exports.saveVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { saved_count: 1 } },
            { new: true }
        );

        if (!video) return res.status(404).json({ message: "Video not found" });

        res.json({ message: "Video saved successfully", saved_count: video.saved_count });
    } catch (error) {
        res.status(500).json({ message: "Error saving video", error: error.message });
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

exports.getVideosByEducatorId = async (req, res) => {
    try {
      const { educatorId } = req.params; // Get educator ID from request params
  
      // Find videos where educator field matches the given ID
      const videos = await Video.find({ educator: educatorId });
  
      if (!videos || videos.length === 0) {
        return res.status(404).json({ message: "No videos found for this educator." });
      }
  
      res.status(200).json(videos); // Send response with videos
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  exports.getVideosByLoggedInEducator = async (req, res) => {
    try {
      const educatorId = req.decoded.educatorId;
      if (!educatorId) {
        return res.status(400).json({ message: "Educator ID is missing in token." });
      }
  
      // ✅ Step 1: Find all Content created by this educator
      const educatorContent = await Content.find({ creator: educatorId }).select("_id");
      
      if (!educatorContent.length) {
        return res.status(404).json({ message: "No content found for this educator." });
      }
  
      // Extract content IDs
      const contentIds = educatorContent.map(content => content._id);
  
      // ✅ Step 2: Find all Videos linked to this educator's Content
      const videos = await Video.find({ content_id: { $in: contentIds } })
        .populate({
          path: "content_id",
          populate: {
            path: "creator", 
            select: "user_id", // Get the User ID from Educator
            populate: { path: "user_id", select: "username email" } // Get Educator's User Info
          }
        });
  
      if (!videos.length) {
        return res.status(404).json({ message: "No videos found for this educator." });
      }
  
      res.status(200).json(videos); // ✅ Return videos linked to the educator
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  