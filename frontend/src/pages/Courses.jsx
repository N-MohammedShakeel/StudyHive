import React, { useState, useEffect } from "react";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi";
import Sidebar from "../components/Common/Sidebar";
import { BookOpen, Bot, Search, Edit, Trash2 } from "lucide-react";
import AIModal from "../components/AIModal";
import CourseModal from "../components/CourseModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import toast, { Toaster } from "react-hot-toast";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleCreateCourse = async (courseData) => {
    try {
      const newCourse = await createCourse(courseData);
      setCourses([...courses, newCourse]);
      toast.success("Course created successfully");
    } catch (error) {
      toast.error("Failed to create course");
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      const updatedCourse = await updateCourse(courseData);
      setCourses(
        courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
      );
      setEditingCourse(null);
      toast.success("Course updated successfully");
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await deleteCourse(courseToDelete);
      setCourses(courses.filter((c) => c._id !== courseToDelete));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const openDeleteModal = (courseId) => {
    setCourseToDelete(courseId);
    setIsDeleteModalOpen(true);
  };

  const filteredCourses = courses.filter(
    (course) =>
      (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.author?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (filterCategory ? course.categories.includes(filterCategory) : true)
  );

  const categories = [
    ...new Set(courses.flatMap((course) => course.categories)),
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Toaster position="top-right" />
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-xl bg-[var(--bg)] border border-[var(--text20)]">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                Courses
              </h1>
              <p className="text-[var(--text60)] text-sm sm:text-base">
                Share and explore community courses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or author..."
                  className="m-2 p-2 pl-10 w-full rounded-lg border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                />
                <Search
                  className="absolute left-5 top-4 transform h-5 w-5 text-[var(--text60)]"
                  viewBox="0 0 24 24"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="m-2 p-2 sm:w-40 rounded-lg border-[var(--text20)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsCourseModalOpen(true)}
                className="px-4 m-2 p-2 bg-[var(--primary)] text-[var(--primarycontrast)] rounded-lg active:bg-[var(--primary85)] transition-colors"
              >
                Add Course
              </button>
            </div>
          </div>
          {loading ? (
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 bg-[var(--text20)] rounded-xl"
                ></div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-[var(--bg)] rounded-xl border border-[var(--text20)] p-5 transition-all"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {course.image && course.image !== "" ? (
                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-12 w-12 rounded-md object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : (
                      <BookOpen
                        className="h-6 w-6 text-[var(--primary)]"
                        style={{ display: course.image ? "none" : "block" }}
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-[var(--text)] text-lg">
                        {course.name}
                      </h3>
                      <p className="text-sm text-[var(--text60)]">
                        By {course.author?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text60)] line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-2 text-sm text-[var(--text60)]">
                    <p>
                      <strong>Categories:</strong>{" "}
                      {course.categories.join(", ")}
                    </p>
                    <p>
                      <strong>Tags:</strong> {course.tags.join(", ")}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    {course.image && course.image !== "" && (
                      <a
                        href={course.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[var(--primary5)] text-[var(--primary)] rounded-md hover:bg-[var(--primary20)] text-sm"
                      >
                        Image
                      </a>
                    )}
                    {course.resource && (
                      <a
                        href={course.resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[var(--success5)] text-[var(--success-text)] rounded-md hover:bg-[var(--success)] hover:bg-opacity-20 text-sm"
                      >
                        Resource
                      </a>
                    )}
                    {course.author?._id === user.id && (
                      <>
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setIsCourseModalOpen(true);
                          }}
                          className="px-3 py-1 bg-[var(--primary5)] text-[var(--primary)] rounded-md hover:bg-[var(--primary20)] text-sm"
                          aria-label={`Edit ${course.name}`}
                        >
                          <Edit className="h-4 w-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(course._id)}
                          className="px-3 py-1 bg-[var(--error5)] text-[var(--error-text)] rounded-md hover:bg-[var(--error)] hover:bg-opacity-20 text-sm"
                          aria-label={`Delete ${course.name}`}
                        >
                          <Trash2 className="h-4 w-4 inline mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--bg)] rounded-xl border border-[var(--text20)]">
              <BookOpen className="h-12 w-12 text-[var(--text60)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--text)] mb-2">
                No courses found
              </h3>
              <p className="text-[var(--text60)] text-sm">
                Add a course or adjust your search/filter
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[var(--primary)] text-[var(--primarycontrast)] p-4 rounded-full active:bg-[var(--primary85)] transition-colors z-40"
          aria-label="Open AI assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => {
          setIsCourseModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
        initialData={editingCourse}
      />
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        userInterests={user.interests || []}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCourse}
        itemType="course"
      />
    </div>
  );
};

export default Courses;
