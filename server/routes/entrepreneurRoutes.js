const express = require("express");
const router = express.Router();

const {
  getVerifiedEntrepreneurs,
} = require("../controllers/entrepreneurController");

router.get("/", getVerifiedEntrepreneurs);

module.exports = router;