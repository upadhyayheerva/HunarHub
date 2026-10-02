const express = require("express");
const router = express.Router();

const { getDashboardData } = require("../controllers/dashboardController");

// Dashboard API
router.get("/", getDashboardData);

module.exports = router;