import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { fetchUserGroups } from "../api/groupApi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const EventDetailsModal = ({ isOpen, event, onClose, onUpdate, onDelete }) => {
  const [eventData, setEventData] = useState({
    name: "",
    dueDate: "",
    dueTime: "",
    type: "homework",
    group: "",
    description: "",
    status: "not_started",
  });
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && event) {
      const dueDateTime = new Date(event.dueDate);
      const dueDate = dueDateTime.toISOString().split("T")[0];
      const dueTime = dueDateTime.toTimeString().slice(0, 5);
      setEventData({
        name: event.name || "",
        dueDate,
        dueTime,
        type: event.type || "homework",
        group: event.group || "",
        description: event.description || "",
        status: event.status || "not_started",
      });

      const loadGroups = async () => {
        setLoadingGroups(true);
        try {
          const userGroups = await fetchUserGroups();
          setGroups(userGroups || []);
        } catch (error) {
          toast.error("Failed to load groups", error);
          setGroups([]);
        } finally {
          setLoadingGroups(false);
        }
      };
      loadGroups();
    }
  }, [isOpen, event]);

  const validateForm = () => {
    const newErrors = {};
    if (!eventData.name.trim()) newErrors.name = "Event name is required";
    if (!eventData.dueDate) newErrors.dueDate = "Due date is required";
    if (!eventData.dueTime) newErrors.dueTime = "Due time is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dueDateTime = new Date(
        `${eventData.dueDate}T${eventData.dueTime}`
      ).toISOString();
      onUpdate(event._id, {
        ...eventData,
        dueDate: dueDateTime,
      });
      setErrors({});
      onClose();
    } catch (error) {
      toast.error("Failed to update event", error);
    }
  };

  const handleDelete = () => {
    try {
      onDelete(event._id);
      setIsDeleteModalOpen(false);
      onClose();
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event", error);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  if (!isOpen || !event) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[var(--text20)] flex items-center justify-center z-50"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="bg-[var(--bg)] rounded-lg w-full max-w-md p-6 border border-[var(--text20)]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">
                Edit Event
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--text60)] hover:text-[var(--text)]"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--text)]"
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
                className="m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-[var(--error)]">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-[var(--text)]"
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
                  className="m-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                  required
                  aria-invalid={!!errors.dueDate}
                  aria-describedby={
                    errors.dueDate ? "dueDate-error" : undefined
                  }
                />
                {errors.dueDate && (
                  <p
                    id="dueDate-error"
                    className="mt-1 text-sm text-[var(--error)]"
                  >
                    {errors.dueDate}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dueTime"
                  className="block text-sm font-medium text-[var(--text)]"
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
                  className="m-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                  required
                  aria-invalid={!!errors.dueTime}
                  aria-describedby={
                    errors.dueTime ? "dueTime-error" : undefined
                  }
                />
                {errors.dueTime && (
                  <p
                    id="dueTime-error"
                    className="mt-1 text-sm text-[var(--error)]"
                  >
                    {errors.dueTime}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-[var(--text)]"
              >
                Event Type
              </label>
              <select
                id="type"
                value={eventData.type}
                onChange={(e) =>
                  setEventData({ ...eventData, type: e.target.value })
                }
                className="m-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              >
                <option value="homework">Homework</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-[var(--text)]"
              >
                Status
              </label>
              <select
                id="status"
                value={eventData.status}
                onChange={(e) =>
                  setEventData({ ...eventData, status: e.target.value })
                }
                className="m-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="group"
                className="block text-sm font-medium text-[var(--text)]"
              >
                Study Group
              </label>
              <select
                id="group"
                value={eventData.group}
                onChange={(e) =>
                  setEventData({ ...eventData, group: e.target.value })
                }
                className="mt-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)] disabled:bg-[var(--text10)]"
                disabled={loadingGroups || groups.length === 0}
                aria-describedby="group-status"
              >
                <option value="">Select a group (optional)</option>
                {groups.map((group) => (
                  <option key={group._id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
              {loadingGroups && (
                <p
                  id="group-status"
                  className="mt-1 text-sm text-[var(--text60)]"
                >
                  Loading groups...
                </p>
              )}
              {!loadingGroups && groups.length === 0 && (
                <p
                  id="group-status"
                  className="mt-1 text-sm text-[var(--text60)]"
                >
                  No groups joined
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[var(--text)]"
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
                className="mt-1 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              />
            </div>
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={openDeleteModal}
                className="px-4 py-2 text-sm font-medium text-[var(--primarycontrast)] bg-[var(--error)] border border-transparent rounded-md active:bg-[var(--error-text)]"
              >
                Delete Event
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--bg)] border border-[var(--text20)] rounded-md hover:bg-[var(--text10)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-[var(--primarycontrast)] bg-[var(--primary)] border border-transparent rounded-md active:bg-[var(--primary85)]"
                >
                  Update Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemType="event"
      />
    </>
  );
};

export default EventDetailsModal;
