import { apiRequest } from "./api";

export const registerUser = (credentials) =>
  apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const loginUser = (credentials) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getCurrentUser = () => apiRequest("/api/auth/me");

export const logoutUser = () =>
  apiRequest("/api/auth/logout", { method: "POST" });
