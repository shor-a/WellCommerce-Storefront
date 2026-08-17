import { useState, useRef } from "react"
import OfferNavbar from "./OfferNavbar"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CartItemRow from "@/components/atomic/CartItemRow"

import {
  ShoppingCart,
  CircleUserRound,
  Search,
  AlignLeft,
  ArrowRight,
} from "lucide-react"
import { useCartStore } from "@/hooks/cartStores"

const Navbar = () => {
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
      <OfferNavbar />
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto flex items-center gap-6 px-4 py-4 sm:px-6 lg:gap-10 lg:px-10">
          {/* Mobile: hamburger */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="lg:hidden"
          >
            <AlignLeft strokeWidth={2} />
          </Button>

          {/* Brand */}
          <span className="font-heading text-xl font-bold tracking-tight lg:text-2xl">
            WELLCOMMERCE
          </span>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>T-Shirts</NavigationMenuLink>
                    <NavigationMenuLink>Pants</NavigationMenuLink>
                    <NavigationMenuLink>Shorts</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    On Sale
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    New Arrivals
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Brands
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search bar — grows to fill remaining space */}
          <div className="hidden flex-1 lg:flex">
            <InputGroup className="h-10 w-full">
              <InputGroupAddon align="inline-start">
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search for products..."
                aria-label="Search for products"
              />
            </InputGroup>
          </div>

          {/* Action icons */}
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="lg:hidden"
            >
              <Search strokeWidth={2} />
            </Button>

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
                  className="w-80 p-0"
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
                    {cartItems.map((cartItem) => (
                      <CartItemRow key={cartItem.itemId} cartItem={cartItem} />
                    ))}
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
                      <span className="text-sm text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="font-heading text-base font-bold text-foreground">
                        ${subTotal}
                      </span>
                    </div>

                    <Button
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

            <Button variant="ghost" size="icon" aria-label="Account">
              <CircleUserRound strokeWidth={2} />
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
