const express = require("express"); // Express framework for building API
const router = express.Router(); // This router will handle all user-related API endpoints
const UserController = require("../controllers/UserController"); // Import user controller functions
const authMiddleware = require("../middleware/authMiddleware"); // JWT auth

// Update user phone number
router.patch("/update-phone", authMiddleware, UserController.updatePhone);

// Export the router to be used in the main server file
module.exports = router;
