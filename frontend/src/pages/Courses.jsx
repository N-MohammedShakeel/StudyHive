// frontend/src/pages/Courses.jsx
import React, { useState, useEffect } from "react";
import {
  Book,
  Clock,
  CheckCircle,
  BarChart2,
  FileText,
  Video,
  Download,
} from "lucide-react";
import { fetchCourses, createCourse } from "../api/courseApi";
import Sidebar from "../components/Common/Sidebar";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleAddCourse = async () => {
    const name = prompt("Enter course name:");
    if (!name) return;
    try {
      const newCourse = await createCourse({ name });
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:pl-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600">
                Track your progress and access course materials
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Course
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.name}
                          </h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>Progress: {course.progress}%</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>
                                {course.completedAssignments} of{" "}
                                {course.assignments} assignments completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                          <Book className="h-8 w-8 text-indigo-600" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {selectedCourse ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {selectedCourse.name}
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Progress Analytics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Overall Progress</span>
                          <span>{selectedCourse.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${selectedCourse.progress}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Assignments</span>
                          <span>
                            {selectedCourse.completedAssignments}/
                            {selectedCourse.assignments}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedCourse.completedAssignments /
                                  selectedCourse.assignments) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Course Materials
                    </h3>
                    <div className="space-y-3">
                      {(selectedCourse.materials || []).map(
                        (material, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              {material.type === "pdf" && (
                                <FileText className="h-5 w-5 text-red-500 mr-3" />
                              )}
                              {material.type === "video" && (
                                <Video className="h-5 w-5 text-blue-500 mr-3" />
                              )}
                              {material.type === "note" && (
                                <Book className="h-5 w-5 text-green-500 mr-3" />
                              )}
                              <span className="text-sm text-gray-900">
                                {material.name}
                              </span>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-700">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <BarChart2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Course
                  </h3>
                  <p className="text-gray-600">
                    Choose a course to view details and track progress
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
