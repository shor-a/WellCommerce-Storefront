import { Tag, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageRoutes } from "@/config/routes/routes"
import { DISCOUNT_RATE } from "@/constants/cartConst"
import useAuth from "@/hooks/useAuthHooks"

interface CartOrderSummaryProps {
  subtotal: number
  discountAmt: number
  deliveryFee: number
  total: number
}

export const CartOrderSummary = ({
  subtotal,
  discountAmt,
  deliveryFee,
  total,
}: CartOrderSummaryProps) => {
  const { requireAuth } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    requireAuth(() => navigate(PageRoutes.CHECKOUT))
  }
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
      <h2 className="text-xl font-bold md:text-2xl">Order Summary</h2>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl text-muted-foreground">Subtotal</span>
          <span className="text-xl font-bold">${subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl text-muted-foreground">
            Discount (-{DISCOUNT_RATE}%)
          </span>
          <span className="text-xl font-bold text-destructive">
            -${discountAmt}
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

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-full bg-secondary px-4 py-3">
          <Tag
            className="size-5 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Add promo code"
            aria-label="Promo code"
            className="min-w-0 flex-1 bg-transparent text-base text-muted-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <Button
          type="button"
          variant="default"
          className="shrink-0 rounded-full px-6"
          aria-label="Apply promo code"
        >
          Apply
        </Button>
      </div>

      <Button
        type="button"
        variant="default"
        size="xl"
        className="w-full rounded-full text-base"
        aria-label="Go to checkout"
        onClick={handleCheckout}
      >
        Go to Checkout
        <ArrowRight className="size-5" strokeWidth={2} />
      </Button>
    </div>
  )
}

export default CartOrderSummary
