const mongoose = require("mongoose");
const Product = require("../models/Product");

// Helper function for consistent error responses
const sendErrorResponse = (res, status, message, error = null) => {
  const response = { message };
  if (error) response.error = error.message;
  return res.status(status).json(response);
};

// ======================= Create =======================
/**
 * @desc Add a new product
 * @route POST /products
 * @param {Object} req.body - Product data (name, description, price, category, inStock)
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
      "Invalid product data. Ensure name, description, price, category, and inStock are provided with correct types."
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

// ======================= Read =======================
/**
 * @desc Get all products
 * @route GET /products
 * @returns {Object} Array of products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }); // Exclude soft-deleted products
    res.status(200).json(products);
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to fetch products", error);
  }
};

// ======================= Update =======================
/**
 * @desc Update a product by ID
 * @route PUT /products/:id
 * @param {String} req.params.id - Product ID
 * @param {Object} req.body - Updated product data
 * @returns {Object} Updated product
 */
exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const updateData = req.body;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(productId)) {
    return sendErrorResponse(res, 400, "Invalid product ID");
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    if (!updatedProduct) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to update product", error);
  }
};

// ======================= Delete =======================
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
    const deletedProduct = await Product.findByIdAndUpdate(productId, {
      isDeleted: true, // Soft delete flag
      new: true,
    });

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
