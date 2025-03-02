// backend/controllers/eventController.js
const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error) {
    console.error("Get Events Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

const createEvent = async (req, res) => {
  const { name, dueDate, dueTime, type, group, description } = req.body;
  try {
    const userId = req.user.id;
    const event = new Event({
      name,
      dueDate,
      dueTime,
      type,
      group,
      description,
      userId,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, dueDate, dueTime, type, group, description } = req.body;
  try {
    const userId = req.user.id;
    const event = await Event.findOneAndUpdate(
      { _id: id, userId },
      { name, dueDate, dueTime, type, group, description },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    console.error("Update Event Error:", error);
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const event = await Event.findOneAndDelete({ _id: id, userId });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
