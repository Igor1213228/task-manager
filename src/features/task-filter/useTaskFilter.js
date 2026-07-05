import { useState, useMemo } from "react"

export function useTaskFilter(tasks) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // all | completed | active

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (statusFilter === "completed") return task.completed
        if (statusFilter === "active") return !task.completed
        return true
      })
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [tasks, searchQuery, statusFilter])

  return { searchQuery, setSearchQuery, statusFilter, setStatusFilter, filteredTasks }
}