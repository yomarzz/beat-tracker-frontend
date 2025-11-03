import React, { useEffect, useState } from "react";
import axios from "axios";

const Emails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";
  console.log("API_URL in use:", API_URL);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError("");
      await axios.get(`${API_URL}/api/fetch-emails`);
      const response = await axios.get(`${API_URL}/api/emails`);
      setEmails(response.data);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setError("Failed to load emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div
      className="emails-container"
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🎵 Beat Tracker Dashboard
      </h2>

      {/* 🔄 Refresh Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <button
          onClick={fetchEmails}
          disabled={loading}
          style={{
            padding: "0.6rem 1.2rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4F46E5",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease"
          }}
        >
          {loading ? "Refreshing..." : "🔄 Refresh Emails"}
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading emails...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && !error && emails.length === 0 && (
        <p style={{ textAlign: "center" }}>No emails found. Try refreshing.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {emails.map((email) => (
          <li
            key={email.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>From:</strong> {email.sender}
            </p>
            <p>
              <strong>Subject:</strong> {email.subject}
            </p>
            <p>
              <strong>Snippet:</strong> {email.body}
            </p>
            <p>
              <em>Received At:</em>{" "}
              {new Date(email.received_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      <footer
        style={{
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "#777",
        }}
      >
        Built by JJ | © 2025 Beat Tracker
      </footer>
    </div>
  );
};

export default Emails;
