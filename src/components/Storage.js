// ✅ All imports grouped here
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

export default function Storage() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const res = await axios.get(`${API_URL}/api/storage`);
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`${API_URL}/api/upload`, formData);
    await fetchFiles();
    setFile(null);
    setUploading(false);
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <Link to="/dashboard" className="text-indigo-400 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-4">💾 Beat & Session Storage</h1>

      <form onSubmit={handleUpload} className="flex gap-2 mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-gray-900 p-2 rounded"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f.id} className="p-3 bg-gray-900 border border-gray-700 rounded">
              <p>{f.file_name}</p>
              <p className="text-sm text-gray-400">
                Uploaded: {new Date(f.uploaded_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
