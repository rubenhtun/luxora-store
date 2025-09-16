const express = require("express"); // Express framework for building API
const router = express.Router(); // This router will handle all user-related API endpoints
const UserController = require("../controllers/UserController"); // Import user controller functions
const authMiddleware = require("../middleware/authMiddleware"); // JWT auth

// Update user name
router.patch("/update-name", authMiddleware, UserController.updateName);

// Update user email
router.patch("/update-email", authMiddleware, UserController.updateEmail);

// Aad or update user phone number
router.patch("/update-phone", authMiddleware, UserController.updatePhone);

// Update user password
router.patch("/update-password", authMiddleware, UserController.updatePassword);

// Export the router to be used in the main server file
module.exports = router;
