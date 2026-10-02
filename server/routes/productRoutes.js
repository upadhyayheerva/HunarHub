const express = require("express");
const router = express.Router();

const upload = require("../config/upload");

const {
  addProduct,
  getProducts,
  getFeaturedProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Add Product
router.post("/", upload.single("image"), addProduct);

// Get All Products
router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

//
router.get("/my-products", getMyProducts);

// Get One Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", upload.single("image"), updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;