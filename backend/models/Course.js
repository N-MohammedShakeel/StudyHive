// backend/models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  resource: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [{ type: String }],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
