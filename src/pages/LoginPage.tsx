import LoginForm from "@/components/forms/LoginForm"
import { PageRoutes } from "@/config/routes"
import {
  allUsers,
  type LoginResponse,
  type LoginType,
} from "@/constants/loginConst"
import { StatusCodes } from "http-status-codes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [loginState, setLogin] = useState<LoginResponse>()
  const navigate = useNavigate()

  const handleLogin = async ({ email, password }: LoginType) => {
    const matchAccount = allUsers.filter(
      (user) => user.email === email && user.password === password
    )
    if (matchAccount) {
      localStorage.setItem("authenticated", "true")
      localStorage.setItem("authUser", matchAccount[0].fullName)
      setLogin({
        status: StatusCodes.OK,
        message: "Login successful!",
      })

      return navigate(PageRoutes.HOME)
    }

    return setLogin({
      status: StatusCodes.UNAUTHORIZED,
      message: "Login failed, check credentials!",
    })
  }

  return <LoginForm loginState={loginState} formSubmit={handleLogin} />
}

export default LoginPage
