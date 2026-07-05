import { useState, useEffect } from "react"

export function useAuth() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  function login(name) {
    setUser({ name })
  }

  function logout() {
    setUser(null)
  }

  return { user, isAuthenticated: !!user, login, logout }
}