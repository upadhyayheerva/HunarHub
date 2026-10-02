const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
    } = req.body;

    // Check userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const order = await Order.create({
      userId,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Orders of Logged-in User
const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const orders = await Order.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getOrders,
};