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
    phone: {
      type: String,
      required: false, // optional at signup
      unique: true,
      sparse: true, // ensures unique works even when field is empty
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
    refreshToken: [
      {
        token: { type: String, required: true },
        expiresAt: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// ========================= Model Export =========================
const User = mongoose.model("User", userSchema);
module.exports = User;
