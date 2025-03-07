// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const initSocket = require("./config/socket");
require("./config/dotenv");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const groupRoutes = require("./routes/groupRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const fileRoutes = require("./routes/fileRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const aiRoutes = require("./routes/aiRoutes");
const passport = require("./config/authConfig");

const app = express();
const server = require("http").createServer(app);
const io = initSocket(server);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/ai", aiRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
