import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Emails from "./components/Emails"; // keep if still used inside Dashboard
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// 🆕 New imports for Phase 11 features
import Analytics from "./components/Analytics";
import Storage from "./components/Storage";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-950 text-white min-h-screen">
        {/* 🔹 Optional top navigation bar */}
        <nav className="flex gap-4 p-4 border-b border-gray-800 bg-gray-900">
          <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/analytics" className="hover:text-indigo-400">Analytics</Link>
          <Link to="/storage" className="hover:text-indigo-400">Storage</Link>
          <Link to="/" className="ml-auto text-gray-400 hover:text-indigo-400">Login</Link>
        </nav>

        {/* 🔹 Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
