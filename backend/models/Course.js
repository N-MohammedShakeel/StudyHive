// backend/models/Course.js
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  type: { type: String, enum: ["pdf", "video", "note"], required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  progress: { type: Number, default: 0 },
  assignments: { type: Number, default: 0 },
  completedAssignments: { type: Number, default: 0 },
  materials: [materialSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
