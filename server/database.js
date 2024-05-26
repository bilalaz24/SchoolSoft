const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully conected to MongoDB");
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
}

module.exports = connectDB;
