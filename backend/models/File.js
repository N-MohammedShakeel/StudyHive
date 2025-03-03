// backend/models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  driveFileId: { type: String, required: true }, // Google Drive file ID
  url: { type: String, required: true }, // Public URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
