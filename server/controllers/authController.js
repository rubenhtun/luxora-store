const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing passwords securely
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require("../config/config"); // Import JWT secret key from config for signing tokens

// ======================= Helper functions =======================

/**
 * @desc Generate JWT token for a user
 * @param {String} userId - MongoDB user _id
 * @param {String} expiresIn - JWT expiration time (default 1h)
 * @returns {String} JWT token
 */
const generateAccessToken = (userId, expiresIn = "1h") => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

/**
 * @desc Generate Refresh JWT token for a user
 * @param {String} userId - MongoDB user _id
 * @param {String} expiresIn - JWT expiration time (default 1 month)
 * @returns {String} JWT refresh token
 */
const generateRefreshToken = (userId, expiresIn = "30d") => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn });
};

/**
 * @desc Save refresh token with expiry date
 * @param {Object} user - User document
 * @param {String} refreshToken - JWT refresh token
 * @returns {Promise} Saved user
 */
const saveRefreshToken = async (user, refreshToken) => {
  // Clear expired tokens first
  user.refreshToken = user.refreshToken.filter(
    (rt) => rt.expiresAt > new Date()
  );

  // Add new refresh token with expiry (30 days from now)
  user.refreshToken.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return await user.save();
};

/**
 * @desc Send access and refresh tokens as HTTP-only cookies
 * @param {Object} res - Express response object
 * @param {String} accessToken - JWT access token
 * @param {String} refreshToken - JWT refresh token
 * @param {Number} status - HTTP status code (default 200)
 * @param {String} message - Response message (default "Success")
 * @returns {Object} Sets cookies and sends JSON response
 */

const sendTokenCookie = (
  res,
  accessToken,
  refreshToken,
  status = 200,
  message = "Success"
) => {
  res
    .status(status)
    .cookie("accessToken", accessToken, {
      httpOnly: true, // JavaScript cannot access the cookie; protects against XSS attacks
      secure: process.env.NODE_ENV === "production", // only over HTTPS
      sameSite: "Strict", // protects against CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    .json({ message, accessToken, refreshToken });
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
    const accessToken = generateAccessToken(user._id, "1h");
    const refreshToken = generateRefreshToken(user._id, "30d");

    // Save refresh token with expiry
    await saveRefreshToken(user, refreshToken);

    // Send token as HTTP-only cookie
    sendTokenCookie(
      res,
      accessToken,
      refreshToken,
      201,
      "Account created successfully"
    );
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
    const accessToken = generateAccessToken(user._id, "1h");
    const refreshToken = generateRefreshToken(user._id, "30d");

    // Save refresh token with user in DB
    await saveRefreshToken(user, refreshToken);

    // Send token as HTTP-only cookie
    sendTokenCookie(res, accessToken, refreshToken, 200, "Login successful");
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
    // Clear both access and refresh token from DB
    const userId = req.user?.id;
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const currentRefresh = req.cookies.refreshToken; // Get current refresh token from cookie
        // Remove the current refresh token from DB
        user.refreshToken = user.refreshToken.filter(
          (rt) => rt.token !== currentRefresh
        );
        await user.save();
      }
    }

    // Clear both cookies
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
      sameSite: "strict",
      expires: new Date(0), // expire immediately
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
      sameSite: "strict",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= Refresh Token =======================
/**
 * @desc Refresh access token
 * @route POST /auth/refresh
 * @returns {Object} New access token
 */
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Find user and check if refresh token exists and is not expired
    const user = await User.findById(decoded.id);
    const validToken = user?.refreshToken?.find(
      (rt) => rt.token === refreshToken && rt.expiresAt > new Date()
    );

    if (!user || !validToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Remove old refresh token and save new one
    user.refreshToken = user.refreshToken.filter(
      (rt) => rt.token !== refreshToken // Changed from currentRefreshToken
    );
    await saveRefreshToken(user, newRefreshToken);

    // Send new tokens
    sendTokenCookie(res, accessToken, newRefreshToken, 200, "Tokens refreshed");
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
