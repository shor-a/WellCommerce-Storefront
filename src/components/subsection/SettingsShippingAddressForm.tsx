import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { defaultShippingAddress } from "@/constants/checkoutConst"
import {
  zodShippingSchema,
  type ZodShippingType,
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

export const SettingsShippingAddressForm = () => {
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ZodShippingType>({
    resolver: zodResolver(zodShippingSchema),
    defaultValues: {
      name: defaultShippingAddress.name,
      line1: defaultShippingAddress.line1,
      city: defaultShippingAddress.city,
      country: defaultShippingAddress.country,
      phone: defaultShippingAddress.phone,
    },
  })

  const onSubmit = (data: ZodShippingType) => {
    Object.assign(defaultShippingAddress, data)
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
      <FieldRow id="ship-name" label="Full Name" error={errors.name?.message}>
        <Input
          id="ship-name"
          type="text"
          autoComplete="shipping name"
          aria-describedby={errors.name ? "ship-name-error" : undefined}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </FieldRow>

      <FieldRow
        id="ship-phone"
        label="Phone Number"
        error={errors.phone?.message}
      >
        <Input
          id="ship-phone"
          type="tel"
          autoComplete="shipping tel"
          aria-describedby={errors.phone ? "ship-phone-error" : undefined}
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </FieldRow>

      <FieldRow
        id="ship-line1"
        label="Street Address"
        error={errors.line1?.message}
      >
        <Input
          id="ship-line1"
          type="text"
          autoComplete="shipping street-address"
          aria-describedby={errors.line1 ? "ship-line1-error" : undefined}
          aria-invalid={!!errors.line1}
          {...register("line1")}
        />
      </FieldRow>

      <FieldRow
        id="ship-city"
        label="City / State / ZIP"
        error={errors.city?.message}
      >
        <Input
          id="ship-city"
          type="text"
          autoComplete="shipping locality"
          aria-describedby={errors.city ? "ship-city-error" : undefined}
          aria-invalid={!!errors.city}
          {...register("city")}
        />
      </FieldRow>

      <FieldRow
        id="ship-country"
        label="Country"
        error={errors.country?.message}
      >
        <Input
          id="ship-country"
          type="text"
          autoComplete="shipping country-name"
          aria-describedby={errors.country ? "ship-country-error" : undefined}
          aria-invalid={!!errors.country}
          {...register("country")}
        />
      </FieldRow>

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
          variant="default"
          className="rounded-full"
          disabled={!isDirty}
        >
          Save Address
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

export default SettingsShippingAddressForm
