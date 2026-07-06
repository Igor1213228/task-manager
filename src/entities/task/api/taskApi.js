import axios from "axios"

const BASE_URL = "https://task-manager-2gfe.onrender.com/tasks"

export async function fetchTasks() {
  const response = await axios.get(BASE_URL)
  return response.data
}

export async function createTask(task) {
  const response = await axios.post(BASE_URL, task)
  return response.data
}

export async function updateTask(id, updatedFields) {
  const response = await axios.patch(`${BASE_URL}/${id}`, updatedFields)
  return response.data
}

export async function deleteTask(id) {
  await axios.delete(`${BASE_URL}/${id}`)
}