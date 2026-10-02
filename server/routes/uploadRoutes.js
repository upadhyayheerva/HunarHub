const express = require("express");
const router = express.Router();
const upload = require("../config/upload");

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Multer/Cloudinary Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    return res.json({
      success: true,
      image: req.file.path,
    });
  });
});

module.exports = router;