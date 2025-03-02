// backend/controllers/groupController.js
const Group = require("../models/Group");
const User = require("../models/User");

const fetchUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const groups = await Group.find({ members: userId });
    res.json(groups);
  } catch (error) {
    console.error("Fetch User Groups Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching user groups", error: error.message });
  }
};

const fetchPublicGroups = async (req, res) => {
  try {
    const groups = await Group.find({ isPublic: true });
    res.json(groups);
  } catch (error) {
    console.error("Fetch Public Groups Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching public groups", error: error.message });
  }
};

const createGroup = async (req, res) => {
  const { name, description, isPublic } = req.body;
  try {
    const userId = req.user.id;
    const groupId = Math.random().toString(36).substring(2, 10);
    const group = new Group({
      name,
      description,
      isPublic,
      groupId,
      members: [userId],
      host: userId,
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error("Create Group Error:", error);
    res
      .status(500)
      .json({ message: "Error creating group", error: error.message });
  }
};

const joinGroup = async (req, res) => {
  const { groupId } = req.body;
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ groupId });
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.blockedMembers.includes(userId))
      return res
        .status(403)
        .json({ message: "You are blocked from this group" });
    if (group.members.includes(userId))
      return res.status(400).json({ message: "Already a member" });
    if (!group.isPublic && !groupId)
      return res
        .status(403)
        .json({ message: "Group ID required for private group" });
    group.members.push(userId);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error("Join Group Error:", error);
    res
      .status(500)
      .json({ message: "Error joining group", error: error.message });
  }
};

const removeMember = async (req, res) => {
  const { groupId, memberId } = req.body;
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ groupId, host: userId });
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can remove members" });
    group.members = group.members.filter((id) => id.toString() !== memberId);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error("Remove Member Error:", error);
    res
      .status(500)
      .json({ message: "Error removing member", error: error.message });
  }
};

const blockMember = async (req, res) => {
  const { groupId, memberId } = req.body;
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ groupId, host: userId });
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can block members" });
    group.members = group.members.filter((id) => id.toString() !== memberId);
    if (!group.blockedMembers.includes(memberId))
      group.blockedMembers.push(memberId);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error("Block Member Error:", error);
    res
      .status(500)
      .json({ message: "Error blocking member", error: error.message });
  }
};

const getGroupMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findOne({ _id: groupId }).populate(
      "members",
      "name email"
    );
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group.members);
  } catch (error) {
    console.error("Get Group Members Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching group members", error: error.message });
  }
};

module.exports = {
  fetchUserGroups,
  fetchPublicGroups,
  createGroup,
  joinGroup,
  removeMember,
  blockMember,
  getGroupMembers,
};
