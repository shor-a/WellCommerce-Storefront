import { useState } from "react"
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"

import { Search, AlignLeft, CircleUserRound } from "lucide-react"
import { generatePath, Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes"
import { allProducts } from "@/constants/productConst"
import Rating from "../atomic/Rating"
import { cn } from "@/lib/utils"
import NavbarCartIcon from "./NavbarCartIcon"
import NavbarUserIcon from "./NavbarUserIcon"

const Navbar = () => {
  // Search bar hooks
  const [search, setSearch] = useState<string>("")

  const populateSearch = (): React.ReactNode => {
    /* Custom search filter (to use disable shadcn fuzzy filter <Command shouldFilter={false})
    const filteredRes = allProducts.filter((product) =>
      product.itemName.toLowerCase().includes(search.toLowerCase())
    )
  */
    return (
      <>
        {allProducts.map((product) => (
          <Link
            key={product.itemId}
            to={generatePath(PageRoutes.PRODUCT, {
              productid: String(product.itemId),
            })}
          >
            <CommandItem className="hover:cursor-pointer" key={product.itemId}>
              <div className="flex w-full">
                <div className="-mr-5 flex basis-2/6 justify-start">
                  <img src={product.itemImg} className="size-14" />
                </div>
                <div className="flex basis-4/6 flex-col items-start justify-center gap-2">
                  <p>{product.itemName}</p>
                  <Rating starValue={product.itemRating} className="size-3" />
                </div>
              </div>
            </CommandItem>
          </Link>
        ))}
      </>
    )
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
          <Link
            className="font-heading text-xl font-bold tracking-tight lg:text-2xl"
            to={PageRoutes.HOME}
          >
            <span>WELLCOMMERCE</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Browse Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink
                      render={<Link to={PageRoutes.BROWSE} />}
                    >
                      Fancy T-Shirts
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      render={<Link to={PageRoutes.BROWSE} />}
                    >
                      Sports Pants
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      render={<Link to={PageRoutes.BROWSE} />}
                    >
                      Unique Shorts
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link to={PageRoutes.BROWSE} />}
                    className={navigationMenuTriggerStyle()}
                  >
                    On Sale
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link to={PageRoutes.BROWSE} />}
                    className={navigationMenuTriggerStyle()}
                  >
                    New Arrivals
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link to={PageRoutes.BROWSE} />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Brands
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search bar */}
          <div className="relative hidden flex-1 lg:flex">
            <Command className="h-10 w-full">
              <CommandInput
                placeholder="Search for products..."
                value={search}
                onValueChange={(searchVal) => {
                  setSearch(searchVal)
                }}
              />
              <CommandList
                className={cn(
                  search ? `` : `hidden`,
                  "absolute top-full left-2 z-50 mt-1 w-full rounded-sm border bg-background shadow-lg"
                )}
              >
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Product search results">
                  {populateSearch()}
                  <CommandSeparator />
                </CommandGroup>
              </CommandList>
            </Command>
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

            <NavbarCartIcon />
            <NavbarUserIcon />
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
