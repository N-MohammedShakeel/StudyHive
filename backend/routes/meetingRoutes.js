// backend/routes/meetingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:groupId", authMiddleware, getMeetings);
router.post("/", authMiddleware, createMeeting);
router.put("/", authMiddleware, updateMeeting);
router.delete("/:meetingId", authMiddleware, deleteMeeting);

module.exports = router;
