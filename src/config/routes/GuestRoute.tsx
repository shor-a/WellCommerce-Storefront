import { Navigate, Outlet } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

/** Redirects authenticated users away from login/register back to home */
export const GuestRoute = () => {
  const isAuthenticated = !!localStorage.getItem("authenticated")

  if (isAuthenticated) {
    return <Navigate to={PageRoutes.HOME} replace />
  }

  return <Outlet />
}

export default GuestRoute
