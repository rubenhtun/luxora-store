const mongoose = require("mongoose");

// ====================== User Schema Definition =======================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Prevent duplicate emails
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"], // Basic email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6, // Ensure password has minimum length
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Role for authorization
      default: "user",
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// ========================= Model Export =========================
const User = mongoose.model("User", userSchema);
module.exports = User;
