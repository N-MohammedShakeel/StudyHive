// frontend/src/pages/Courses.jsx
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
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
        console.error("Failed to load courses:", error);
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
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      const updatedCourse = await updateCourse(courseData);
      setCourses(
        courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
      );
      setEditingCourse(null);
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses(courses.filter((c) => c._id !== courseId));
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.author.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterCategory ? course.categories.includes(filterCategory) : true)
  );

  const categories = [
    ...new Set(courses.flatMap((course) => course.categories)),
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Courses
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Share and explore community courses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or author..."
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-40 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                Add Course
              </button>
            </div>
          </div>
          {loading ? (
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    ) : (
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        By {course.author.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <strong>Categories:</strong>{" "}
                      {course.categories.join(", ")}
                    </p>
                    <p>
                      <strong>Tags:</strong> {course.tags.join(", ")}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    {course.link && (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 text-sm"
                      >
                        Link
                      </a>
                    )}
                    {course.resource && (
                      <a
                        href={course.resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 text-sm"
                      >
                        Resource
                      </a>
                    )}
                    {course.author._id === user.id && (
                      <>
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setIsCourseModalOpen(true);
                          }}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 text-sm"
                        >
                          <Edit className="h-4 w-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
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
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 text-sm">
                Add a course or adjust your search/filter
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
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
    </div>
  );
};

export default Courses;
