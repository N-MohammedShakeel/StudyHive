// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("./config/dotenv");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const groupRoutes = require("./routes/groupRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes"); // New
const passport = require("./config/authConfig");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/user", userRoutes); // New

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
