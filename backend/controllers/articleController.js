const Article = require('../models/Article');
const Content = require('../models/Content');
const Educator = require('../models/Educator');
const Image = require('../models/Image');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const cloudinary = require('cloudinary').v2;

// 🆕 Upload Article
exports.uploadArticle = async (req, res) => {
    try {
        const { title, description ,category,content } = req.body;
        const userId = req.user._id;
        const content1 = req.body.content.trim(); // Remove extra spaces
        const wordCount = content1.split(/\s+/).length; // Count words
        console.log("Received files:", req.files);
        if (wordCount > 500) {
            return res.status(400).json({ message: "Content cannot exceed 500 words." });
        }
        // ✅ Find the Educator
        const educator = await Educator.findOne({ user_id: userId }).populate('user_id');
        if (!educator) return res.status(403).json({ message: "Only educators can upload articles." });

        // ✅ Save content details in Content Model
        const newContent = new Content({
            content_type: 'article',
            title,
            description,
            creator: educator._id,
            category
        });

        const savedContent = await newContent.save();
        console.log("content saved");
        // ✅ Save article details
        let savedArticle;
        try {
            const newArticle = new Article({
                content_id: savedContent._id,
                content
            });
        
            savedArticle = await newArticle.save();
            console.log("Article content saved", savedArticle._id);
        } catch (err) {
            console.error("Error saving article:", err);
            return res.status(500).json({ message: "Error saving article", error: err.message });
        }
        
        // ✅ Upload images (if any)
        let imageUrls = [];

                if (req.files && req.files.articlephoto) {
                    console.log("Received images:", req.files.articlephoto);

                    for (const file of req.files.articlephoto) {
                        try {
                            const result = await cloudinary.uploader.upload(file.path, {
                                folder: 'article_images',
                                resource_type: 'image',
                                timeout: 180000
                            });

                            console.log("Cloudinary Upload Result:", result);

                            const newImage = new Image({
                                article_id: savedArticle._id,
                                image_url: result.secure_url
                            });

                            await newImage.save();
                            console.log("Image saved to DB:", newImage);

                            imageUrls.push(result.secure_url);
                        } catch (err) {
                            console.error("Error uploading/saving image:", err);
                        }
                    }
                }

                console.log("Final image URLs:", imageUrls);

        
        // ✅ Fetch subscribers with better error handling
                const content_type = "Article";
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
        res.status(201).json({
            message: "Article uploaded successfully!",
            article: savedArticle,
            content: savedContent,
            images: imageUrls
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to upload article", error: error.message });
    }
};

// 🔍 Get Article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('content_id')
            .populate({ path: 'content_id', populate: { path: 'creator', populate: { path: 'user_id', select: 'username' } } });

        if (!article) return res.status(404).json({ message: "Article not found" });

        const images = await Image.find({ article_id: article._id });

        res.json({ article, images });
    } catch (error) {
        res.status(500).json({ message: "Error fetching article", error: error.message });
    }
};

// 🔍 Get All Articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .populate('content_id')
            .populate({ path: 'content_id', populate: { path: 'creator', populate: { path: 'user_id', select: 'username' } } });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles", error: error.message });
    }
};

// 🔍 Get Articles by Logged-in Educator
 exports.getArticlesByLoggedInEducator = async (req, res) => {
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
  
      // ✅ Step 2: Find all Article linked to this educator's Content
      const articles = await Article.find({ content_id: { $in: contentIds } })
        .populate({
          path: "content_id",
          populate: {
            path: "creator", 
            select: "user_id", // Get the User ID from Educator
            populate: { path: "user_id", select: "username email" } // Get Educator's User Info
          }
        });
  
      if (!articles.length) {
        return res.status(404).json({ message: "No articles found for this educator." });
      }
  
      res.status(200).json(articles); // ✅ Return Article linked to the educator
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
// 🔍 Get Articles by a Specific Educator
exports.getArticlesByEducatorId = async (req, res) => {
    try {
        const educatorId = req.params.educatorId;
        const articles = await Article.find()
            .populate({
                path: 'content_id',
                match: { creator: educatorId },
                populate: { path: 'creator', populate: { path: 'user_id', select: 'username' } }
            });

        res.json(articles.filter(a => a.content_id !== null));
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles", error: error.message });
    }
};

// ✏️ Update Article
exports.updateArticle = async (req, res) => {
    try {
        const { title, description, content, access_type, category } = req.body;

        // ✅ Update Article
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (!updatedArticle) return res.status(404).json({ message: "Article not found" });

        // ✅ Update associated Content entry
        await Content.findByIdAndUpdate(updatedArticle.content_id, { title, description, access_type, category }, { new: true });

        res.json({ message: "Article updated successfully", updatedArticle });
    } catch (error) {
        res.status(500).json({ message: "Error updating article", error: error.message });
    }
};

// ❌ Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) return res.status(404).json({ message: "Article not found" });

        // ✅ Delete associated images
        await Image.deleteMany({ article_id: deletedArticle._id });

        // ✅ Delete associated content entry
        await Content.findByIdAndDelete(deletedArticle.content_id);

        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting article", error: error.message });
    }
};
