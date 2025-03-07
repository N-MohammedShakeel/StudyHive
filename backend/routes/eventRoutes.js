// backend/routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getEvents);
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
