require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../models/Category");

mongoose.connect(process.env.MONGO_URI);

const categories = [
  { name: "Handmade Crafts", icon: "🎨" },
  { name: "Embroidery", icon: "🧵" },
  { name: "Pottery", icon: "🏺" },
  { name: "Jewelry", icon: "💍" },
  { name: "Home Decor", icon: "🏡" },
  { name: "Organic Food", icon: "🥜" },
  { name: "Tailoring", icon: "✂️" },
  { name: "Painting", icon: "🖼️" },
  { name: "Bamboo Products", icon: "🎋" },
  { name: "Textile & Weaving", icon: "🧶" },
];

async function seedData() {
  try {
    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("Categories Added Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedData();