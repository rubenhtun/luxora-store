const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, inStock } = req.body;

  if (!name || !price || !inStock) {
    return res.status(400).json({ message: "Invalid item data" });
  }

  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
