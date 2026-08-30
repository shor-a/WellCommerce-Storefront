import { Controller, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusCodes } from "http-status-codes"

const zodLoginSchema = z.object({
  email: z.string().email("Input valid email address"),
  password: z.string().min(8, "Minimum 8 character"),
  rememberMe: z.boolean(),
})

type ZodLoginType = z.infer<typeof zodLoginSchema>

interface LoginResponse {
  status: StatusCodes
  message: string
}

const demoEmail = "demo@wellcommerce.com"
const demoPassword = "demopass"

const LoginFormSimple = () => {
  const [loginState, setLogin] = useState<LoginResponse>()
  const [togglePassword, setTogglePassword] = useState<boolean>(false)

  const login = async ({ email, password }: ZodLoginType) => {
    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem("authenticated", "true")
      return setLogin({
        status: StatusCodes.OK,
        message: "Success",
      })
    }

    return setLogin({
      status: StatusCodes.UNAUTHORIZED,
      message: "Wrong username or password entered!",
    })
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZodLoginType>({
    resolver: zodResolver(zodLoginSchema),
    defaultValues: {
      email: demoEmail,
      password: demoPassword,
      rememberMe: false,
    },
  })

  useEffect(() => {
    document.getElementById("email-input")?.focus()
  }, [])

  return (
    <>
      <div className="container m-30 max-w-100 min-w-100 border border-stone-500 p-10">
        <div className="just flex flex-col gap-5">
          <div className="flex flex-col flex-wrap gap-10">
            <h1 className="text-3xl">WELLCOMMERCE</h1>
            {loginState ? (
              loginState.status === StatusCodes.OK ? (
                <div className="border border-r-2 border-green-400 p-3">
                  <p className="text-md text-green-400">
                    You have successfully logged in
                  </p>
                </div>
              ) : (
                <div className="border border-r-2 border-red-400 p-3">
                  <p className="text-md text-red-400">
                    Wrong username or password entered!
                  </p>
                </div>
              )
            ) : (
              <p className="text-2xl">Login to your account</p>
            )}
          </div>

          <form id="form-login" onSubmit={handleSubmit((data) => login(data))}>
            <FieldGroup>
              <Field id="email-field">
                <Input
                  id="email-input"
                  aria-invalid={!!errors.email}
                  className="h-10 border-stone-700"
                  type="text"
                  placeholder="Email address..."
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError id="email-error">
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>

              <Field id="password-field">
                <Input
                  id="password-input"
                  aria-invalid={!!errors.password}
                  className="h-10 border-stone-700"
                  type={togglePassword ? "password" : "text"}
                  placeholder="Your password..."
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError id="password-error">
                    {errors.password.message}
                  </FieldError>
                )}
                <button
                  type="button"
                  className={cn(
                    "relative left-72 -translate-y-9 text-muted-foreground",
                    "transition-colors duration-150 hover:text-foreground",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                  )}
                  onClick={() => setTogglePassword((v) => !v)}
                >
                  {togglePassword ? (
                    <Eye className="size-4" strokeWidth="3" />
                  ) : (
                    <EyeOff className="size-4" strokeWidth="3" />
                  )}
                </button>
              </Field>

              <div className="flex justify-start gap-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      className="size-5 cursor-pointer border-black"
                      id="remember-me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel
                  className="cursor-pointer text-sm"
                  htmlFor="remember-me"
                >
                  Remember Me
                </FieldLabel>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  form="form-login"
                  className="h-10 w-25"
                  variant={"default"}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginFormSimple
