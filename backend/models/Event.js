// backend/models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  dueTime: { type: String, required: true },
  type: {
    type: String,
    enum: ["homework", "exam", "project"],
    default: "homework",
  },
  group: { type: String }, // Optional group ID or name
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
