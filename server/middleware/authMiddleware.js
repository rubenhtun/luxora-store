const jwt = require("jsonwebtoken"); // Import JWT library to verify tokens
const { JWT_SECRET } = require("../config/config"); // Import the secret key from config

// Middleware to protect routes and verify JWT
const authMiddleware = (req, res, next) => {
  // Get token from httpOnly cookie
  const accessToken = req.cookies.accessToken;

  // Return 401 if access token is missing
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(accessToken, JWT_SECRET);

    // Attach the decoded user info to the request object for use in controllers
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    // If token verification fails, return 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
};

// Export middleware to use in routes
module.exports = authMiddleware;
