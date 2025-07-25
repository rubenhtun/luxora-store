const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Add error handling middleware
router.use((err, req, res, next) => {
  console.error("Error in product routes:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
