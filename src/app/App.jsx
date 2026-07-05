import { Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import ProfilePage from "../pages/Profile/ProfilePage"
import CalendarPage from "../pages/Calendar/CalendarPage"
import LoginPage from "../pages/Login/LoginPage"
import NotFoundPage from "../pages/NotFound/NotFoundPage"
import Navbar from "../shared/ui/Navbar"
import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
   
      <>
      <Navbar />
      <div className="container" style={{ paddingTop: "24px" }}>
        <Routes> 

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
             }
            />
            <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
  </>
)
  
}

export default App