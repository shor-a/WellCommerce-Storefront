import { useState, useRef, useEffect } from "react"
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom"
import { AlignLeft, SearchX, Search, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { PageRoutes } from "@/config/routes/routes"
import {
  navDropdownLinks,
  navLinks,
  type NavLink as NavLinkType,
} from "@/constants/navbarConst"

import OfferNavbar from "./OfferNavbar"
import NavbarCartIcon from "@/components/subsection/NavbarCartIcon"
import NavbarUserIcon from "@/components/subsection/NavbarUserIcon"
import NavbarMobileMenu from "@/components/subsection/NavbarMobileMenu"
import NavbarSearchBar from "@/components/subsection/NavbarSearchBar"

interface NavbarProps {
  className?: string
}

// Collapses the inline search bar to an icon when the visual viewport is too
// narrow to fit everything  fires on both window resize and browser zoom.
const SEARCH_COLLAPSE_WIDTH = 1150

const useCollapseSearch = () => {
  const [collapsed, setCollapsed] = useState(
    () =>
      (window.visualViewport?.width ?? window.innerWidth) <
      SEARCH_COLLAPSE_WIDTH
  )

  useEffect(() => {
    const check = () => {
      setCollapsed(
        (window.visualViewport?.width ?? window.innerWidth) <
          SEARCH_COLLAPSE_WIDTH
      )
    }
    window.visualViewport?.addEventListener("resize", check)
    window.addEventListener("resize", check)
    return () => {
      window.visualViewport?.removeEventListener("resize", check)
      window.removeEventListener("resize", check)
    }
  }, [])

  return collapsed
}

// Returns true when the nav link matches the current page + search params
const useIsNavLinkActive = (link: NavLinkType): boolean => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  if (pathname !== PageRoutes.BROWSE) return false
  // No activeParam = "Brands"  active only when browsing with no filters applied
  if (!link.activeParam) return searchParams.toString() === ""
  return searchParams.get(link.activeParam.key) === link.activeParam.value
}

const DesktopNavLink = ({ link }: { link: NavLinkType }) => {
  const isActive = useIsNavLinkActive(link)
  return (
    <NavLink
      to={link.to}
      className={cn(
        "relative flex shrink-0 items-center gap-1.5 px-1 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[2px] after:rounded-full after:transition-all after:duration-150",
        isActive
          ? "text-foreground after:bg-foreground"
          : "text-muted-foreground after:bg-transparent hover:text-foreground hover:after:bg-border"
      )}
    >
      {link.label}
    </NavLink>
  )
}

const DesktopDropdown = ({
  dropdown,
}: {
  dropdown: (typeof navDropdownLinks)[number]
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const anyChildActive =
    pathname === PageRoutes.BROWSE &&
    dropdown.sections.some((section) =>
      section.items.some(
        (item) =>
          item.activeParam &&
          searchParams.get(item.activeParam.key) === item.activeParam.value
      )
    )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger button */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex shrink-0 items-center gap-1 px-1 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          "after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[2px] after:rounded-full after:transition-all after:duration-150",
          anyChildActive
            ? "text-foreground after:bg-foreground"
            : "text-muted-foreground after:bg-transparent hover:text-foreground hover:after:bg-border"
        )}
      >
        {dropdown.trigger}
        <ChevronDown
          strokeWidth={2}
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Invisible bridge fills the gap between trigger and panel so hover stays continuous */}
      <div className="absolute top-full left-0 h-3 w-full" />

      {/* Dropdown panel */}
      <div
        role="menu"
        className={cn(
          "absolute top-full left-0 z-50 mt-3",
          "w-60 origin-top-left rounded-xl border border-border bg-background",
          "shadow-lg",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {dropdown.sections.map((section, sectionIdx) => (
          <div key={section.sectionId}>
            {sectionIdx > 0 && <Separator />}

            {/* Section heading */}
            <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {section.heading}
            </p>

            <div className="flex flex-col px-1.5 pb-1.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = item.activeParam
                  ? searchParams.get(item.activeParam.key) ===
                      item.activeParam.value && pathname === PageRoutes.BROWSE
                  : false

                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-2.5 py-2",
                      "text-sm transition-colors duration-150",
                      "focus-visible:bg-secondary focus-visible:outline-none",
                      isActive
                        ? "bg-secondary font-semibold text-foreground"
                        : "font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {/* Icon badge */}
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground group-hover:bg-foreground/10 group-hover:text-foreground"
                      )}
                    >
                      <Icon strokeWidth={1.75} className="size-3.5" />
                    </span>

                    <span className="flex-1 leading-none">{item.label}</span>

                    {isActive && (
                      <span className="size-1.5 shrink-0 rounded-full bg-foreground" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Navbar = ({ className }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const searchCollapsed = useCollapseSearch()

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
        <div className="container mx-auto flex items-center gap-3 px-4 py-4 sm:px-6 lg:gap-4 lg:px-10">
          {/* Hamburger  sm/md only */}
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
            className="shrink-0 font-heading text-xl font-bold tracking-tight text-foreground lg:text-2xl"
            to={PageRoutes.HOME}
          >
            WELLCOMMERCE
          </Link>

          {/* Desktop nav links  flex-1 + justify-center keeps them centered between brand and search */}
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex"
          >
            {navDropdownLinks.map((dropdown) => (
              <DesktopDropdown key={dropdown.id} dropdown={dropdown} />
            ))}

            {/* Visual divider */}
            <div className="h-4 w-px bg-border" aria-hidden="true" />

            {navLinks.map((link) => (
              <DesktopNavLink key={link.id} link={link} />
            ))}
          </nav>

          {/* Desktop search  full bar when enough room, icon toggle when zoomed in */}
          {!searchCollapsed ? (
            <NavbarSearchBar className="hidden lg:flex lg:w-44 xl:w-56" />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mobileSearchOpen}
              onClick={handleToggleSearch}
              className="hidden shrink-0 cursor-pointer lg:flex"
            >
              {mobileSearchOpen ? (
                <SearchX strokeWidth={2} className="size-5" />
              ) : (
                <Search strokeWidth={2} className="size-5" />
              )}
            </Button>
          )}

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

        {/* Search panel  used by mobile toggle and collapsed desktop search icon */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            !searchCollapsed && "lg:hidden",
            mobileSearchOpen
              ? "max-h-20 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 pb-3 sm:px-6 lg:px-10">
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
