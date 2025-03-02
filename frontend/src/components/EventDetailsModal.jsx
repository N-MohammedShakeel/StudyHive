// frontend/src/components/EventDetailsModal.jsx
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { format } from "date-fns";

const EventDetailsModal = ({ isOpen, event, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState(event || {});

  if (!isOpen || !event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dueDateTime = new Date(`${eventData.dueDate}T${eventData.dueTime}`);
    onUpdate(event._id, { ...eventData, dueDate: dueDateTime });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event._id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Edit Event" : "Event Details"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                value={eventData.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={
                    eventData.dueDate ? eventData.dueDate.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setEventData({ ...eventData, dueDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dueTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Time
                </label>
                <input
                  type="time"
                  id="dueTime"
                  value={eventData.dueTime}
                  onChange={(e) =>
                    setEventData({ ...eventData, dueTime: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </label>
              <select
                id="type"
                value={eventData.type}
                onChange={(e) =>
                  setEventData({ ...eventData, type: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="homework">Homework</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                Study Group
              </label>
              <input
                type="text"
                id="group"
                value={eventData.group || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, group: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={eventData.description || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
              >
                Delete
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Event Name</p>
              <p className="text-gray-900">{event.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date</p>
                <p className="text-gray-900">
                  {format(new Date(event.dueDate), "MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Due Time</p>
                <p className="text-gray-900">{event.dueTime}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Type</p>
              <p className="text-gray-900 capitalize">{event.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Study Group</p>
              <p className="text-gray-900">{event.group || "None"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Description</p>
              <p className="text-gray-900">
                {event.description || "No description"}
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-300 rounded-md hover:bg-indigo-50"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsModal;
