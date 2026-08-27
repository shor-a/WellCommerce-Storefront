import LoginForm from "@/components/forms/LoginForm"

const LoginPage = () => {
  const handleLogin = (loginData: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    // auth logic
  }

  return <LoginForm formSubmit={handleLogin} />
}

export default LoginPage
