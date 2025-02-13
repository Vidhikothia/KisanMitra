
require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
console.log('Mongo URI:', MONGO_URI); 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
module.exports = connectDB;
