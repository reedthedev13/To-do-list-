import { useEffect, useState } from "react";
import Header from "./components/header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CategoryManager from "./components/CategoryManager";
import {
  getTasks,
  getCategories,
  addTask,
  deleteTask,
  addCategory,
  deleteCategory,
} from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const [tasksData, categoriesData] = await Promise.all([
      getTasks(),
      getCategories(),
    ]);
    setTasks(tasksData);
    setCategories(categoriesData);
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    await addTask(title);
    setTitle("");
    refreshData();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    refreshData();
  };

  const handleToggleTask = async (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    // (Optional) send PATCH to backend later
  };

  const handleAddCategory = async (name) => {
    await addCategory(name);
    refreshData();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    refreshData();
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8">
        <Header />
        <CategoryManager
          categories={categories}
          onAdd={handleAddCategory}
          onDelete={handleDeleteCategory}
        />
        <TaskInput title={title} setTitle={setTitle} onAdd={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </div>
    </div>
  );
}

export default App;
