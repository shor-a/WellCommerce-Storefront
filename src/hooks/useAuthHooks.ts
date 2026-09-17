import { useNavigate } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem("authenticated")
  const navigate = useNavigate()

  /** Run callback if authenticated, otherwise redirect to login */
  const requireAuth = (callback: () => void) => {
    if (isAuthenticated) {
      callback()
    } else {
      navigate(PageRoutes.LOGIN)
    }
  }

  return { isAuthenticated, requireAuth }
}

export default useAuth
