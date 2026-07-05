import { useTasks } from "../../entities/task/model/useTasks"

function groupTasksByDate(tasks) {
  const groups = {}
  tasks.forEach((task) => {
    const date = task.dueDate || "Без даты"
    if (!groups[date]) groups[date] = []
    groups[date].push(task)
  })
  return groups
}

function CalendarPage() {
  const { tasks, isLoading, error } = useTasks()

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error}</p>

  const grouped = groupTasksByDate(tasks)
  const sortedDates = Object.keys(grouped).sort()

  return (
    <div>
      <h1>Календарь задач</h1>
      {sortedDates.map((date) => (
        <div key={date} style={{ marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "2px solid #333", paddingBottom: "4px" }}>
            {date}
          </h3>
          {grouped[date].map((task) => (
            <div key={task.id} style={{ padding: "6px 0", display: "flex", gap: "8px", alignItems: "center" }}>
              <span>{task.dueTime || "—"}</span>
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CalendarPage