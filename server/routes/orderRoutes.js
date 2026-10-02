const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
} = require("../controllers/orderController");

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

module.exports = router;