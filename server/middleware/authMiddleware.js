const jwt = require("jsonwebtoken"); // Import JWT library to verify tokens
const { JWT_SECRET } = require("../config/config"); // Import the secret key from config

// Middleware to protect routes and verify JWT
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header in the format: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user info to the request object for use in controllers
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch {
    // If token verification fails, return 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
};

// Export middleware to use in routes
module.exports = authMiddleware;
