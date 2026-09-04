import { CreditCard, Calendar, Lock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  onSelectMethod: (method: PaymentMethod) => void
  onCardChange: (field: keyof CardFormValues, value: string | boolean) => void
}

const paymentIcons: Record<PaymentMethod, React.ReactNode> = {
  [PaymentMethod.CREDIT_CARD]: <CreditCard className="size-7" strokeWidth={1.5} />,
  [PaymentMethod.PAYPAL]: <SiPaypal className="size-7" />,
  [PaymentMethod.GPAY]: <SiGooglepay className="size-7" />,
}

export const PaymentMethodSection = ({
  className,
  selectedMethod,
  cardValues,
  onSelectMethod,
  onCardChange,
}: PaymentMethodSectionProps) => {
  const handleSaveCardChange = (checked: boolean) => onCardChange("saveCard", checked)

  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="flex flex-col gap-6 rounded-[20px] border border-black/10 bg-background p-8">
        <h2 className="text-xl font-bold text-foreground">Payment Method</h2>

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
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "border-2 border-foreground bg-secondary"
                    : "border border-black/10 opacity-70 hover:opacity-100 active:scale-95",
                )}
              >
                <span className="text-foreground">{paymentIcons[method]}</span>
                <span className="text-sm font-bold text-foreground">{method}</span>
                <span
                  className={cn(
                    "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors duration-150",
                    isActive
                      ? "border-foreground bg-foreground"
                      : "border-black/30",
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

        {selectedMethod === PaymentMethod.CREDIT_CARD && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cardholderName"
                className="text-sm font-bold text-foreground"
              >
                Cardholder Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={cardValues.cardholderName}
                  onChange={(e) => onCardChange("cardholderName", e.target.value)}
                  className="h-11 rounded-full border-black/10 bg-secondary pl-12 pr-4 placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="cardNumber"
                className="text-sm font-bold text-foreground"
              >
                Card Number
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-foreground/50"
                  strokeWidth={1.5}
                />
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardValues.cardNumber}
                  onChange={(e) => onCardChange("cardNumber", e.target.value)}
                  className="h-11 rounded-full border-black/10 bg-secondary pl-12 pr-4 placeholder:text-muted-foreground"
                  maxLength={19}
                />
              </div>
            </div>

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
                    className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={cardValues.expiryDate}
                    onChange={(e) => onCardChange("expiryDate", e.target.value)}
                    className="h-11 rounded-full border-black/10 bg-secondary pl-12 pr-4 placeholder:text-muted-foreground"
                    maxLength={5}
                  />
                </div>
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
                    className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    value={cardValues.cvv}
                    onChange={(e) => onCardChange("cvv", e.target.value)}
                    className="h-11 rounded-full border-black/10 bg-secondary pl-12 pr-4 placeholder:text-muted-foreground"
                    maxLength={4}
                  />
                </div>
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
      </div>
    </section>
  )
}

export default PaymentMethodSection
