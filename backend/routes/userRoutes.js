// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateProfile,
  addPassword,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/add-password", authMiddleware, addPassword);
router.put("/password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);

module.exports = router;
