// frontend/src/api/chatApi.js
const API_URL = "http://localhost:5000/api/chat";

export const getMessages = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch messages");
  return data;
};

export const createMessage = async (groupId, content) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId, content }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create message");
  return data;
};

export const deleteMessage = async (messageId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${messageId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete message");
  return data;
};

export const reactToMessage = async (messageId, reaction) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/react`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ messageId, reaction }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to react to message");
  return data;
};
