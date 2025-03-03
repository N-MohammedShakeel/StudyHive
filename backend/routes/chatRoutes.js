// backend/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMessages,
  createMessage,
  deleteMessage,
  reactToMessage,
} = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:groupId", authMiddleware, getMessages);
router.post("/", authMiddleware, createMessage);
router.delete("/:messageId", authMiddleware, deleteMessage);
router.post("/react", authMiddleware, reactToMessage);

module.exports = router;
