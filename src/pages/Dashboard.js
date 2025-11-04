import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("INBOX");

  const fetchEmails = async (selectedLabel = "INBOX") => {
    try {
      setLoading(true);
      setLabel(selectedLabel);
      await axios.get(`${API_URL}/api/fetch-emails?label=${selectedLabel}`);
      const res = await axios.get(`${API_URL}/api/emails`);
      setEmails(res.data.emails || []);
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter(
    (e) =>
      e.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.sender?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      {/* 🔹 In-Dashboard Navigation */}
      <nav className="flex gap-3 mb-6 border-b border-gray-800 pb-2">
        <Link to="/dashboard" className="hover:text-indigo-400">
          Dashboard
        </Link>
        <Link to="/analytics" className="hover:text-indigo-400">
          Analytics
        </Link>
        <Link to="/storage" className="hover:text-indigo-400">
          Storage
        </Link>
        <Link to="/" className="ml-auto text-gray-400 hover:text-indigo-400">
          Logout
        </Link>
      </nav>

      <h1 className="text-2xl font-bold mb-4">📬 Beat Tracker Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => fetchEmails("INBOX")}
          className={`px-3 py-1 rounded ${
            label === "INBOX" ? "bg-indigo-600" : "bg-gray-800"
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => fetchEmails("SENT")}
          className={`px-3 py-1 rounded ${
            label === "SENT" ? "bg-indigo-600" : "bg-gray-800"
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => fetchEmails(label)}
          className="ml-auto bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-600"
        >
          🔄 Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Search beats or senders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-900 text-white"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredEmails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <div className="grid gap-3">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="p-3 rounded bg-gray-900 border border-gray-700 hover:border-indigo-500 transition"
            >
              <p className="text-indigo-400 font-semibold">{email.sender}</p>
              <p className="font-medium">{email.subject}</p>
              <p className="text-sm text-gray-400">
                {new Date(email.received_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
