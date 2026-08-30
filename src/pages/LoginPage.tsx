import LoginForm from "@/components/forms/LoginForm"
import { PageRoutes } from "@/config/routes"
import {
  type ZodLoginType,
  type LoginResponse,
  demoEmail,
  demoPassword,
} from "@/constants/loginConst"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [loginState, setLogin] = useState<LoginResponse>()
  const navigate = useNavigate()

  const handleLogin = async ({ email, password }: ZodLoginType) => {
    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem("authenticated", "true")
      setLogin({
        status: "200",
        message: "Success",
      })

      return navigate(PageRoutes.HOME)
    }

    return setLogin({
      status: "404",
      message: "Wrong username or password entered!",
    })
  }

  return <LoginForm loginState={loginState} formSubmit={handleLogin} />
}

export default LoginPage
