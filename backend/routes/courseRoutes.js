// backend/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, fetchCourses);
router.post("/", authMiddleware, createCourse);
router.put("/", authMiddleware, updateCourse);
router.delete("/:courseId", authMiddleware, deleteCourse);

module.exports = router;
