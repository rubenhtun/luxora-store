const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing passwords securely
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const { JWT_SECRET } = require("../config/config"); // Import JWT secret key from config for signing tokens

// ======================= Helper functions =======================

/**
 * @desc Generate JWT token for a user
 * @param {String} userId - MongoDB user _id
 * @param {String} expiresIn - JWT expiration time (default 1h)
 * @returns {String} JWT token
 */
const generateToken = (userId, expiresIn = "1h") => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

/**
 * @desc Send JWT token as HTTP-only cookie in response
 * @param {Object} res - Express response object
 * @param {String} token - JWT token
 * @param {Number} status - HTTP status code (default 200)
 * @param {String} message - Response message
 */
const sendTokenCookie = (res, token, status = 200, message = "Success") => {
  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true, // JavaScript cannot access the cookie; protects against XSS attacks
      secure: process.env.NODE_ENV === "production", // only over HTTPS
      sameSite: "Strict", // protects against CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .json({ message });
};

// ======================= Signup =======================
/**
 * @desc Signup for new user
 * @route POST /auth/signup
 * @param {Object} req.body - Form data (name, email, password)
 * @returns {Object} Sets HTTP-only cookie and returns success message
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if password meets minimum length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send token as HTTP-only cookie
    sendTokenCookie(res, token, 201, "Account created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= Login =======================
/**
 * @desc Login for existing user
 * @route POST /auth/login
 * @param {Object} req.body - Form data (email, password)
 * @returns {Object} Sets HTTP-only cookie and returns success message
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id, "1d");

    // Send token as HTTP-only cookie
    sendTokenCookie(res, token, 200, "Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= Logout =======================
/**
 * @desc Logout the authenticated user
 * @route POST /auth/logout
 * @returns {Object} Clears HTTP-only cookie and returns success message
 */
exports.logout = async (req, res) => {
  try {
    // Clear the HTTP-only cookie by setting it to empty and expiring immediately
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
      sameSite: "strict",
      expires: new Date(0), // expire immediately
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
