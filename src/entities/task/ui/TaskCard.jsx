import { useState } from "react"
import { updateTask, deleteTask } from "../api/taskApi"

function isOverdue(task) {
  if (task.completed || !task.dueDate) return false
  const deadline = new Date(`${task.dueDate}T${task.dueTime || "23:59"}`)
  return deadline < new Date()
}
function isDueSoon(task) {
  if (task.completed || !task.dueDate) return false
  const deadline = new Date(`${task.dueDate}T${task.dueTime || "23:59"}`)
  const now = new Date()
  const hoursLeft = (deadline - now) / (1000 * 60 * 60)
  return hoursLeft > 0 && hoursLeft <= 24
}

function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const overdue = isOverdue(task)
  const dueSoon = isDueSoon(task)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    dueTime: task.dueTime,
  })

  async function handleToggleCompleted() {
    const updated = await updateTask(task.id, { completed: !task.completed })
    onTaskUpdated(updated)
  }

  async function handleDelete() {
    await deleteTask(task.id)
    onTaskDeleted(task.id)
  }

  function handleEditChange(e) {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSaveEdit() {
    const updated = await updateTask(task.id, editData)
    onTaskUpdated(updated)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px" }}>
        <input name="title" value={editData.title} onChange={handleEditChange} />
        <input name="description" value={editData.description} onChange={handleEditChange} />
        <input type="date" name="dueDate" value={editData.dueDate} onChange={handleEditChange} />
        <input type="time" name="dueTime" value={editData.dueTime} onChange={handleEditChange} />
        <button onClick={handleSaveEdit}>Сохранить</button>
        <button onClick={() => setIsEditing(false)}>Отмена</button>
      </div>
    )
  }

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px 16px",
      marginBottom: "8px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompleted}
          style={{ marginTop: "6px" }}
        />
        <div>
          <h3 style={{ margin: 0, textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </h3>
          <p style={{ margin: "4px 0", color: "#666" }}>{task.description}</p>
          <small style={{
            color: overdue ? "#e53935" : dueSoon ? "#f9a825" : "#999",
            fontWeight: (overdue || dueSoon) ? "bold" : "normal"
          }}>
            {task.dueDate} {task.dueTime}
            {overdue && " — Просрочено!"}
            {!overdue && dueSoon && " — Скоро дедлайн!"}
          </small>
        </div>
      </div>
      <div>
        <button onClick={() => setIsEditing(true)}>Редактировать</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  )
}

export default TaskCard