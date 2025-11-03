import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // for showing messages like “Fetched 10 emails”

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

  // 🧠 Load emails from database
  const loadEmails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_URL}/api/emails`);
      setEmails(res.data.emails || []);
    } catch (err) {
      console.error("Error loading emails:", err);
      setError("Failed to load emails");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fetch new emails from Gmail and then reload from DB
  const refreshEmails = async () => {
    try {
      setLoading(true);
      setStatus("Fetching latest Gmail messages...");
      const res = await axios.get(`${API_URL}/api/fetch-emails`);
      console.log("Fetch response:", res.data);
      setStatus(`Fetched ${res.data.fetched || 0} new, skipped ${res.data.skipped || 0}`);
      await loadEmails();
    } catch (err) {
      console.error("Error refreshing emails:", err);
      setError("Failed to refresh emails — try reauthenticating.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmails();
  }, []);

  const containerStyle = {
    fontFamily: "Inter, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white",
    padding: "2rem",
    textAlign: "center",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem 1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    textAlign: "left",
    transition: "transform 0.2s ease",
  };

  const buttonStyle = {
    background: "#00bcd4",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "background 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1>🎵 Beat Tracker Dashboard</h1>
      <p style={{ opacity: 0.8 }}>Track your sent beats straight from Gmail.</p>

      {loading && <p>Loading...</p>}
      {status && <p style={{ color: "#00e5ff" }}>{status}</p>}
      {error && <p style={{ color: "#ff7675" }}>{error}</p>}

      {Array.isArray(emails) && emails.length > 0 ? (
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
          {emails.map((email) => (
            <div key={email.id} style={cardStyle}>
              <strong>From:</strong> {email.sender} <br />
              <strong>Subject:</strong> {email.subject || "No subject"} <br />
              <strong>Snippet:</strong>{" "}
              {email.body?.slice(0, 100) || "No content"}...
              <br />
              <em>
                Received: {new Date(email.received_at).toLocaleString()}
              </em>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No emails found.</p>
      )}

      <button
        onClick={refreshEmails}
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.background = "#0097a7")}
        onMouseOut={(e) => (e.target.style.background = "#00bcd4")}
      >
        🔄 Refresh Emails
      </button>
    </div>
  );
};

export default Dashboard;
