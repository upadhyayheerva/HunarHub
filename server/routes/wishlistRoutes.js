const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Add product
router.post("/", addToWishlist);

// Get all wishlist products
router.get("/", getWishlist);

// Remove product
router.delete("/:id", removeFromWishlist);

module.exports = router;