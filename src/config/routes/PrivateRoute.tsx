import { Navigate, Outlet, useLocation } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

/** Redirects to /login if not authenticated, preserving the intended path in state */
export const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("authenticated")
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PageRoutes.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute
