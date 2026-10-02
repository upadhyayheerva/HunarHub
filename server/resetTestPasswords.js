const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const accounts = [
  {
    email: "meera@hunarhub.in",
    password: "Meera@123",
  },
  {
    email: "ramesh@hunarhub.in",
    password: "Ramesh@123",
  },
  {
    email: "kavita@hunarhub.in",
    password: "Kavita@123",
  },
  {
    email: "priya@hunarhub.in",
    password: "Priya@123",
  },
];

const resetPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const account of accounts) {
      const hashedPassword = await bcrypt.hash(account.password, 10);

      const user = await User.findOneAndUpdate(
        { email: account.email },
        {
          password: hashedPassword,
        },
        { new: true }
      );

      if (user) {
        console.log(
          `Password updated successfully: ${user.fullName} - ${user.email}`
        );
      } else {
        console.log(`Account not found: ${account.email}`);
      }
    }

    console.log("All required passwords have been updated.");
  } catch (error) {
    console.log("ERROR:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

resetPasswords();