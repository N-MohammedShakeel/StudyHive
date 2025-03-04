// frontend/src/components/StudyResources.jsx
import React, { useState, useEffect } from "react";
import { Upload, Download, Trash2 } from "lucide-react";
import { getFiles, uploadFile, deleteFile } from "../api/fileApi";

const StudyResources = ({ groupId, currentUserId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const fetchedFiles = await getFiles(groupId);
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Failed to load files:", error);
        setError(error.message);
      }
    };
    loadFiles();
  }, [groupId]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(""); // Clear previous errors
    try {
      const uploadedFile = await uploadFile(groupId, file);
      setFiles((prev) => [...prev, uploadedFile]);
    } catch (error) {
      console.error("Failed to upload file:", error);
      setError(error.message); // Display error to user
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId, fileName) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(fileId);
        setFiles((prev) => prev.filter((f) => f._id !== fileId));
      } catch (error) {
        console.error("Failed to delete file:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
        <label className="cursor-pointer text-indigo-600 hover:text-indigo-700">
          <Upload className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-2">
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm text-gray-900">{file.name}</span>
              <div className="flex space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  <Download className="h-5 w-5" />
                </a>
                {file.userId === currentUserId && (
                  <button
                    onClick={() => handleDeleteFile(file._id, file.name)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No resources shared yet</p>
        )}
      </div>
    </div>
  );
};

export default StudyResources;
