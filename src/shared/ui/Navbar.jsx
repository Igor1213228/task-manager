import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../features/auth/model/AuthContext"

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <nav style={{ display: "flex", gap: "16px", padding: "12px 16px", borderBottom: "1px solid #ddd", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
      <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? "#6366f1" : undefined, fontWeight: isActive ? "bold" : "normal" })}>Задачи</NavLink>
      <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? "#6366f1" : undefined, fontWeight: isActive ? "bold" : "normal" })}>Профиль</NavLink>
      <NavLink to="/calendar" style={({ isActive }) => ({ color: isActive ? "#6366f1" : undefined, fontWeight: isActive ? "bold" : "normal" })}>Календарь</NavLink>

      {isAuthenticated ? (
        <>
          <span style={{ marginLeft: "auto" }}>Привет, {user.name}!</span>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <NavLink to="/login" style={{ marginLeft: "auto" }}>Вход</NavLink>
      )}
    </nav>
  )
}

export default Navbar