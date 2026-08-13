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

import { ShoppingCart, CircleUserRound, Search, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const Navbar = () => (
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
          <Button variant="ghost" size="icon" aria-label="Shopping cart">
            <ShoppingCart strokeWidth={2} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <CircleUserRound strokeWidth={2} />
          </Button>
        </div>
      </div>
    </header>
  </>
)

export default Navbar
