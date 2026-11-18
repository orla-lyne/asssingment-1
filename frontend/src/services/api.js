const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem("task_manager_token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({
    success: false,
    message: "The server returned an invalid response",
  }));

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("task_manager_token");
      localStorage.removeItem("task_manager_user");
    }
    throw new Error(data.message || "Request failed");
  }

  return data;
};

