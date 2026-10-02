const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  getAllEntrepreneurs,
  approveEntrepreneur,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

const router = express.Router();

// All admin routes are protected
router.use(adminMiddleware);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Entrepreneurs
router.get("/entrepreneurs", getAllEntrepreneurs);
router.put("/entrepreneurs/:id/approve", approveEntrepreneur);

// Products
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

module.exports = router;