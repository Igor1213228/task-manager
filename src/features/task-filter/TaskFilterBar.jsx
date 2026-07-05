function TaskFilterBar({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Поиск задач..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1, padding: "6px 10px" }}
      />

      <button
        onClick={() => onStatusFilterChange("all")}
        style={{ fontWeight: statusFilter === "all" ? "bold" : "normal" }}
      >
        Все
      </button>
      <button
        onClick={() => onStatusFilterChange("active")}
        style={{ fontWeight: statusFilter === "active" ? "bold" : "normal" }}
      >
        Невыполненные
      </button>
      <button
        onClick={() => onStatusFilterChange("completed")}
        style={{ fontWeight: statusFilter === "completed" ? "bold" : "normal" }}
      >
        Выполненные
      </button>
    </div>
  )
}

export default TaskFilterBar