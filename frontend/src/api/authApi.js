// frontend/src/api/authApi.js
const API_URL = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Signup failed");
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};

// Store Google token after redirect
export const handleGoogleCallback = (token, user, accessToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("googleAccessToken", accessToken); // Store Google token
};
