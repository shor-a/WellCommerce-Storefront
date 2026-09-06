import { Pencil, Check, MapPin, Phone, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type ShippingAddress } from "@/constants/orderHistoryConst"

interface ShippingAddressSectionProps {
  className?: string
  shippingValues: ShippingAddress
  isEditing: boolean
  submitAttempted: boolean
  onEdit: () => void
  onSave: () => void
  onShippingChange: (field: keyof ShippingAddress, value: string) => void
}

const FieldError = ({ message }: { message: string }) => (
  <p className="mt-1 text-xs font-medium text-destructive">{message}</p>
)

const REQUIRED_FIELDS: (keyof ShippingAddress)[] = [
  "name",
  "line1",
  "city",
  "country",
  "phone",
]

export const ShippingAddressSection = ({
  className,
  shippingValues,
  isEditing,
  submitAttempted,
  onEdit,
  onSave,
  onShippingChange,
}: ShippingAddressSectionProps) => {
  const err = (field: keyof ShippingAddress) =>
    submitAttempted &&
    REQUIRED_FIELDS.includes(field) &&
    shippingValues[field].trim() === ""
      ? "This field is required"
      : ""

  const inputClass = (field: keyof ShippingAddress) =>
    cn(
      "h-11 rounded-full border-black/10 bg-secondary pr-4 pl-12 placeholder:text-muted-foreground",
      err(field) && "border-destructive focus-visible:ring-destructive"
    )

  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-background px-8 py-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col pb-4">
            <p className="text-sm text-muted-foreground">
              {isEditing
                ? "Edit your shipping details"
                : "Pre-filled from your account, edit if needed"}
            </p>
          </div>

          {!isEditing && (
            <Button
              variant="outline"
              size="icon"
              aria-label="Edit shipping address"
              onClick={onEdit}
              className="shrink-0 border-stone-600 transition-all duration-150 hover:bg-secondary active:scale-95"
            >
              <Pencil className="size-4 text-foreground" strokeWidth={1.5} />
            </Button>
          )}
        </div>

        {/* ── Collapsed summary ── */}
        {!isEditing && (
          <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-secondary p-5">
            <div className="flex items-center gap-3">
              <User
                className="size-4 shrink-0 text-foreground/50"
                strokeWidth={1.5}
              />
              <span className="text-sm font-medium text-foreground">
                {shippingValues.name}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-foreground/50"
                strokeWidth={1.5}
              />
              <span className="text-sm text-muted-foreground">
                {shippingValues.line1}
                <br />
                {shippingValues.city}
                <br />
                {shippingValues.country}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                className="size-4 shrink-0 text-foreground/50"
                strokeWidth={1.5}
              />
              <span className="text-sm text-muted-foreground">
                {shippingValues.phone}
              </span>
            </div>
          </div>
        )}

        {/* ── Editable form ── */}
        {isEditing && (
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="shipName"
                className="text-sm font-bold text-foreground"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="shipName"
                  type="text"
                  placeholder="John Doe"
                  value={shippingValues.name}
                  onChange={(e) => onShippingChange("name", e.target.value)}
                  aria-invalid={!!err("name")}
                  className={inputClass("name")}
                />
              </div>
              {err("name") && <FieldError message={err("name")} />}
            </div>

            {/* Address Line 1 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="shipLine1"
                className="text-sm font-bold text-foreground"
              >
                Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="shipLine1"
                  type="text"
                  placeholder="123 Fashion Ave, Apt 4B"
                  value={shippingValues.line1}
                  onChange={(e) => onShippingChange("line1", e.target.value)}
                  aria-invalid={!!err("line1")}
                  className={inputClass("line1")}
                />
              </div>
              {err("line1") && <FieldError message={err("line1")} />}
            </div>

            {/* City */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="shipCity"
                className="text-sm font-bold text-foreground"
              >
                City / State / ZIP
              </label>
              <div className="relative">
                <MapPin
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="shipCity"
                  type="text"
                  placeholder="New York, NY 10001"
                  value={shippingValues.city}
                  onChange={(e) => onShippingChange("city", e.target.value)}
                  aria-invalid={!!err("city")}
                  className={inputClass("city")}
                />
              </div>
              {err("city") && <FieldError message={err("city")} />}
            </div>

            {/* Country + Phone */}
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="shipCountry"
                  className="text-sm font-bold text-foreground"
                >
                  Country
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="shipCountry"
                    type="text"
                    placeholder="United States"
                    value={shippingValues.country}
                    onChange={(e) =>
                      onShippingChange("country", e.target.value)
                    }
                    aria-invalid={!!err("country")}
                    className={inputClass("country")}
                  />
                </div>
                {err("country") && <FieldError message={err("country")} />}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="shipPhone"
                  className="text-sm font-bold text-foreground"
                >
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="shipPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={shippingValues.phone}
                    onChange={(e) => onShippingChange("phone", e.target.value)}
                    aria-invalid={!!err("phone")}
                    className={inputClass("phone")}
                  />
                </div>
                {err("phone") && <FieldError message={err("phone")} />}
              </div>
            </div>

            <div className="flex justify-end">
              {/* Save */}
              <Button
                variant="default"
                onClick={onSave}
                size="lg"
                className="mt-2 w-1/4 rounded-full font-bold"
              >
                <Check strokeWidth={2} />
                Save Address
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShippingAddressSection
