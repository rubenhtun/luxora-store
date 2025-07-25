const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    originalPrice,
    rating,
    reviews,
    inStock,
    stockQuantity,
    colors,
    image,
    images,
    category,
    features,
    shippingInfo,
    returnPolicy,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      originalPrice,
      rating,
      reviews,
      inStock,
      stockQuantity,
      colors,
      image,
      images,
      category,
      features,
      shippingInfo,
      returnPolicy,
    });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
