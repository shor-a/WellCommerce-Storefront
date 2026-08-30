import type { RegisterData, RegisterResponse } from "@/constants/registerConst"

interface RegisterProps {
  className?: string
  registerState: RegisterResponse
  handleRegister: RegisterData
}

const RegisterForm = ({ registerState, handleRegister }: RegisterProps) => {
  return <div>RegisterForm</div>
}

export default RegisterForm
