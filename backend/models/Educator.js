const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  educator_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true }, // Primary key
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  photo: { type: String },
  eduAccCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Educator', educatorSchema);
