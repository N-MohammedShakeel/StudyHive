// backend/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  fetchCourses,
  createCourse,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, fetchCourses);
router.post("/", authMiddleware, createCourse);

module.exports = router;
