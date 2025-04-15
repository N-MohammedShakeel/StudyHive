// frontend/src/api/userApi.js
const API_URL = "http://localhost:5000/api/user";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid response from server", error);
  }
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch user profile");
  return data;
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid response from server");
  }
  if (!response.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

export const addPassword = async ({ newPassword }) => {
  // Destructure to ensure correct property
  const token = localStorage.getItem("token");
  if (!newPassword || typeof newPassword !== "string") {
    throw new Error("New password must be a non-empty string");
  }
  const response = await fetch(`${API_URL}/add-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword }),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid response from server");
  }
  if (!response.ok) throw new Error(data.message || "Failed to add password");
  return data;
};

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid response from server");
  }
  if (!response.ok)
    throw new Error(data.message || "Failed to change password");
  return data;
};

export const deleteAccount = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/account`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid response from server");
  }
  if (!response.ok) throw new Error(data.message || "Failed to delete account");
  return data;
};
