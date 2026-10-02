const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@hunarhub.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      fullName: "HunarHub Admin",
      email: "admin@hunarhub.com",
      password: hashedPassword,
      role: "admin",
      phone: "",
      location: "",
      isVerified: true,
    });

    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email: admin@hunarhub.com");
    console.log("Password: Admin@123");

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();