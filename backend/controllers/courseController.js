// backend/controllers/courseController.js
const Course = require("../models/Course");

const fetchCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const courses = await Course.find({ userId });
    res.json(courses);
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

const createCourse = async (req, res) => {
  const { name } = req.body;
  try {
    const userId = req.user.id;
    const course = new Course({ name, userId });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Create Course Error:", error);
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

module.exports = { fetchCourses, createCourse };
