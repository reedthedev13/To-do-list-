export default function TaskInput({ title, setTitle, onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add new task..."
        className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <button
        onClick={onAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-xl transition shadow-md"
      >
        Add
      </button>
    </div>
  );
}
