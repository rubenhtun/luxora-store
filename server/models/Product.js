const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      lowercase: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be at least 0"],
      set: (v) => parseFloat(v.toFixed(2)), // Store prices with 2 decimal places
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price must be at least 0"],
      set: (v) => parseFloat(v.toFixed(2)),
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, "Review count cannot be negative"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },

    stockQuantity: {
      type: Number,
      required: true,
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    colors: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.every((color) => color.length <= 30);
        },
        message: "Each color must be 30 characters or less",
      },
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.every((img) =>
            /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif)$/i.test(img)
          );
        },
        message: "Please provide valid image URLs",
      },
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.every((feature) => feature.length <= 100);
        },
        message: "Each feature must be 100 characters or less",
      },
    },
    badges: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.every((badge) => badge.length <= 30);
        },
        message: "Each badge must be 30 characters or less",
      },
    },
    shippingInfo: {
      type: String,
      trim: true,
      maxlength: [500, "Shipping info cannot exceed 500 characters"],
    },
    returnPolicy: {
      type: String,
      trim: true,
      maxlength: [500, "Return policy cannot exceed 500 characters"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual property for discount status
productSchema.virtual("onSale").get(function () {
  return this.originalPrice > 0 && this.price < this.originalPrice;
});

// Indexes for better performance
productSchema.index({ name: "text", description: "text", category: "text" });
productSchema.index({ price: 1, inStock: 1 });
productSchema.index({ rating: -1, reviews: -1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
