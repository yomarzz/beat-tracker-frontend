import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth-status`);
        if (res.data.authenticated) {
          console.log("✅ User already authenticated, redirecting...");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1>🎵 Beat Tracker</h1>
      <p>Sign in to sync your Gmail and automatically track your beats.</p>
      <a href={`${API_URL}/auth/google`}>
        <button
          style={{
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </a>
    </div>
  );
}
