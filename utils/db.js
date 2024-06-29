const mongoose = require("mongoose");
const { deleteOldRecords } = require("../cantroller/auth-cantroller");
const cron = require("node-cron");

const URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("database connection successfully");
    cron.schedule("0 0 * * *", () => {
      // This cron expression runs at 00:00 on the every day
      deleteOldRecords().catch(console.error);
    });
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDB;

// {
//     "email":"Shardha123",
//     "password":"Shardha123"
// }
