const User = require("../models/User");

const getVerifiedEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await User.find({
      role: "entrepreneur",
      isVerified: true,
    }).select("-password");

    res.status(200).json(entrepreneurs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getVerifiedEntrepreneurs };