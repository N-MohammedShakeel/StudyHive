// frontend/src/api/fileApi.js
const API_URL = "http://localhost:5000/api/files";

export const getFiles = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch files");
  return data;
};

export const uploadFile = async (groupId, file, accessToken) => {
  const token = localStorage.getItem("token");
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const fileData = fileReader.result.split(",")[1]; // Base64 data
        if (!fileData) throw new Error("File data is empty");
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            groupId,
            fileName: file.name,
            fileData,
            accessToken,
          }),
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to upload file");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = () => reject(new Error("File reading failed"));
    fileReader.readAsDataURL(file);
  });
};

export const deleteFile = async (fileId, accessToken) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${fileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accessToken }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete file");
  return data;
};
