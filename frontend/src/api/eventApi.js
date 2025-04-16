// frontend/src/api/eventApi.js
const API_URL = "http://localhost:5000/api/events";

export const fetchEvents = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch events");
  return data;
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create event");
  return data;
};

export const updateEvent = async (id, eventData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update event");
  return data;
};

export const deleteEvent = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete event");
  return data;
};
