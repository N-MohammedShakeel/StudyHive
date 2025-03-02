// frontend/src/Router.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyGroups from "./pages/StudyGroups";
import Courses from "./pages/Courses";
import GroupRoom from "./components/GroupRoom";
import Profile from "./pages/Profile";

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
      <Route path="/profile" element={<Profile />} /> {/* New */}
      <Route path="/auth/google/success" element={<Login />} />
    </Routes>
  );
};

export default RouterConfig;
