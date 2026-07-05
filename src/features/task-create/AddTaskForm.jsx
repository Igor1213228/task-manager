import { useState } from "react"
import { createEmptyTask } from "../../entities/task/model/task"
import { createTask } from "../../entities/task/api/taskApi"

function AddTaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState(createEmptyTask())

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newTask = await createTask(formData)
    onTaskCreated(newTask)
    setFormData(createEmptyTask())
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px" }}>
      <input
        type="text"
        name="title"
        placeholder="Название задачи"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <input
        type="time"
        name="dueTime"
        value={formData.dueTime}
        onChange={handleChange}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  )
}

export default AddTaskForm