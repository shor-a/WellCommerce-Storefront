import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { SiGoogle, SiApple } from "@icons-pack/react-simple-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { PageRoutes } from "@/config/routes"

import loginBg from "@/assets/images/general/login_register.webp"
import smLoginBg from "@/assets/images/general/sm_login_register.webp"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  className?: string
  formSubmit: (data: LoginFormValues) => void
}

const LoginForm = ({ className, formSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  const handleTogglePassword = () => setShowPassword((v) => !v)

  return (
    <section
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-background",
        className
      )}
      aria-label="Login"
    >
      {/* Desktop full-bleed background — different element, hidden on mobile */}
      <img
        src={loginBg}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 hidden h-full w-full object-cover object-top lg:block"
        aria-hidden="true"
      />

      {/* Mobile hero image — different element, hidden on desktop */}
      <div className="relative h-[312px] w-full shrink-0 lg:hidden">
        <img
          src={smLoginBg}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-top"
          aria-hidden="true"
        />
      </div>

      {/* Card — single render, pulls up over mobile hero, pinned left on desktop */}
      <div className="relative -mt-6 rounded-t-3xl bg-background px-4 py-8 lg:absolute lg:inset-y-0 lg:mt-0 lg:flex lg:items-center lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
        <div className="mx-auto w-full max-w-[390px] lg:mx-0 lg:ml-[100px] lg:max-w-[480px]">
          <div className="flex w-full flex-col gap-6 rounded-[20px] border border-black/10 bg-white/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md lg:p-10">
            {/* Logo */}
            <div className="text-center">
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground lg:text-4xl lg:leading-none">
                WELLCOMMERCE
              </span>
            </div>

            {/* Heading + subtitle */}
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-heading text-lg leading-[42px] font-normal text-foreground lg:text-2xl lg:leading-[57px]">
                Welcome Back
              </p>
              {/* Different copy per breakpoint — hidden/block is correct here */}
              <p className="text-base text-muted-foreground lg:hidden">
                Sign in to continue shopping
              </p>
              <p className="hidden text-sm text-muted-foreground lg:block">
                Sign in to access your account and continue shopping.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(formSubmit)}
              noValidate
              className="flex flex-col gap-4 lg:gap-5"
            >
              {/* Email field */}
              <Field data-invalid={!!errors.email || undefined}>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                    <Mail className="size-5" strokeWidth={1.5} />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "h-10 rounded-full border-transparent bg-secondary pr-4 pl-12 text-base placeholder:text-muted-foreground",
                      "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    )}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <FieldError id="email-error">
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>

              {/* Password field */}
              <Field data-invalid={!!errors.password || undefined}>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                    <Lock className="size-5" strokeWidth={1.5} />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={cn(
                      "h-10 rounded-full border-transparent bg-secondary pr-12 pl-12 text-base placeholder:text-muted-foreground",
                      "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    )}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className={cn(
                      "absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground",
                      "transition-colors duration-150 hover:text-foreground",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    )}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" strokeWidth={1.5} />
                    ) : (
                      <Eye className="size-5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <FieldError id="password-error">
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex-2/6 flex-nowrap">
                  <Field orientation="horizontal">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="size-4 rounded-[4px] border-black/10 bg-secondary data-checked:border-foreground data-checked:bg-foreground"
                        />
                      )}
                    />
                    <FieldLabel
                      htmlFor="rememberMe"
                      className="cursor-pointer text-xs font-normal text-muted-foreground lg:text-sm"
                    >
                      Remember me
                    </FieldLabel>
                  </Field>
                </div>
                <div className="flex flex-4/6 justify-end">
                  <Link
                    to={PageRoutes.FORGOT_PASSWORD}
                    className="text-xs text-foreground underline-offset-4 transition-colors duration-150 hover:underline lg:text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Sign in button */}
              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="h-10 w-full rounded-full text-base transition-opacity duration-150"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* OR divider */}
            <FieldSeparator className="text-sm text-muted-foreground">
              OR
            </FieldSeparator>

            {/* Social logins */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full rounded-full border-black/10 bg-background text-base font-normal text-foreground hover:bg-secondary"
              >
                <SiGoogle className="size-[18px]" />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full rounded-full border-black/10 bg-background text-base font-normal text-foreground hover:bg-secondary"
              >
                <SiApple className="size-[18px]" />
                Continue with Apple
              </Button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-base text-muted-foreground lg:text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={PageRoutes.REGISTER}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
