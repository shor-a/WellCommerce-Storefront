import RegisterForm from "@/components/forms/RegisterForm"
import { PageRoutes } from "@/config/routes/routes"
import { allUsers } from "@/constants/loginConst"
import type {
  RegisterResponse,
  ZodRegisterType,
} from "@/constants/registerConst"
import { StatusCodes } from "http-status-codes"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [registerState, setRegister] = useState<RegisterResponse>()

  // Preserve the page the user originally tried to reach before being sent to auth
  const from = (location.state as { from?: string })?.from

  const handleRegister = (regData: ZodRegisterType) => {
    const regRes: RegisterResponse = {
      status: StatusCodes.OK,
      message: "Registration success",
    }

    allUsers.push(regData)
    setRegister(regRes)
    // Forward `from` so LoginPage can redirect back after the user signs in
    navigate(PageRoutes.LOGIN, { state: { from } })
  }

  return (
    <RegisterForm
      registerState={registerState}
      handleRegister={handleRegister}
      from={from}
    />
  )
}

export default RegisterPage
