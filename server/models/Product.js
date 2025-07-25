const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },
    colors: { type: [String], default: [] },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    features: { type: [String], default: [] },
    shippingInfo: { type: String, default: "" },
    returnPolicy: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
