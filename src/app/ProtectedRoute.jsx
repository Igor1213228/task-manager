import { Navigate } from "react-router-dom"
import { useAuth } from "../features/auth/model/AuthContext"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute