// models/WebsiteAnalytics.js
const mongoose = require('mongoose');

const websiteAnalyticsSchema = new mongoose.Schema({
  websiteOpenedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('WebsiteAnalytics', websiteAnalyticsSchema);
