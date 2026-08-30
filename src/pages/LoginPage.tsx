import LoginForm from "@/components/forms/LoginForm"
import { PageRoutes } from "@/config/routes"
import {
  type LoginResponse,
  demoEmail,
  demoPassword,
  type LoginType,
} from "@/constants/loginConst"
import { StatusCodes } from "http-status-codes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [loginState, setLogin] = useState<LoginResponse>()
  const navigate = useNavigate()

  const handleLogin = async ({ email, password }: LoginType) => {
    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem("authenticated", "true")
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
