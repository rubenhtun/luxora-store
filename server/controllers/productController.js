const mongoose = require("mongoose");
const Product = require("../models/Product");

// Helper function for consistent error responses
const sendErrorResponse = (res, status, message, error = null) => {
  const response = { message };
  if (error) response.error = error.message;
  return res.status(status).json(response);
};

/**
 * @desc Get all products
 * @route GET /products
 * @returns {Object} Array of products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to fetch products", error);
  }
};

/**
 * @desc Add a new product
 * @route POST /products
 * @param {Object} req.body - Product data (name, price, inStock)
 * @returns {Object} Created product
 */
exports.addProduct = async (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  // Validate input
  if (
    !name ||
    typeof name !== "string" ||
    !description ||
    typeof description !== "string" ||
    price === undefined ||
    typeof price !== "number" ||
    price <= 0 ||
    !category ||
    typeof category !== "string" ||
    typeof inStock !== "boolean"
  ) {
    return sendErrorResponse(
      res,
      400,
      "Invalid product data: name (string), description (string), price (positive number), category(string) and inStock (boolean) are required"
    );
  }

  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Save product error:", error);
    sendErrorResponse(res, 500, "Failed to add product", error);
  }
};

/**
 * @desc Delete a product by ID
 * @route DELETE /products/:id
 * @param {String} req.params.id - Product ID
 * @returns {Object} Deleted product
 */
exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(productId)) {
    return sendErrorResponse(res, 400, "Invalid product ID");
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return sendErrorResponse(res, 404, "Product not found");
    }
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to delete product", error);
  }
};
