import { useState } from "react";

export default function CategoryManager({ categories, onAdd, onDelete }) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    onAdd(newCategory);
    setNewCategory("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
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
              onClick={() => onDelete(cat.id)}
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
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleAddCategory}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-xl transition shadow-md"
        >
          Add
        </button>
      </div>
    </div>
  );
}
