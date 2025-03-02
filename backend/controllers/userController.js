// backend/controllers/userController.js
const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select(
      "name email interests googleId password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      interests: user.interests,
      googleId: user.googleId,
      hasPassword: !!user.password, // True if password exists, false if null
    };
    res.json(userData);
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, interests } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (interests) user.interests = interests;

    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      interests: user.interests,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const addPassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password)
      return res
        .status(400)
        .json({
          message: "Password already exists, use change password instead",
        });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password added successfully" });
  } catch (error) {
    console.error("Add Password Error:", error);
    res
      .status(500)
      .json({ message: "Error adding password", error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.password)
      return res
        .status(400)
        .json({ message: "No password set, use add password instead" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res
      .status(500)
      .json({ message: "Error changing password", error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Account Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting account", error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  addPassword,
  changePassword,
  deleteAccount,
};
