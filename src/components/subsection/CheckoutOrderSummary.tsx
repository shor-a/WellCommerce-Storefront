import { ArrowRight, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Cart } from "@/constants/cartConst"

interface CheckoutOrderSummaryProps {
  items: Cart[]
  discountRate: number
  deliveryFee: number
  onPayNow: () => void
}

export const CheckoutOrderSummary = ({
  items,
  discountRate,
  deliveryFee,
  onPayNow,
}: CheckoutOrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.finalPrice * item.itemQty,
    0
  )
  const discountAmount = Math.round((subtotal * discountRate) / 100)
  const total = subtotal - discountAmount + deliveryFee

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex max-h-72 flex-col gap-4 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.cartItemID} className="flex items-center gap-4">
              <div className="size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                <img
                  src={item.itemImg}
                  alt={item.itemName}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="truncate text-base font-bold text-foreground">
                  {item.itemName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Size: {item.itemSize} • Color: {item.itemColor}
                </p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.itemQty}
                </p>
              </div>
              <p className="shrink-0 text-2xl font-bold text-foreground">
                ${item.finalPrice}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl text-muted-foreground">Subtotal</span>
          <span className="text-xl font-bold">${subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl text-muted-foreground">
            Discount ({discountRate}%)
          </span>
          <span className="text-xl font-bold text-destructive">
            -${discountAmount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl text-muted-foreground">Delivery Fee</span>
          <span className="text-xl font-bold">${deliveryFee}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-xl">Total</span>
          <span className="text-2xl font-bold">${total}</span>
        </div>
      </div>

      <Button
        onClick={onPayNow}
        variant="default"
        size="xl"
        className="w-full rounded-full text-base font-bold"
      >
        Pay Now
        <ArrowRight className="size-4" strokeWidth={2} />
      </Button>

      <div className="flex items-center justify-center gap-2">
        <Lock className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-xs text-muted-foreground">
          Secure Encrypted Checkout
        </span>
      </div>
    </div>
  )
}

export default CheckoutOrderSummary
