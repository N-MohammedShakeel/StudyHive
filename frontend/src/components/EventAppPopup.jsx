// frontend/src/components/EventAddPopup.jsx
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";

const EventAddPopup = ({ isOpen, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    dueDate: "",
    dueTime: "",
    type: "homework",
    group: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({
      name: "",
      dueDate: "",
      dueTime: "",
      type: "homework",
      group: "",
      description: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

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
                value={eventData.dueDate}
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
              value={eventData.group}
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
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventAddPopup;
