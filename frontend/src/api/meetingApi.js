// frontend/src/api/meetingApi.js
const API_URL = "http://localhost:5000/api/meetings";

export const getMeetings = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch meetings");
  return data;
};

export const createMeeting = async (groupId, dateTime) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId, dateTime }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create meeting");
  return data;
};

export const updateMeeting = async (meetingId, dateTime) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ meetingId, dateTime }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update meeting");
  return data;
};

export const deleteMeeting = async (meetingId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${meetingId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete meeting");
  return data;
};
