import { useAuth } from "../../features/auth/model/AuthContext"

function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Профиль</h1>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "400px"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{user.name}</h3>
          <p style={{ margin: "4px 0 0", color: "#666" }}>Личный аккаунт</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage