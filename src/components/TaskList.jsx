import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskList({ tasks, onDelete, onToggle }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercent =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden mb-2">
        <motion.div
          className="bg-indigo-600 dark:bg-indigo-400 h-4"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {totalTasks > 0 && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {completedTasks} of {totalTasks} tasks completed (
          {Math.round(completionPercent)}%)
        </p>
      )}

      {/* Task List */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto rounded-lg">
        {tasks.length === 0 && (
          <li className="text-center text-gray-400 dark:text-gray-500 py-6 italic select-none">
            No tasks yet. Add something to get started!
          </li>
        )}

        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
