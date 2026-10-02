const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
    console.log("MongoDB Database:", mongoose.connection.name);
    console.log("MongoDB Host:", mongoose.connection.host);
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;