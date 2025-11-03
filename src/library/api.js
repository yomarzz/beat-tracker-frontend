const API_URL = process.env.REACT_APP_API_URL;

export async function getEmails() {
  const res = await fetch(`${API_URL}/api/emails`);
  if (!res.ok) throw new Error("Failed to load emails");
  return res.json();
}

export async function fetchNewEmails() {
  const res = await fetch(`${API_URL}/api/fetch-emails`);
  if (!res.ok) throw new Error("Failed to fetch emails from Gmail");
  return res.json();
}

export function authUrl() {
  return `${API_URL}/auth/google`;
}
