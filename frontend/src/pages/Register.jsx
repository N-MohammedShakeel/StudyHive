// frontend/src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, BookOpen } from "lucide-react";
import { signup } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const interestsList = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Literature",
    "History",
    "Languages",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { token, user } = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        interests: formData.interests,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <BookOpen className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Join StudyHive</h2>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Study Interests
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestsList.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-2 text-sm rounded-md transition-colors ${
                    formData.interests.includes(interest)
                      ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
