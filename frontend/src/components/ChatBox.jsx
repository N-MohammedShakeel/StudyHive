// frontend/src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Trash2, Heart } from "lucide-react";
import io from "socket.io-client";
import {
  getMessages,
  createMessage,
  deleteMessage,
  reactToMessage,
} from "../api/chatApi";

const socket = io("http://localhost:5000", { withCredentials: true });

const ChatBox = ({ groupId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await getMessages(groupId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    loadMessages();

    socket.emit("joinGroup", groupId);

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("messageDeleted", (messageId) => {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    });

    socket.on("messageReacted", ({ messageId, userId, reaction }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId
            ? {
                ...m,
                reactions: [
                  ...m.reactions.filter((r) => r.userId.toString() !== userId),
                  { userId, reaction },
                ],
              }
            : m
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageDeleted");
      socket.off("messageReacted");
    };
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const message = await createMessage(groupId, newMessage);
      socket.emit("sendMessage", message);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      socket.emit("deleteMessage", { groupId, messageId });
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const handleReactToMessage = async (messageId) => {
    try {
      const reaction = "like";
      const data = await reactToMessage(messageId, reaction);
      socket.emit("reactToMessage", { groupId, ...data });
    } catch (error) {
      console.error("Failed to react to message:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Discussion</h2>
        <MessageSquare className="h-5 w-5 text-indigo-600" />
      </div>
      <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`mb-4 flex ${
                message.userId._id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.userId._id === currentUserId
                    ? "bg-indigo-100 text-indigo-900"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.userId.name}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {message.reactions.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {
                        message.reactions.filter((r) => r.reaction === "like")
                          .length
                      }{" "}
                      <Heart className="h-3 w-3 inline text-red-500" />
                    </span>
                  )}
                  {message.userId._id === currentUserId && (
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleReactToMessage(message._id)}
                    className="text-xs text-gray-500 hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </form>
    </div>
  );
};

export default ChatBox;
