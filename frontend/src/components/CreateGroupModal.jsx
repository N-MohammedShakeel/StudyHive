import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreateGroupModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        isPublic:
          initialData.isPublic !== undefined ? initialData.isPublic : true,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ name: "", description: "", isPublic: true });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[var(--text20)] flex items-center justify-center z-50"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div className="bg-[var(--bg)] rounded-lg w-full max-w-md p-6 border border-[var(--text20)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {initialData ? "Edit Study Group" : "Create Study Group"}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text60)] hover:text-[var(--text)]"
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
              Group Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              required
            />
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="m-2 p-2 block w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Privacy Setting
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: true })}
                  className="form-radio text-[var(--primary)]"
                />
                <span className="ml-2 text-[var(--text)]">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!formData.isPublic}
                  onChange={() => setFormData({ ...formData, isPublic: false })}
                  className="form-radio text-[var(--primary)]"
                />
                <span className="ml-2 text-[var(--text)]">Private</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
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
              {initialData ? "Save Changes" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
