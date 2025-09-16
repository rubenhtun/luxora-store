const User = require("../models/User"); // Import the User model

// ======================= Updating user fields =======================
/**
 * @desc Update a specific user field (name, email, phone, or password)
 * @access Private (JWT required)
 * @param {Object} req.body - { <fieldName>: <value> }
 * @returns {Object} Updated user profile
 */
const updateUserField = async (req, res, field, hash = false) => {
  try {
    const userId = req.user.id;
    let value = req.body[field];

    if (!value)
      return res.status(400).json({ message: `${field} is required` });

    if (hash) value = await bcrypt.hash(value, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [field]: value },
      { new: true, select: "-password" }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "Your account not found" });

    res.json({ message: `${field} updated successfully`, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user name
exports.updateName = (req, res) => updateUserField(req, res, "name");

// Update user email
exports.updateEmail = (req, res) => updateUserField(req, res, "email");

// Add or update user phone
exports.updatePhone = (req, res) => updateUserField(req, res, "phone");

// Update user password (hashed)
exports.updatePassword = (req, res) =>
  updateUserField(req, res, "password", true);
