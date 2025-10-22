import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskItem({ task, onDelete, onToggle }) {
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setError("");
    try {
      await onToggle(task.id);
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDelete = async () => {
    setError("");
    try {
      await onDelete(task.id);
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="py-4 flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg px-3 transition"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mr-3 w-5 h-5 accent-indigo-600 dark:accent-indigo-400"
        />
        <span
          className={`text-lg ${
            task.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {task.title}
        </span>
        {task.category && (
          <span
            className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: task.category.color }}
          >
            {task.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold text-lg"
          aria-label={`Delete task ${task.title}`}
        >
          ×
        </button>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </motion.li>
  );
}
