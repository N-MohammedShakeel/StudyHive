import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white/50 backdrop-blur-lg shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-indigo-600">
          StudyHive
        </Link>
        <div>
          <Link
            to="/login"
            className="mr-4 p-3 text-gray-700 hover:text-indigo-600 border-2 border-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
