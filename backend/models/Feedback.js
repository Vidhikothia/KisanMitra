const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // Primary Key
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Foreign Key linking to User
  type: { 
    type: String, 
    enum: ['complain', 'suggestion', 'report'], 
    required: true 
  }, // Type of feedback
  subject: { 
    type: String, 
    required: true 
  }, // Subject of feedback
  comment: { 
    type: String, 
    required: true 
  }, // Multiline comment
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
