const API_BASE = "https://to-do-list-backend-f8xd.onrender.com/api";

export const getTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
};

export const addTask = async (title) => {
  return fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
};

export const deleteTask = async (id) => {
  return fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
};

export const addCategory = async (name) => {
  return fetch(`${API_BASE}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color: "#4f46e5" }),
  });
};

export const deleteCategory = async (id) => {
  return fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
};
