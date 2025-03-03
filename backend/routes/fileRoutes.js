// backend/routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const {
  getFiles,
  uploadFile,
  deleteFile,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:groupId", authMiddleware, getFiles);
router.post("/", authMiddleware, uploadFile);
router.delete("/:fileId", authMiddleware, deleteFile);

module.exports = router;
