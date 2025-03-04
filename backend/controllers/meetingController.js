// backend/controllers/meetingController.js
const Meeting = require("../models/Meeting");
const Group = require("../models/Group");

const getMeetings = async (req, res) => {
  const { groupId } = req.params; // Expecting _id
  try {
    const meetings = await Meeting.find({ groupId }).sort("dateTime");
    res.json(meetings);
  } catch (error) {
    console.error("Get Meetings Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching meetings", error: error.message });
  }
};

const createMeeting = async (req, res) => {
  const { groupId, dateTime } = req.body; // groupId is _id
  try {
    const userId = req.user.id;
    const group = await Group.findOne({ _id: groupId, host: userId }); // Use _id instead of groupId
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can create meetings" });

    const meeting = new Meeting({ groupId, dateTime, createdBy: userId });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    console.error("Create Meeting Error:", error);
    res
      .status(500)
      .json({ message: "Error creating meeting", error: error.message });
  }
};

const updateMeeting = async (req, res) => {
  const { meetingId, dateTime } = req.body;
  try {
    const userId = req.user.id;
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    const group = await Group.findOne({ _id: meeting.groupId, host: userId }); // Use _id
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can update meetings" });

    meeting.dateTime = dateTime;
    await meeting.save();
    res.json(meeting);
  } catch (error) {
    console.error("Update Meeting Error:", error);
    res
      .status(500)
      .json({ message: "Error updating meeting", error: error.message });
  }
};

const deleteMeeting = async (req, res) => {
  const { meetingId } = req.params;
  try {
    const userId = req.user.id;
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    const group = await Group.findOne({ _id: meeting.groupId, host: userId }); // Use _id
    if (!group)
      return res
        .status(403)
        .json({ message: "Only the host can delete meetings" });

    await Meeting.deleteOne({ _id: meetingId });
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Delete Meeting Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting meeting", error: error.message });
  }
};

module.exports = { getMeetings, createMeeting, updateMeeting, deleteMeeting };
