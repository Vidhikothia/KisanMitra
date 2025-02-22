const Educator = require('../models/Educator');
const cloudinary = require('cloudinary').v2;

// Create a new educator
exports.createEducator = async (req, res) => {
    try {
        let photoUrl = null;

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
            user_id: req.user._id, // Use the ID from the authenticated user
            photo: photoUrl
        });

        // Save the educator to the database
        const savedEducator = await newEducator.save();

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
