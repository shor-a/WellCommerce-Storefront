import {
  zodRegisterSchema,
  type ZodRegisterType,
  type RegisterResponse,
} from "@/constants/registerConst"

import registerBg from "@/assets/images/general/login_register.webp"
import smRegisterBg from "@/assets/images/general/sm_login_register.webp"

import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import { cn } from "@/lib/utils"
import { StatusCodes } from "http-status-codes"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"
import { Controller, useForm } from "react-hook-form"
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  Phone,
  UserRound,
  ArrowLeft,
} from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

interface RegisterProps {
  className?: string
  registerState?: RegisterResponse
  handleRegister: (data: ZodRegisterType) => void
}

const RegisterForm = ({
  className,
  registerState,
  handleRegister,
}: RegisterProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZodRegisterType>({
    resolver: zodResolver(zodRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
    },
  })

  useEffect(() => {
    const _focusElement = document.getElementById("full-name")?.focus()
  }, [])

  return (
    <>
      <section
        className={cn("relative min-h-screen w-full bg-background", className)}
        aria-label="Login"
      >
        {/* Desktop full-bleed background  different element, hidden on mobile */}
        <img
          src={registerBg}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 hidden h-full w-full object-cover object-top lg:block"
          aria-hidden="true"
        />

        {/* Mobile hero image  different element, hidden on desktop */}
        <div className="relative h-[312px] w-full shrink-0 lg:hidden">
          <img
            src={smRegisterBg}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
            aria-hidden="true"
          />
        </div>

        {/* Card  title and welcome*/}
        <div className="relative -mt-6 rounded-t-3xl bg-background px-4 py-8 lg:absolute lg:inset-y-0 lg:mt-0 lg:flex lg:items-center lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
          <div className="mx-auto w-full max-w-[390px] lg:mx-0 lg:ml-[100px] lg:max-w-[480px]">
            <div className="flex max-h-[calc(100vh-2rem)] w-full flex-col gap-5 overflow-y-auto rounded-[20px] border border-black/10 bg-white/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md lg:p-10">
              {/* Logo  back arrow sits absolute-left, no effect on centering or height */}
              <div className="relative text-center">
                <Link
                  to={PageRoutes.HOME}
                  aria-label="Back to home"
                  className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
                >
                  <ArrowLeft strokeWidth={2.5} className="size-6" />
                </Link>
                <span className="font-heading text-2xl font-bold tracking-tight text-foreground lg:text-3xl lg:leading-none">
                  WELLCOMMERCE
                </span>
              </div>

              {/* Heading + subtitle */}
              <div className="flex flex-col items-center gap-2 text-center">
                {registerState ? (
                  registerState.status === StatusCodes.OK ? (
                    <p className="font-heading text-lg leading-[42px] font-normal text-foreground lg:text-xl lg:leading-[57px]">
                      {registerState.message}
                    </p>
                  ) : (
                    <p className="font-heading text-lg leading-[42px] font-normal text-foreground lg:text-xl lg:leading-[57px]">
                      {registerState.message}
                    </p>
                  )
                ) : (
                  <p className="font-heading text-lg leading-[42px] font-normal text-foreground lg:text-xl lg:leading-[57px]">
                    Create Account
                  </p>
                )}

                {/* Different copy per breakpoint  hidden/block is correct here */}
                <p className="text-base text-muted-foreground lg:hidden">
                  Discover your style
                </p>
                <p className="hidden text-sm text-muted-foreground lg:block">
                  Discover your perfect style
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit((data) => handleRegister(data))}
                noValidate
                className="flex flex-col gap-2 lg:gap-3"
              >
                {/* Full Name field */}
                <Field data-invalid={!!errors.fullName || undefined}>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                      <UserRound className="size-5" strokeWidth={1.5} />
                    </span>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={
                        errors.fullName ? "full-name-error" : undefined
                      }
                      className={cn(
                        "h-10 rounded-full border-transparent bg-secondary pr-4 pl-12 text-base placeholder:text-muted-foreground",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      )}
                      {...register("fullName")}
                    />
                  </div>
                  {errors.fullName && (
                    <FieldError id="full-name-error">
                      {<p className="text-xs">{errors.fullName?.message}</p>}
                    </FieldError>
                  )}
                </Field>

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
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
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

                {/* Phone field */}
                <Field data-invalid={!!errors.email || undefined}>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                      <Phone className="size-5" strokeWidth={1.5} />
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      autoComplete="mobile tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      className={cn(
                        "h-10 rounded-full border-transparent bg-secondary pr-4 pl-12 text-base placeholder:text-muted-foreground",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      )}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <FieldError id="phone-error">
                      {errors.phone?.message}
                    </FieldError>
                  )}
                </Field>

                {/* Password field */}
                <Field data-invalid={!!errors.password || undefined}>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                      <LockKeyholeOpen className="size-5" strokeWidth={1.5} />
                    </span>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="new-password"
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
                      onClick={() => setShowPassword((v) => !v)}
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

                {/* Confirm Password field */}
                <Field data-invalid={!!errors.confirmPassword || undefined}>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                      <LockKeyhole className="size-5" strokeWidth={1.5} />
                    </span>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirm-password-error"
                          : undefined
                      }
                      className={cn(
                        "h-10 rounded-full border-transparent bg-secondary pr-12 pl-12 text-base placeholder:text-muted-foreground",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      )}
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
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
                  {errors.confirmPassword && (
                    <FieldError id="current-password-error">
                      {errors.confirmPassword!.message}
                    </FieldError>
                  )}
                </Field>

                {/* Subscribe to newsletter */}
                <div className="flex items-center justify-between">
                  <div className="flex min-w-24 flex-col flex-nowrap gap-2 lg:min-w-28 lg:gap-3">
                    <Field orientation="horizontal">
                      <Controller
                        name="newsletter"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="check-newsletter"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-4 rounded-[4px] border-black/10 bg-secondary data-checked:border-foreground data-checked:bg-foreground"
                          />
                        )}
                      />
                      <FieldLabel
                        htmlFor="check-newsletter"
                        className="cursor-pointer text-xs font-normal text-muted-foreground"
                      >
                        Subscribe to get updates on new arrivals and exclusive
                        offers
                      </FieldLabel>
                    </Field>
                    <Field className="text-center">
                      <p className="text-xs text-muted-foreground">
                        By signing up you agree to our{" "}
                        <Link
                          to={PageRoutes.HOME}
                          className="text-xs text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
                        >
                          Terms of service and Privacy Policy
                        </Link>
                      </p>
                    </Field>
                  </div>
                </div>

                {/* Register button */}
                <Button
                  type="submit"
                  size="xl"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-full text-base transition-opacity duration-150"
                >
                  {isSubmitting ? "Registering..." : "Create Account"}
                </Button>
              </form>

              {/* OR divider */}
              <FieldSeparator className="gap-2 text-sm text-muted-foreground">
                OR
              </FieldSeparator>

              {/* Sign up link */}
              <p className="text-center text-base text-muted-foreground lg:text-sm">
                Already have an account?{" "}
                <Link
                  to={PageRoutes.LOGIN}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterForm
