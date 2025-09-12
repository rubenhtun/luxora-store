const express = require("express"); // Express framework for building API
const router = express.Router(); // This router will handle all product-related API endpoints
const productController = require("../controllers/productController"); // Import product controller functions

// Create a new product
router.post("/", productController.addProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Update a product
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

// Export the router to be used in the main server file
module.exports = router;
