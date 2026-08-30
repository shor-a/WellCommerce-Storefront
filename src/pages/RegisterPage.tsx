import RegisterForm from "@/components/forms/RegisterForm"
import { PageRoutes } from "@/config/routes"
import { allUsers } from "@/constants/loginConst"
import type { RegisterData, RegisterResponse } from "@/constants/registerConst"
import { StatusCodes } from "http-status-codes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()

  const [registerState, setRegister] = useState<RegisterResponse>()

  const handleRegister = (regData: RegisterData) => {
    const regRes: RegisterResponse = {
      status: StatusCodes.OK,
      message: "Registration success",
    }

    // if (registerRes.status === StatusCodes.OK) {
    allUsers.push(regData)
    setRegister(regRes)
    navigate(PageRoutes.LOGIN)
    // }
  }

  return (
    <RegisterForm
      registerState={registerState}
      handleRegister={handleRegister}
    />
  )
}

export default RegisterPage
