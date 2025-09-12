const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing passwords securely
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const { JWT_SECRET } = require("../config/config"); // Import JWT secret key from config for signing tokens

// ======================= Singup =======================
/**
 * @desc Singup for new user
 * @route POST /auth/signup
 * @param {Object} req.body - Form data (name, email, password)
 * @returns {Object} Token, Created user
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Validate that password has a minimum length of 8
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      token: token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= Login =======================
/**
 * @desc Login from already existed user
 * @route POST /auth/login
 * @param {Object} req.body - Form data (email, password)
 * @returns {Object} Token, Created user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is already existed
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      token: token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= Logout =======================
/**
 * @desc Logout user
 * @route Logout Button /auth/logout
 * @returns {Object} Removes JWT token and redirects to login page
 */
exports.logout = async (req, res) => {
  
};
