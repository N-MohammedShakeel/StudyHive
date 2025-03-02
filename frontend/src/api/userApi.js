// frontend/src/api/userApi.js
const API_URL = "http://localhost:5000/api/user";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
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
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

export const addPassword = async (newPassword) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/add-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword }),
  });
  const data = await response.json();
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
  const data = await response.json();
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
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete account");
  return data;
};
