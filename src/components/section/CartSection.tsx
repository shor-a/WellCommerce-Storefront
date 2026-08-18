import { CartPageItemRow } from "@/components/atomic/CartPageItemRow"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tag, ArrowRight } from "lucide-react"
import { DELIVERY_FEE, DISCOUNT_RATE } from "@/constants/cartConst"
import { useCartStore } from "@/hooks/cartStores"

export const CartSection = () => {
  const cartItems = useCartStore((state) => state.cart)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.itemQty,
    0
  )

  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0
  const discountAmt = Math.round((subtotal * DISCOUNT_RATE) / 100)
  const total = subtotal - discountAmt + deliveryFee

  return (
    <section aria-label="Shopping cart" className="w-full bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <h1 className="mb-6 text-3xl lg:text-4xl">Your cart</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* ── Cart items list ── */}
          <div className="lg:basis-7/12">
            <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={item.cartItemID}>
                    <CartPageItemRow cartItem={item} />
                    {index < cartItems.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))
              ) : (
                <h2 className="text-2xl font-bold">No items in cart</h2>
              )}
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:basis-5/12">
            <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              {/* Line items */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-xl text-muted-foreground">
                    Subtotal
                  </span>
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
                  <span className="text-xl text-muted-foreground">
                    Delivery Fee
                  </span>
                  <span className="text-xl font-bold">${deliveryFee}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-xl">Total</span>
                  <span className="text-2xl font-bold">${total}</span>
                </div>
              </div>

              {/* Promo code row */}
              <div className="flex gap-3">
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

              {/* Checkout CTA */}
              <Button
                type="button"
                variant="default"
                size="lg"
                className="w-full rounded-full text-base"
                aria-label="Go to checkout"
              >
                Go to Checkout
                <ArrowRight className="size-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartSection
