// models/WebsiteAnalytics.js
const mongoose = require('mongoose');

const websiteAnalyticsSchema = new mongoose.Schema({
  websiteOpenedCount: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  totalEducators: { type: Number, default: 0 },
  totalContentUploads: { type: Number, default: 0 },
  contentCategories: { 
    type: Map, 
    of: Number, // Store the count of each category, e.g., {'Agriculture': 20, 'Science': 15}
    default: {}
  },
  monthlyUserStats: [{
    month: String,
    userCount: Number,
    educatorCount: Number
  }]
});

module.exports = mongoose.model('WebsiteAnalytics', websiteAnalyticsSchema);
