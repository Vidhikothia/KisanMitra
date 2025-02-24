const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  photo: { type: String ,default:null},
  eduAccCreatedDate: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Educator', educatorSchema);
