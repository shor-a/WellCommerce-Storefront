import { CartPageItemRow } from "@/components/atomic/CartPageItemRow"
import { CartOrderSummary } from "@/components/subsection/CartOrderSummary"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"
import {
  DELIVERY_FEE,
  DISCOUNT_RATE,
  destructProductId,
} from "@/constants/cartConst"
import { useCartStore } from "@/hooks/cartStores"
import { cn } from "@/lib/utils"

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
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <h1 className="mb-6 text-xl md:text-3xl">Your cart</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* ── Cart items list ── */}
          <div
            className={cn(cartItems.length > 0 ? "lg:basis-7/12" : "lg:flex-1")}
          >
            <div className="flex flex-col gap-6 rounded-2xl border border-border p-6">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={item.cartItemID}>
                    <CartPageItemRow
                      cartItem={item}
                      productId={destructProductId(item.cartItemID)}
                    />
                    {index < cartItems.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex min-h-32 flex-col items-center justify-center gap-5">
                  <ShoppingCart size={60} />
                  <h2 className="text-2xl font-bold">
                    There are no items in cart
                  </h2>
                </div>
              )}
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="lg:basis-5/12">
              <CartOrderSummary
                subtotal={subtotal}
                discountAmt={discountAmt}
                deliveryFee={deliveryFee}
                total={total}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CartSection
