const Product = require("../models/Product");

const getDashboardData = async (req, res) => {
  try {
    const entrepreneurId = req.query.entrepreneurId;

    // Get only this entrepreneur's products and populate category name
    const products = await Product.find({ entrepreneurId })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    // Total Products
    const totalProducts = products.length;

    // Inventory Value
    const totalValue = products.reduce((sum, product) => {
      const price = Number(product.price) || 0;
      const stock = Number(product.stock) || 1;
      return sum + price * stock;
    }, 0);

    // Total Categories
    const totalCategories = new Set(
      products.map((p) => p.category?.name || "Other")
    ).size;

    // Total Locations
    const totalLocations = new Set(
      products.map((p) => p.location)
    ).size;

    // Latest Products
    const latestProducts = products.slice(0, 5);

    // Products by Category
    const categoryCount = {};

    products.forEach((product) => {
      const categoryName = product.category?.name || "Other";

      categoryCount[categoryName] =
        (categoryCount[categoryName] || 0) + 1;
    });

    res.json({
      totalProducts,
      totalValue,
      totalCategories,
      totalLocations,
      latestProducts,
      categoryCount,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });
  }
};

module.exports = {
  getDashboardData,
  getDashboardStats: getDashboardData,
};