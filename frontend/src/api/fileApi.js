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

export const uploadFile = async (groupId, file) => {
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
          body: JSON.stringify({ groupId, fileName: file.name, fileData }),
        });
        if (!response.ok) {
          const text = await response.text(); // Get raw response
          try {
            const data = JSON.parse(text);
            throw new Error(
              data.message || `Upload failed with status ${response.status}`
            );
          } catch {
            throw new Error(`Upload failed: ${text}`);
          }
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = () => reject(new Error("File reading failed"));
    fileReader.readAsDataURL(file);
  });
};

export const deleteFile = async (fileId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${fileId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete file");
  return data;
};
