// frontend/src/api/groupApi.js
const API_URL = "http://localhost:5000/api/groups";

export const fetchUserGroups = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch user groups");
  return data;
};

export const fetchPublicGroups = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch public groups");
  return data;
};

export const createGroup = async (groupData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create group");
  return data;
};

export const editGroup = async (groupData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to edit group");
  return data;
};

export const deleteGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${groupId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete group");
  return data;
};

export const joinGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to join group");
  return data;
};

export const removeMember = async (groupId, memberId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId, memberId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to remove member");
  return data;
};

export const blockMember = async (groupId, memberId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/block`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId, memberId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to block member");
  return data;
};

export const updateMemberRole = async (groupId, memberId, role) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId, memberId, role }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to update member role");
  return data;
};

export const getGroupMembers = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${groupId}/members`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch group members");
  return data;
};
