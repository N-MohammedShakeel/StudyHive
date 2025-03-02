// frontend/src/components/Common/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          StudyHive
        </Link>
        <div>
          <Link
            to="/login"
            className="mr-4 text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-indigo-600">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
