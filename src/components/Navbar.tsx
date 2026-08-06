import OfferNavbar from "./OfferNavbar"

import { Button } from "@/components/ui/button"

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

import { ShoppingCart, CircleUserRound, SearchIcon } from "lucide-react"

const Navbar = () => {
  return (
    <>
      <OfferNavbar />
      <div className="nav border bg-background p-5">
        <div className="container mx-auto flex items-center justify-center gap-10 px-2">
          <div className="flex basis-5/12 items-center justify-between gap-10">
            <div className="flex basis-1/4">
              <h2>WELLCOMMERCE</h2>
            </div>
            <div className="flex basis-3/4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>T-Shirt</NavigationMenuLink>
                      <NavigationMenuLink>Pants</NavigationMenuLink>
                      <NavigationMenuLink>Shorts</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      On Sale
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      New Arrivals
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Brands
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex basis-7/12 items-center justify-between gap-10">
            <div className="flex basis-5/6 gap-3">
              <InputGroup className="h-10 w-full">
                <InputGroupInput
                  id="inline-start-input"
                  placeholder="Search for products..."
                />
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex basis-1/6 justify-start gap-3">
              <ShoppingCart className="size-5" strokeWidth={2.5} />
              <CircleUserRound className="size-5" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
