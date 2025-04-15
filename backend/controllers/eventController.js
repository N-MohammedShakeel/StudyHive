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
  const { name, dueDate, type, description, group, status } = req.body;
  try {
    // Validate required fields
    if (!name || !dueDate) {
      return res
        .status(400)
        .json({ message: "Name and due date are required" });
    }

    // Parse dueDate
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    // Extract dueTime from dueDate if needed
    const dueTime = parsedDate.toTimeString().slice(0, 5); // e.g., "14:30"

    // Validate user
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const event = new Event({
      name,
      dueDate,
      type,
      description,
      group,
      status: status || "not_started",
      userId: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, dueDate, type, description, group, status } = req.body;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, dueDate, type, description, group, status },
      { new: true }
    );
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found or unauthorized" });
    }
    res.json(event);
  } catch (error) {
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
