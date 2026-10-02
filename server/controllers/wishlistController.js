const Wishlist = require("../models/Wishlist");

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existing = await Wishlist.findOne({ userId, productId });

    if (existing) {
      return res.json({
        success: true,
        message: "Already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create(req.body);

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.query;

    const wishlist = await Wishlist.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};