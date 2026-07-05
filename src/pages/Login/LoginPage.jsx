import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../features/auth/model/AuthContext"

function LoginPage() {
  const [name, setName] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    login(name)
    navigate("/")
  }

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default LoginPage