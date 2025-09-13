const express = require("express"); // Express framework for building API
const router = express.Router(); // This router will handle all authentication-related API endpoints
const { signup, login } = require("../controllers/authController"); // Import auth controller functions

// This route handles user signup
router.post("/signup", signup);

// This route handles user login
router.post("/login", login);

// Export the router to be used in the main server file
module.exports = router;
