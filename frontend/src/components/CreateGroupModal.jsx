// frontend/src/components/CreateGroupModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const CreateGroupModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", isPublic: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Study Group
          </h2>
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
              Group Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Privacy Setting
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: true })}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: false })}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
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
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
