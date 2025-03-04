// frontend/src/components/CourseModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const CourseModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: null,
    link: initialData?.link || "",
    resource: null,
    categories: initialData?.categories || [],
    tags: initialData?.tags || [],
  });
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const resourceReader = new FileReader();
    let imageData = "";
    let resourceData = "";

    const submit = () => {
      onSubmit({
        courseId: initialData?._id,
        name: formData.name,
        description: formData.description,
        imageData,
        link: formData.link,
        resourceData,
        categories: formData.categories,
        tags: formData.tags,
      });
      setFormData({
        name: "",
        description: "",
        image: null,
        link: "",
        resource: null,
        categories: [],
        tags: [],
      });
      setImagePreview("");
      onClose();
    };

    if (formData.image) {
      reader.onload = () => {
        imageData = reader.result.split(",")[1]; // Base64 data
        if (formData.resource) {
          resourceReader.readAsDataURL(formData.resource);
        } else {
          submit();
        }
      };
      reader.readAsDataURL(formData.image);
    } else if (formData.resource) {
      resourceReader.onload = () => {
        resourceData = resourceReader.result.split(",")[1]; // Base64 data
        submit();
      };
      resourceReader.readAsDataURL(formData.resource);
    } else {
      submit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v);
    setFormData({ ...formData, categories: value });
  };

  const handleTagChange = (e) => {
    const value = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v);
    setFormData({ ...formData, tags: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? "Edit Course" : "Add Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-md"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resource (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFormData({ ...formData, resource: e.target.files[0] })
              }
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories (comma-separated)
            </label>
            <input
              type="text"
              value={formData.categories.join(", ")}
              onChange={handleCategoryChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Programming, AI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={handleTagChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., JavaScript, Beginner"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {initialData ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
