import { useNavigate, useLocation } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem("authenticated")
  const navigate = useNavigate()
  const location = useLocation()

  /** Run callback if authenticated, otherwise redirect to login preserving the origin path */
  const requireAuth = (callback: () => void) => {
    if (isAuthenticated) {
      callback()
    } else {
      navigate(PageRoutes.LOGIN, { state: { from: location.pathname } })
    }
  }

  return { isAuthenticated, requireAuth }
}

export default useAuth
