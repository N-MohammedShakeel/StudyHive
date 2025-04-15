const Course = require("../models/Course");
const { drive, STUDYHIVE_FOLDER_ID } = require("../config/googleDrive");
const stream = require("stream");

const fetchCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("author", "name");
    res.json(courses);
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

const createCourse = async (req, res) => {
  const { name, description, image, link, resourceData, categories, tags } =
    req.body;
  try {
    const userId = req.user.id;

    let resourceUrl = "";
    if (resourceData) {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(resourceData.split(",")[1], "base64")); // Remove data:application/pdf;base64,
      const fileMetadata = {
        name: `${name}-resource.pdf`,
        parents: [STUDYHIVE_FOLDER_ID],
      };
      const media = { mimeType: "application/pdf", body: bufferStream };
      const resourceResponse = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: "webViewLink",
      });
      resourceUrl = resourceResponse.data.webViewLink;
    }

    console.log("Creating course:", { image, resourceUrl }); // Debug
    const course = new Course({
      name,
      description,
      image: image || "", // Use ImgBB URL
      link,
      resource: resourceUrl,
      author: userId,
      categories,
      tags,
    });
    await course.save();
    console.log("Saved course:", { image: course.image }); // Debug
    res.status(201).json(course);
  } catch (error) {
    console.error("Create Course Error:", error);
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

const updateCourse = async (req, res) => {
  const {
    courseId,
    name,
    description,
    image,
    link,
    resourceData,
    categories,
    tags,
  } = req.body;
  try {
    const userId = req.user.id;
    const course = await Course.findOne({ _id: courseId, author: userId });
    if (!course)
      return res
        .status(403)
        .json({ message: "You can only edit your own courses" });

    if (name) course.name = name;
    if (description) course.description = description;
    if (image !== undefined) course.image = image || ""; // Allow empty image
    if (link !== undefined) course.link = link;
    if (categories) course.categories = categories;
    if (tags) course.tags = tags;

    if (resourceData) {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(resourceData.split(",")[1], "base64"));
      const fileMetadata = {
        name: `${name}-resource.pdf`,
        parents: [STUDYHIVE_FOLDER_ID],
      };
      const media = { mimeType: "application/pdf", body: bufferStream };
      const resourceResponse = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: "webViewLink",
      });
      course.resource = resourceResponse.data.webViewLink;
    }

    console.log("Updating course:", { image: course.image }); // Debug
    await course.save();
    res.json(course);
  } catch (error) {
    console.error("Update Course Error:", error);
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const userId = req.user.id;
    const course = await Course.findOneAndDelete({
      _id: courseId,
      author: userId,
    });
    if (!course)
      return res
        .status(403)
        .json({ message: "You can only delete your own courses" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting course", error: error.message });
  }
};

module.exports = { fetchCourses, createCourse, updateCourse, deleteCourse };
