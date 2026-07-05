import { useState, useEffect } from "react"
import { fetchTasks } from "../api/taskApi"

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return { tasks, isLoading, error, setTasks }
}