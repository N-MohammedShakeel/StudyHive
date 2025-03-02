// frontend/src/components/Common/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  User as UserIcon,
  GraduationCap,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navItems = [
    {
      icon: <LayoutDashboard size={24} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <Users size={24} />, label: "Groups", path: "/groups" },
    { icon: <BookOpen size={24} />, label: "Courses", path: "/courses" },
    { icon: <UserIcon size={24} />, label: "Profile", path: "/profile" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        w-64
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">StudyHive</span>
            </Link>
          </div>

          <nav className="flex-1 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : ""
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <Link
              to="/profile"
              className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "User"
                  )}`
                }
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "email@example.com"}
                </p>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className="mt-2 w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
