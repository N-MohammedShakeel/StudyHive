// backend/controllers/groupController.js
const Group = require("../models/Group");
const User = require("../models/User");

const fetchUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const groups = await Group.find({ "members.userId": userId }).populate(
      "members.userId",
      "name email"
    );
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
    const groups = await Group.find({ isPublic: true }).populate(
      "members.userId",
      "name email"
    );
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
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const groupId = Math.random().toString(36).substring(2, 10);
    const group = new Group({
      name,
      description,
      isPublic,
      groupId,
      members: [{ userId, username: user.name, role: "host" }],
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

const editGroup = async (req, res) => {
  const { groupId, name, description, isPublic } = req.body;
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ groupId, host: userId });
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can edit the group" });

    if (name) group.name = name;
    if (description) group.description = description;
    if (typeof isPublic !== "undefined") group.isPublic = isPublic;

    await group.save();
    res.json(group);
  } catch (error) {
    console.error("Edit Group Error:", error);
    res
      .status(500)
      .json({ message: "Error editing group", error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const userId = req.user.id;
    const group = await Group.findOneAndDelete({ groupId, host: userId });
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can delete the group" });
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Delete Group Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting group", error: error.message });
  }
};

const joinGroup = async (req, res) => {
  const { groupId } = req.body;
  try {
    const userId = req.user.id;
    const username = req.user.name;
    const group = await Group.findOne({ groupId });
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.blockedMembers.includes(userId))
      return res
        .status(403)
        .json({ message: "You are blocked from this group" });
    if (group.members.some((m) => m.userId.toString() === userId))
      return res.status(400).json({ message: "Already a member" });
    if (!group.isPublic && !groupId)
      return res
        .status(403)
        .json({ message: "Group ID required for private group" });
    group.members.push({ userId, username, role: "member" });
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
    const group = await Group.findOne({ groupId });
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (
      group.host.toString() !== userId &&
      !group.members.some(
        (m) => m.userId.toString() === userId && m.role === "moderator"
      )
    ) {
      return res
        .status(403)
        .json({ message: "Only host or moderators can remove members" });
    }
    group.members = group.members.filter(
      (m) => m.userId.toString() !== memberId
    );
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
    const group = await Group.findOne({ groupId });
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (
      group.host.toString() !== userId &&
      !group.members.some(
        (m) => m.userId.toString() === userId && m.role === "moderator"
      )
    ) {
      return res
        .status(403)
        .json({ message: "Only host or moderators can block members" });
    }
    group.members = group.members.filter(
      (m) => m.userId.toString() !== memberId
    );
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

const updateMemberRole = async (req, res) => {
  const { groupId, memberId, role } = req.body;
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ groupId, host: userId });
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can update member roles" });

    const member = group.members.find((m) => m.userId.toString() === memberId);
    if (!member)
      return res.status(404).json({ message: "Member not found in group" });
    if (role && ["moderator", "member"].includes(role)) member.role = role;

    await group.save();
    res.json(group);
  } catch (error) {
    console.error("Update Member Role Error:", error);
    res
      .status(500)
      .json({ message: "Error updating member role", error: error.message });
  }
};

const getGroupMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findOne({ _id: groupId }).populate(
      "members.userId",
      "name email"
    );
    if (!group) return res.status(404).json({ message: "Group not found" });

    const validMembers = group.members.filter((member) => {
      if (!member.userId) {
        console.warn(`Invalid userId in group ${groupId}, member:`, member);
        return false;
      }
      return true;
    });

    res.json(validMembers);
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
  editGroup,
  deleteGroup,
  joinGroup,
  removeMember,
  blockMember,
  updateMemberRole,
  getGroupMembers,
};
