import { useState, useRef } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CartItemRow from "@/components/atomic/CartItemRow"

import { ShoppingCart, ArrowRight } from "lucide-react"
import { PageRoutes } from "@/config/routes"
import { Link } from "react-router-dom"
import { useCartStore } from "@/hooks/cartStores"
import { destructProductId } from "@/constants/cartConst"

const NavbarCartIcon = () => {
  const cartItems = useCartStore((state) => state.cart)
  const allItemQty = useCartStore((state) => state.countItems())
  const subTotal = useCartStore((state) => state.countSubTotal())

  const [cartOpen, setCartOpen] = useState(false)
  // Utilize useRef so that closeTimer timer ID can survive re-render
  // If use state will triggers re-render, while normal variable set null each render
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // clear the timeout set by closeCartDelayed and open cart panel
  const openCart = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCartOpen(true)
  }

  // set the timer ID for the next 150 ms perform panel close
  const closeCartDelayed = () => {
    closeTimer.current = setTimeout(() => setCartOpen(false), 150)
  }

  return (
    <>
      {/* Cart button with hover dropdown */}
      {/* Open and onOpenChange is base-ui props to control popover behavior */}
      <Popover open={cartOpen} onOpenChange={setCartOpen}>
        {/* Hover zone wraps trigger so the pointer moving from button to panel doesn't close */}
        <div
          onMouseEnter={openCart}
          onMouseLeave={closeCartDelayed}
          className="relative"
        >
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Shopping cart"
                className="relative"
              />
            }
          >
            <ShoppingCart strokeWidth={2} />
            <Badge
              className="absolute -top-1.5 -right-1.5 size-4.5 rounded-full p-0 text-[10px] leading-none"
              aria-label={`${cartItems.length} items in cart`}
            >
              {cartItems.length}
            </Badge>
          </PopoverTrigger>

          {/* Need mouse action trigger here too, so when mouse hover to PopOver content it won't close */}
          <PopoverContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="w-70 p-0"
            onMouseEnter={openCart}
            onMouseLeave={closeCartDelayed}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <span className="font-heading text-sm font-bold tracking-tight">
                Your Cart
              </span>
              <Badge variant="secondary" className="h-5 text-xs">
                {cartItems.length} items
              </Badge>
            </div>

            <Separator />

            {/* Items */}
            <div className="flex flex-col gap-3 px-4 py-3">
              {cartItems.length > 0 ? (
                cartItems.map((cartItem) => (
                  <Link
                    key={cartItem.cartItemID}
                    to={`/product-detail/${destructProductId(cartItem.cartItemID)}`}
                    onClick={() => setCartOpen(false)}
                    className="block cursor-pointer rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-secondary"
                  >
                    <CartItemRow cartItem={cartItem} />
                  </Link>
                ))
              ) : (
                <span className="font-heading text-sm font-bold tracking-tight">
                  No items in cart
                </span>
              )}
            </div>

            <Separator />

            {/* Subtotal + CTA */}
            <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Items Ordered
                </span>
                <span className="font-heading text-base font-bold text-foreground">
                  {allItemQty} pcs
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-base font-bold text-foreground">
                  ${subTotal}
                </span>
              </div>

              <Button
                render={<Link to={PageRoutes.CART} />}
                nativeButton={false}
                variant="default"
                size="lg"
                className="w-full gap-2"
              >
                View Cart
                <ArrowRight
                  strokeWidth={2}
                  className="size-4"
                  data-icon="inline-end"
                />
              </Button>
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </>
  )
}

export default NavbarCartIcon
