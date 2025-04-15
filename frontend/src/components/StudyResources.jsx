import React, { useState, useEffect } from "react";
import { Upload, Download, Trash2 } from "lucide-react";
import { getFiles, uploadFile, deleteFile } from "../api/fileApi";

const StudyResources = ({ groupId, currentUserId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const fetchedFiles = await getFiles(groupId);
        setFiles(fetchedFiles);
      } catch (error) {
        setError(error.message);
      }
    };
    loadFiles();
  }, [groupId]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const uploadedFile = await uploadFile(groupId, file);
      setFiles((prev) => [...prev, uploadedFile]);
    } catch (error) {
      setError(error.message);
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
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-[var(--bg)] rounded-lg border border-[var(--text20)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">Resources</h2>
        <label className="cursor-pointer text-[var(--primary)] hover:text-[var(--primary85)]">
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
        <div className="mb-4 p-3 bg-[var(--error5)] text-[var(--error-text)] rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-2">
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="flex items-center justify-between p-3 bg-[var(--text5)] rounded-lg hover:bg-[var(--text10)] transition-colors"
            >
              <span className="text-sm text-[var(--text)]">{file.name}</span>
              <div className="flex space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:text-[var(--primary85)]"
                >
                  <Download className="h-5 w-5" />
                </a>
                {file.userId === currentUserId && (
                  <button
                    onClick={() => handleDeleteFile(file._id, file.name)}
                    className="text-[var(--error)] hover:text-[var(--error-text)]"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-[var(--text60)]">No resources shared yet</p>
        )}
      </div>
    </div>
  );
};

export default StudyResources;
