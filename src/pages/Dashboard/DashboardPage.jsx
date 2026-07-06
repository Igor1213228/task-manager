import { useState } from "react"
import { useTasks } from "../../entities/task/model/useTasks"
import TaskCard from "../../entities/task/ui/TaskCard"
import AddTaskForm from "../../features/task-create/AddTaskForm"
import Toast from "../../shared/ui/Toast"
import { useTaskFilter } from "../../features/task-filter/useTaskFilter"
import TaskFilterBar from "../../features/task-filter/TaskFilterBar"



function DashboardPage() {
  const { tasks, isLoading, error, setTasks } = useTasks()
  const [toastMessage, setToastMessage] = useState(null)

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredTasks,
  } = useTaskFilter(tasks)

  function handleTaskCreated(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask])
    setToastMessage("Задача добавлена")
  }

  function handleTaskUpdated(updatedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    )
    setToastMessage("Задача обновлена")
  }

  function handleTaskDeleted(deletedId) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== deletedId))
    setToastMessage("Задача удалена")
  }

  if (isLoading) {

    return <p>Загрузка задач...</p>
  }

  if (error) {
    return <p>Ошибка: {error}</p>
  }

  return (
    <div>
      <h1>Мои задачи</h1>
      <AddTaskForm onTaskCreated={handleTaskCreated} />
      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {filteredTasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-text-muted)" }}>
          <p style={{ fontSize: "18px" }}>Задач не найдено</p>
          <p>Попробуйте изменить фильтр или добавьте новую задачу</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  )
}

export default DashboardPage