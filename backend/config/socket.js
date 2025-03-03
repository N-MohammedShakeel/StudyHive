// backend/config/socket.js
const socketIo = require("socket.io");

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on("sendMessage", (data) => {
      io.to(data.groupId).emit("newMessage", data);
    });

    socket.on("deleteMessage", (data) => {
      io.to(data.groupId).emit("messageDeleted", data.messageId);
    });

    socket.on("reactToMessage", (data) => {
      io.to(data.groupId).emit("messageReacted", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
