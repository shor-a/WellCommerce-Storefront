import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { allUsers } from "@/constants/loginConst"
import {
  zodPersonalSchema,
  type ZodPersonalType,
} from "@/constants/settingsConst"

const FieldRow = ({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id} className="text-sm font-medium text-foreground">
      {label}
    </Label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
        {error}
      </p>
    )}
  </div>
)

export const SettingsPersonalInfoForm = () => {
  const user = allUsers[0]
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ZodPersonalType>({
    resolver: zodResolver(zodPersonalSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
    },
  })

  const onSubmit = (data: ZodPersonalType) => {
    Object.assign(user, {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    })
    localStorage.setItem("authUser", data.fullName)
    reset(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FieldRow
        id="fullName"
        label="Full Name"
        error={errors.fullName?.message}
      >
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
      </FieldRow>

      <FieldRow id="email" label="Email Address" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </FieldRow>

      <FieldRow id="phone" label="Phone Number" error={errors.phone?.message}>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </FieldRow>

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
          variant="default"
          className="rounded-full"
          disabled={!isDirty}
        >
          Save Changes
        </Button>
        <span
          aria-live="polite"
          className={cn(
            "flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity duration-300",
            saved ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Check strokeWidth={2.5} className="size-4" /> Saved
        </span>
      </div>
    </form>
  )
}

export default SettingsPersonalInfoForm
