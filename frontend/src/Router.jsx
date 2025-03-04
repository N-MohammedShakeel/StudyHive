// frontend/src/Router.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyGroups from "./pages/StudyGroups";
import Courses from "./pages/Courses";
import GroupRoom from "./components/GroupRoom";
import Profile from "./pages/Profile";

const GoogleSuccessRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", decodeURIComponent(user));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return null;
};

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/groups" element={<StudyGroups />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/group/:id" element={<GroupRoom />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth/google/success" element={<GoogleSuccessRedirect />} />
    </Routes>
  );
};

export default RouterConfig;
