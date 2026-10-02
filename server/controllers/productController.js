const Product = require("../models/Product");
const User = require("../models/User");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// =====================================================
// Helper: Convert Category ID OR Category Name to Name
// =====================================================
const addCategoryNames = async (products) => {
  const categories = await Category.find();

  // Map Category ObjectId -> Category Name
  const categoryIdMap = {};

  // Map Category Name -> Category Name
  const categoryNameMap = {};

  categories.forEach((category) => {
    categoryIdMap[category._id.toString()] = category.name;

    categoryNameMap[category.name.toLowerCase()] = category.name;
  });

  return products.map((product) => {
    const productObject = product.toObject();

    const categoryValue = productObject.category;

    if (!categoryValue) {
      productObject.category = "Other";
    } else {
      const categoryString = categoryValue.toString();

      // Case 1: Category is stored as ObjectId string
      if (categoryIdMap[categoryString]) {
        productObject.category = categoryIdMap[categoryString];
      }

      // Case 2: Category is already stored as category name
      else if (categoryNameMap[categoryString.toLowerCase()]) {
        productObject.category =
          categoryNameMap[categoryString.toLowerCase()];
      }

      // Case 3: Unknown category
      else {
        productObject.category = "Other";
      }
    }

    return productObject;
  });
};

// =====================================================
// Add Product
// =====================================================
const addProduct = async (req, res) => {
  try {
    const {
      entrepreneurId,
      name,
      description,
      price,
      category,
      stock,
      location,
      image,
    } = req.body;

    const entrepreneur = await User.findById(entrepreneurId);

    if (!entrepreneur) {
      return res.status(404).json({
        success: false,
        message: "Entrepreneur not found",
      });
    }

    const product = await Product.create({
      entrepreneurId,
      name,
      description,
      price,
      category,
      stock,
      location,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get All Products
// =====================================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    console.log(
      products.map((p) => ({
        name: p.name,
        category: p.category,
      }))
    );

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// Get Products of Logged-in Entrepreneur
// =====================================================
const getMyProducts = async (req, res) => {
  try {
    const { entrepreneurId } = req.query;

    const products = await Product.find({ entrepreneurId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get One Product
// =====================================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productsWithCategory =
      await addCategoryNames([product]);

    res.json(productsWithCategory[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// Update Product
// =====================================================
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      location,
      stock,
    } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Upload new image if provided
    if (req.file) {
      const result =
        await cloudinary.uploader.upload(req.file.path, {
          folder: "HunarHub/products",
        });

      product.image = result.secure_url;
    }

    product.name = name;
    product.category = category;
    product.price = price;
    product.description = description;
    product.location = location;

    if (stock !== undefined) {
      product.stock = stock;
    }

    await product.save();

    const updatedProduct =
      await addCategoryNames([product]);

    res.json(updatedProduct[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// Delete Product
// =====================================================
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Export
// =====================================================
module.exports = {
  addProduct,
  getProducts,
  getFeaturedProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};