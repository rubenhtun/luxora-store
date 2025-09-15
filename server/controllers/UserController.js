const User = require("../models/User"); // Import the User model

// ======================= Adding & Updating phone number =======================
/**
 * @desc Add or update mobile phone
 * @route PATCH /users/update-phone
 * @access Private (JWT required)
 * @param {Object} req.body - { phone: String }
 * @returns {Object} Updated user profile
 */
exports.updatePhone = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware (JWT/session)
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phone },
      { new: true, select: "-password" } // exclude password
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Your account not found" });
    }

    res.json({
      message: "Mobile phone added successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
