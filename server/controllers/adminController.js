const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ===============================
// ADMIN DASHBOARD
// ===============================
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "customer",
    });

    const totalEntrepreneurs = await User.countDocuments({
      role: "entrepreneur",
      isVerified: true,
    });

    const pendingEntrepreneurs = await User.countDocuments({
      role: "entrepreneur",
      isVerified: false,
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      totalUsers,
      totalEntrepreneurs,
      pendingEntrepreneurs,
      totalProducts,
      totalOrders,
      totalRevenue:
        totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// GET ALL USERS
// ===============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// GET ALL ENTREPRENEURS
// ===============================
const getAllEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await User.find({
      role: "entrepreneur",
    }).select("-password");

    res.status(200).json(entrepreneurs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// APPROVE ENTREPRENEUR
// ===============================
const approveEntrepreneur = async (req, res) => {
  try {
    const { id } = req.params;

    const entrepreneur = await User.findOneAndUpdate(
      {
        _id: id,
        role: "entrepreneur",
      },
      {
        isVerified: true,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!entrepreneur) {
      return res.status(404).json({
        message: "Entrepreneur not found",
      });
    }

    res.status(200).json({
      message: "Entrepreneur approved successfully",
      entrepreneur,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// DELETE USER
// ===============================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// GET ALL PRODUCTS
// ===============================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("entrepreneurId", "fullName email");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// GET ALL ORDERS
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// UPDATE ORDER STATUS
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllEntrepreneurs,
  approveEntrepreneur,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
};