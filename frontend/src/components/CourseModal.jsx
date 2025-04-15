import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const CourseModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    link: "",
    resource: null,
    categories: [],
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (initialData) {
      const categories = Array.isArray(initialData.categories)
        ? initialData.categories
        : [];
      const tags = Array.isArray(initialData.tags) ? initialData.tags : [];
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        image: null,
        link: initialData.link || "",
        resource: null,
        categories,
        tags,
      });
      setCategoryInput(categories.join(", "));
      setTagInput(tags.join(", "));
      setImagePreview(initialData.image || "");
      setErrors({});
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
        link: "",
        resource: null,
        categories: [],
        tags: [],
      });
      setCategoryInput("");
      setTagInput("");
      setImagePreview("");
    }
  }, [initialData]);

  const validateFile = (file, type) => {
    if (!file) return true;
    const maxSize = type === "image" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    const validTypes =
      type === "image" ? ["image/jpeg", "image/png"] : ["application/pdf"];
    if (!validTypes.includes(file.type)) {
      return `Invalid ${type} format`;
    }
    if (file.size > maxSize) {
      return `${type} size exceeds ${maxSize / 1024 / 1024}MB limit`;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const finalCategories = categoryInput
      .split(/,\s*/)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    const finalTags = tagInput
      .split(/,\s*/)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    setFormData((prev) => ({
      ...prev,
      categories: finalCategories,
      tags: finalTags,
    }));

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Course name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    const imageValidation = validateFile(formData.image, "image");
    if (imageValidation !== true) newErrors.image = imageValidation;
    const resourceValidation = validateFile(formData.resource, "resource");
    if (resourceValidation !== true) newErrors.resource = resourceValidation;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      let image = formData.image ? null : initialData?.image || null;
      let resource = initialData?.resource ? "" : null;

      if (formData.image) {
        if (!(formData.image instanceof File)) {
          throw new Error("Invalid image file");
        }
        const formDataToSend = new FormData();
        formDataToSend.append("image", formData.image);
        const apiKey = "e02a95ec87dcc287fba84b6a4a178c35";
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );
        const result = await response.json();
        if (!result.success) {
          throw new Error(
            `ImgBB upload failed: ${
              result.error?.message || result.status_code || "Unknown error"
            }`
          );
        }
        image = result.data.display_url;
      }

      if (formData.resource) {
        resource = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(formData.resource);
        });
      }

      const submitData = {
        courseId: initialData?._id,
        name: formData.name,
        description: formData.description,
        image,
        link: formData.link,
        resourceData: resource,
        categories: finalCategories,
        tags: finalTags,
      };
      await onSubmit(submitData);

      toast.success(initialData ? "Course updated" : "Course created");
      onClose();
    } catch (error) {
      toast.error(`Failed to submit course: ${error.message}`);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateFile(file, "image");
      if (validation !== true) {
        setErrors({ ...errors, image: validation });
        return;
      }
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResourceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateFile(file, "resource");
      if (validation !== true) {
        setErrors({ ...errors, resource: validation });
        return;
      }
      setFormData({ ...formData, resource: file });
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleCategoryBlur = () => {
    const value = categoryInput
      .split(/,\s*/)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    setFormData((prev) => ({ ...prev, categories: value }));
  };

  const handleTagBlur = () => {
    const value = tagInput
      .split(/,\s*/)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    setFormData((prev) => ({ ...prev, tags: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[var(--text20)] flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="bg-[var(--bg)] rounded-lg w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto border-4 border-[var(--text20)] ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {initialData ? "Edit Course" : "Add Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text60)] hover:text-[var(--text)]"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Course Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="m-2 p-2 w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
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
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="m-2 p-2 w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              rows={3}
              required
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <p
                id="description-error"
                className="mt-1 text-sm text-[var(--error)]"
              >
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Image
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className="m-1 p-2 w-full"
              aria-describedby={errors.image ? "image-error" : undefined}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-md"
              />
            )}
            {errors.image && (
              <p id="image-error" className="mt-1 text-sm text-[var(--error)]">
                {errors.image}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="m-1 p-2 w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Resource (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResourceChange}
              className="m-1 p-2 w-full"
              aria-describedby={errors.resource ? "resource-error" : undefined}
            />
            {errors.resource && (
              <p
                id="resource-error"
                className="mt-1 text-sm text-[var(--error)]"
              >
                {errors.resource}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Categories (comma-separated)
            </label>
            <input
              type="text"
              value={categoryInput}
              onChange={handleCategoryChange}
              onBlur={handleCategoryBlur}
              className="m-2 p-2 w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              placeholder="e.g., Programming, AI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagChange}
              onBlur={handleTagBlur}
              className="m-2 p-2 w-full rounded-md border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              placeholder="e.g., JavaScript, Beginner"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-[var(--primarycontrast)] transition-colors ${
              isSubmitting
                ? "bg-[var(--text60)] cursor-not-allowed"
                : "bg-[var(--primary)] active:bg-[var(--primary85)]"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : initialData
              ? "Update Course"
              : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
