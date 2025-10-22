import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TaskItem({ task, onDelete, onToggle }) {
  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState(true);

  useEffect(() => {
    // Briefly highlight the newly added task, then fade it out
    const timer = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timer);
  }, []);

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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }} // smoother ease curve
      layout
      className={`py-4 flex items-center justify-between rounded-lg px-3 transition-all ${
        highlight ? "bg-indigo-50" : "hover:bg-indigo-50"
      }`}
    >
      <div className="flex items-center">
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mr-3 w-5 h-5 accent-indigo-600 cursor-pointer"
        />
        <motion.span
          animate={{
            opacity: task.completed ? 0.6 : 1,
            x: task.completed ? 4 : 0,
          }}
          transition={{ duration: 0.2 }}
          className={`text-lg ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900 font-medium"
          }`}
        >
          {task.title}
        </motion.span>
        {task.category && (
          <span
            className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: task.category.color }}
          >
            {task.category.name}
          </span>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 font-bold text-lg transition-transform"
        aria-label={`Delete task ${task.title}`}
      >
        ×
      </motion.button>

      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium absolute right-4 bottom-1">
          {error}
        </p>
      )}
    </motion.li>
  );
}
