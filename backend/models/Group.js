// backend/models/Group.js
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isPublic: { type: Boolean, default: true },
  groupId: { type: String, unique: true, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blockedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", groupSchema);
