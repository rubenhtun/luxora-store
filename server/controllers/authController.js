const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing passwords securely
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const { JWT_SECRET } = require("../config/config"); // Import JWT secret key from config for signing tokens

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
