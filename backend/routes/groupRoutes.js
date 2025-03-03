// backend/routes/groupRoutes.js
const express = require("express");
const router = express.Router();
const {
  fetchUserGroups,
  fetchPublicGroups,
  createGroup,
  editGroup,
  deleteGroup,
  joinGroup,
  removeMember,
  blockMember,
  updateMemberRole,
  getGroupMembers,
} = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user", authMiddleware, fetchUserGroups);
router.get("/public", authMiddleware, fetchPublicGroups);
router.post("/", authMiddleware, createGroup);
router.put("/", authMiddleware, editGroup); // New
router.delete("/:groupId", authMiddleware, deleteGroup); // New
router.post("/join", authMiddleware, joinGroup);
router.post("/remove", authMiddleware, removeMember);
router.post("/block", authMiddleware, blockMember);
router.post("/role", authMiddleware, updateMemberRole); // New
router.get("/:groupId/members", authMiddleware, getGroupMembers);

module.exports = router;
