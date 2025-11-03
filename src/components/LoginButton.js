export default function LoginButton() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

  return (
    <a href={`${API_URL}/auth/google`}>
      <button
        style={{
          padding: "10px 20px",
          background: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "16px",
        }}
      >
        Sign in with Google
      </button>
    </a>
  );
}
