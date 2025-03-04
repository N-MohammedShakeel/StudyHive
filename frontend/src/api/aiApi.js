// frontend/src/api/aiApi.js
const API_URL = "http://localhost:5000/api/ai";

export const summarizeContent = async (content) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to summarize content");
  return data.summary;
};

export const generateStudyPlan = async (interests, duration) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/study-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ interests, duration }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to generate study plan");
  return data.plan;
};

export const explainTopic = async (topic) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ topic }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to explain topic");
  return data.explanation;
};
