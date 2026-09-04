import { CreditCard, Calendar, Lock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  PaymentMethod,
  paymentMethods,
  type CardFormValues,
} from "@/constants/checkoutConst"
import { SiPaypal, SiGooglepay } from "@icons-pack/react-simple-icons"

interface PaymentMethodSectionProps {
  className?: string
  selectedMethod: PaymentMethod
  cardValues: CardFormValues
  submitAttempted: boolean
  onSelectMethod: (method: PaymentMethod) => void
  onCardChange: (field: keyof CardFormValues, value: string | boolean) => void
}

const paymentIcons: Record<PaymentMethod, React.ReactNode> = {
  [PaymentMethod.CREDIT_CARD]: (
    <CreditCard className="size-7" strokeWidth={1.5} />
  ),
  [PaymentMethod.PAYPAL]: <SiPaypal className="size-7" />,
  [PaymentMethod.GPAY]: <SiGooglepay className="size-7" />,
}

const FieldError = ({ message }: { message: string }) => (
  <p className="mt-1 text-xs font-medium text-destructive">{message}</p>
)

export const PaymentMethodSection = ({
  className,
  selectedMethod,
  cardValues,
  submitAttempted,
  onSelectMethod,
  onCardChange,
}: PaymentMethodSectionProps) => {
  const handleSaveCardChange = (checked: boolean) =>
    onCardChange("saveCard", checked)

  const cardErr = (field: keyof Omit<CardFormValues, "saveCard">) =>
    submitAttempted && cardValues[field].toString().trim() === ""
      ? "This field is required"
      : ""

  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="flex flex-col gap-6 rounded-2xl border border-black/10 bg-background p-8">
        <h2 className="text-xl font-bold text-foreground">Payment Method</h2>

        {/* Method selector tabs */}
        <div className="flex gap-4">
          {paymentMethods.map((method) => {
            const isActive = selectedMethod === method
            return (
              <button
                key={method}
                aria-pressed={isActive}
                onClick={() => onSelectMethod(method)}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-2 rounded-xl p-6 transition-all duration-150",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                  isActive
                    ? "border-2 border-foreground bg-secondary"
                    : "border border-black/10 opacity-70 hover:opacity-100 active:scale-95"
                )}
              >
                <span className="text-foreground">{paymentIcons[method]}</span>
                <span className="text-sm font-bold text-foreground">
                  {method}
                </span>
                <span
                  className={cn(
                    "absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors duration-150",
                    isActive
                      ? "border-foreground bg-foreground"
                      : "border-black/30"
                  )}
                >
                  {isActive && (
                    <span className="size-2 rounded-full bg-background" />
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Credit Card form ── */}
        {selectedMethod === PaymentMethod.CREDIT_CARD && (
          <div className="flex flex-col gap-4">
            {/* Cardholder Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cardholderName"
                className="text-sm font-bold text-foreground"
              >
                Cardholder Name
              </label>
              <div className="relative">
                <User
                  className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={cardValues.cardholderName}
                  onChange={(e) =>
                    onCardChange("cardholderName", e.target.value)
                  }
                  aria-invalid={!!cardErr("cardholderName")}
                  className={cn(
                    "h-11 rounded-full border-black/10 bg-secondary pr-4 pl-12 placeholder:text-muted-foreground",
                    cardErr("cardholderName") &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
              </div>
              {cardErr("cardholderName") && (
                <FieldError message={cardErr("cardholderName")} />
              )}
            </div>

            {/* Card Number */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cardNumber"
                className="text-sm font-bold text-foreground"
              >
                Card Number
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardValues.cardNumber}
                  onChange={(e) => onCardChange("cardNumber", e.target.value)}
                  aria-invalid={!!cardErr("cardNumber")}
                  className={cn(
                    "h-11 rounded-full border-black/10 bg-secondary pr-4 pl-12 placeholder:text-muted-foreground",
                    cardErr("cardNumber") &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  maxLength={19}
                />
              </div>
              {cardErr("cardNumber") && (
                <FieldError message={cardErr("cardNumber")} />
              )}
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="expiryDate"
                  className="text-sm font-bold text-foreground"
                >
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={cardValues.expiryDate}
                    onChange={(e) => onCardChange("expiryDate", e.target.value)}
                    aria-invalid={!!cardErr("expiryDate")}
                    className={cn(
                      "h-11 rounded-full border-black/10 bg-secondary pr-4 pl-12 placeholder:text-muted-foreground",
                      cardErr("expiryDate") &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    maxLength={5}
                  />
                </div>
                {cardErr("expiryDate") && (
                  <FieldError message={cardErr("expiryDate")} />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="cvv"
                  className="text-sm font-bold text-foreground"
                >
                  CVV
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    value={cardValues.cvv}
                    onChange={(e) => onCardChange("cvv", e.target.value)}
                    aria-invalid={!!cardErr("cvv")}
                    className={cn(
                      "h-11 rounded-full border-black/10 bg-secondary pr-4 pl-12 placeholder:text-muted-foreground",
                      cardErr("cvv") &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    maxLength={4}
                  />
                </div>
                {cardErr("cvv") && <FieldError message={cardErr("cvv")} />}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={cardValues.saveCard}
                onCheckedChange={handleSaveCardChange}
              />
              <span className="text-sm text-muted-foreground">
                Save card for future purchases
              </span>
            </label>
          </div>
        )}

        {/* ── PayPal placeholder ── */}
        {selectedMethod === PaymentMethod.PAYPAL && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-black/10 bg-secondary px-6 py-8 text-center">
            <SiPaypal className="size-10 text-[#003087]" />
            <p className="text-sm font-medium text-foreground">
              You will be redirected to PayPal to complete your payment
              securely.
            </p>
            <p className="text-xs text-muted-foreground">
              Click <span className="font-semibold">Pay Now</span> to continue.
            </p>
          </div>
        )}

        {/* ── Google Pay placeholder ── */}
        {selectedMethod === PaymentMethod.GPAY && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-black/10 bg-secondary px-6 py-8 text-center">
            <SiGooglepay className="size-12" />
            <p className="text-sm font-medium text-foreground">
              Google Pay will open a secure payment sheet to complete your
              purchase.
            </p>
            <p className="text-xs text-muted-foreground">
              Click <span className="font-semibold">Pay Now</span> to continue.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PaymentMethodSection
