import { useEffect, useState } from "react";

const API_BASE = "https://to-do-list-backend-f8xd.onrender.com/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API_BASE}/tasks`);
    setTasks(await res.json());
  };

  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE}/categories`);
    setCategories(await res.json());
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName, color: "#4f46e5" }),
    });
    setNewCategoryName("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
          📝 To-Do List
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div className="flex gap-2 flex-wrap mb-3">
            {categories.length === 0 && (
              <span className="text-gray-400 italic">No categories yet</span>
            )}
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-white font-semibold text-sm"
                style={{ backgroundColor: cat.color }}
              >
                <span>{cat.name}</span>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-white hover:text-gray-200 font-bold"
                  aria-label={`Delete category ${cat.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-grow px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={addCategory}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-xl transition shadow-md"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add new task..."
              className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={addTask}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-xl transition shadow-md"
            >
              Add
            </button>
          </div>

          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto rounded-lg">
            {tasks.length === 0 && (
              <li className="text-center text-gray-400 py-6 italic select-none">
                No tasks yet. Add something to get started!
              </li>
            )}

            {tasks.map((task) => (
              <li
                key={task.id}
                className="py-4 flex items-center justify-between hover:bg-indigo-50 rounded-lg px-3 transition"
              >
                <span
                  className={`text-lg ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 text-lg font-bold"
                  aria-label={`Delete task ${task.title}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
