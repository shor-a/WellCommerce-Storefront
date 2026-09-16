import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { allUsers } from "@/constants/loginConst"
import {
  zodChangePasswordSchema,
  type ZodChangePasswordType,
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

const EyeToggle = ({
  show,
  onToggle,
  fieldId,
}: {
  show: boolean
  onToggle: () => void
  fieldId: string
}) => (
  <button
    type="button"
    aria-label={show ? "Hide password" : "Show password"}
    aria-controls={fieldId}
    onClick={onToggle}
    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
  >
    {show ? (
      <EyeOff strokeWidth={1.75} className="size-4" />
    ) : (
      <Eye strokeWidth={1.75} className="size-4" />
    )}
  </button>
)

export const SettingsChangePasswordForm = () => {
  const user = allUsers[0]
  const [saved, setSaved] = useState(false)
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ZodChangePasswordType>({
    resolver: zodResolver(zodChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: ZodChangePasswordType) => {
    if (data.currentPassword !== user.password) {
      setServerError("Current password is incorrect.")
      return
    }
    setServerError("")
    user.password = data.newPassword
    reset()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      {serverError && (
        <p
          role="alert"
          className="rounded-xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
        >
          {serverError}
        </p>
      )}

      <FieldRow
        id="currentPassword"
        label="Current Password"
        error={errors.currentPassword?.message}
      >
        <div className="relative">
          <Input
            id="currentPassword"
            type={show.current ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10"
            aria-describedby={
              errors.currentPassword ? "currentPassword-error" : undefined
            }
            aria-invalid={!!errors.currentPassword}
            {...register("currentPassword")}
          />
          <EyeToggle
            show={show.current}
            onToggle={() => setShow((s) => ({ ...s, current: !s.current }))}
            fieldId="currentPassword"
          />
        </div>
      </FieldRow>

      <FieldRow
        id="newPassword"
        label="New Password"
        error={errors.newPassword?.message}
      >
        <div className="relative">
          <Input
            id="newPassword"
            type={show.new ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-describedby={
              errors.newPassword ? "newPassword-error" : undefined
            }
            aria-invalid={!!errors.newPassword}
            {...register("newPassword")}
          />
          <EyeToggle
            show={show.new}
            onToggle={() => setShow((s) => ({ ...s, new: !s.new }))}
            fieldId="newPassword"
          />
        </div>
      </FieldRow>

      <FieldRow
        id="confirmPassword"
        label="Confirm New Password"
        error={errors.confirmPassword?.message}
      >
        <div className="relative">
          <Input
            id="confirmPassword"
            type={show.confirm ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <EyeToggle
            show={show.confirm}
            onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
            fieldId="confirmPassword"
          />
        </div>
      </FieldRow>

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
          variant="default"
          className="rounded-full"
          disabled={!isDirty}
        >
          Update Password
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

export default SettingsChangePasswordForm
