<Link to="/dashboard" className="text-indigo-400 hover:underline">
  ← Back to Dashboard
</Link>

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/analytics`).then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">📊 Beat Analytics</h1>
      {data.length === 0 ? (
        <p>No analytics data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="sender" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_emails" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
