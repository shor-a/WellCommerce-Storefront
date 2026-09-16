import { useState } from "react"
import { Link } from "react-router-dom"
import { AlignLeft, SearchX, Search } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { PageRoutes } from "@/config/routes"
import { navDropdownLinks, navLinks } from "@/constants/navbarConst"

import OfferNavbar from "./OfferNavbar"
import NavbarCartIcon from "@/components/subsection/NavbarCartIcon"
import NavbarUserIcon from "@/components/subsection/NavbarUserIcon"
import NavbarMobileMenu from "@/components/subsection/NavbarMobileMenu"
import NavbarSearchBar from "@/components/subsection/NavbarSearchBar"

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleOpenMenu = () => setMobileMenuOpen(true)
  const handleCloseMenu = () => setMobileMenuOpen(false)
  const handleToggleSearch = () => setMobileSearchOpen((v) => !v)
  const handleCloseSearch = () => setMobileSearchOpen(false)

  return (
    <>
      <OfferNavbar />

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border bg-background",
          className
        )}
      >
        {/* ── Main navbar row ── */}
        <div className="container mx-auto flex items-center gap-4 px-4 py-4 sm:px-6 lg:gap-10 lg:px-10">
          {/* Hamburger — sm/md only */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={handleOpenMenu}
            className="shrink-0 cursor-pointer lg:hidden"
          >
            <AlignLeft strokeWidth={2} className="size-5" />
          </Button>

          {/* Brand */}
          <Link
            className="font-heading text-xl font-bold tracking-tight text-foreground lg:text-2xl"
            to={PageRoutes.HOME}
          >
            WELLCOMMERCE
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navDropdownLinks.map((dropdown) => (
                  <NavigationMenuItem key={dropdown.id}>
                    <NavigationMenuTrigger>
                      {dropdown.trigger}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {dropdown.items.map((item) => (
                        <NavigationMenuLink
                          key={item.id}
                          render={<Link to={item.to} />}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}

                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.id}>
                    <NavigationMenuLink
                      render={<Link to={link.to} />}
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop search bar */}
          <NavbarSearchBar className="hidden lg:flex" />

          {/* Action icons */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mobileSearchOpen}
              onClick={handleToggleSearch}
              className="shrink-0 cursor-pointer lg:hidden"
            >
              {mobileSearchOpen ? (
                <SearchX strokeWidth={2} className="size-5" />
              ) : (
                <Search strokeWidth={2} className="size-5" />
              )}
            </Button>

            <NavbarCartIcon />
            <NavbarUserIcon />
          </div>
        </div>

        {/* ── Mobile / tablet search bar — expands below the main row ── */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out lg:hidden",
            mobileSearchOpen
              ? "max-h-20 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pb-3 sm:px-6">
            <NavbarSearchBar fullWidth onBlurClose={handleCloseSearch} />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <NavbarMobileMenu isOpen={mobileMenuOpen} onClose={handleCloseMenu} />
    </>
  )
}

export default Navbar
