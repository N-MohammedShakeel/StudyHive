// backend/controllers/chatController.js
const Message = require("../models/Chat");

const getMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({ groupId })
      .populate("userId", "name")
      .sort("createdAt");
    res.json(messages);
  } catch (error) {
    console.error("Get Messages Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

const createMessage = async (req, res) => {
  const { groupId, content } = req.body;
  try {
    const userId = req.user.id;
    const message = new Message({ groupId, userId, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error("Create Message Error:", error);
    res
      .status(500)
      .json({ message: "Error creating message", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const userId = req.user.id;
    const message = await Message.findOneAndDelete({ _id: messageId, userId });
    if (!message)
      return res
        .status(403)
        .json({ message: "You can only delete your own messages" });
    res.json({ message: "Message deleted successfully", messageId });
  } catch (error) {
    console.error("Delete Message Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting message", error: error.message });
  }
};

const reactToMessage = async (req, res) => {
  const { messageId, reaction } = req.body;
  try {
    const userId = req.user.id;
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    const existingReaction = message.reactions.find(
      (r) => r.userId.toString() === userId
    );
    if (existingReaction) {
      existingReaction.reaction = reaction;
    } else {
      message.reactions.push({ userId, reaction });
    }
    await message.save();
    res.json({ messageId, userId, reaction });
  } catch (error) {
    console.error("React to Message Error:", error);
    res
      .status(500)
      .json({ message: "Error reacting to message", error: error.message });
  }
};

module.exports = { getMessages, createMessage, deleteMessage, reactToMessage };
