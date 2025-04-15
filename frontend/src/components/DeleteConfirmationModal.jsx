import React from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemType = "item",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[var(--text20)] flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="bg-[var(--bg)] rounded-lg p-6 w-full max-w-md border border-[var(--text20)]">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">
          Confirm Deletion
        </h2>
        <p className="text-[var(--text60)] mb-6">
          Are you sure you want to delete this {itemType.toLowerCase()}? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--bg)] border border-[var(--text20)] rounded-md hover:bg-[var(--text10)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-[var(--primarycontrast)] bg-[var(--error)] rounded-md active:bg-[var(--error-text)]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
