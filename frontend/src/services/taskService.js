import { apiRequest } from "./api";

export const getTasks = () => apiRequest("/api/tasks");
export const getTask = (id) => apiRequest(`/api/tasks/${id}`);
export const createTask = (task) =>
  apiRequest("/api/tasks", { method: "POST", body: JSON.stringify(task) });
export const updateTask = (id, task) =>
  apiRequest(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) });
export const deleteTask = (id) =>
  apiRequest(`/api/tasks/${id}`, { method: "DELETE" });
