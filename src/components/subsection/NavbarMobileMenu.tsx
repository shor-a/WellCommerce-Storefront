import { useEffect, useRef } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import {
  X,
  ChevronRight,
  Package,
  Heart,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PageRoutes } from "@/config/routes"
import {
  mobileNavSections,
  type NavLink as NavLinkType,
} from "@/constants/navbarConst"

interface NavbarMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const authMenuItems = [
  {
    id: "orders",
    label: "Order History",
    icon: Package,
    to: PageRoutes.ORDER_HISTORY,
  },
  {
    id: "wishlist",
    label: "My Wishlist",
    icon: Heart,
    to: PageRoutes.WISHLIST,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    to: PageRoutes.SETTINGS,
  },
] as const

const MobileNavItem = ({
  link,
  onClose,
}: {
  link: NavLinkType
  onClose: () => void
}) => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const Icon = link.icon

  const isActive =
    pathname === PageRoutes.BROWSE &&
    (!link.activeParam
      ? searchParams.toString() === ""
      : searchParams.get(link.activeParam.key) === link.activeParam.value)

  return (
    <Link
      to={link.to}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 px-5 py-3 transition-colors duration-150",
        "focus-visible:bg-secondary focus-visible:outline-none",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {/* Icon pill */}
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
          isActive
            ? "bg-foreground text-background"
            : "bg-secondary text-muted-foreground"
        )}
      >
        <Icon strokeWidth={1.75} className="size-4" />
      </span>

      <span className="text-sm font-medium">{link.label}</span>

      {isActive ? (
        <span className="ml-auto size-1.5 rounded-full bg-foreground" />
      ) : (
        <ChevronRight
          strokeWidth={1.75}
          className="ml-auto size-4 shrink-0 text-muted-foreground/50"
        />
      )}
    </Link>
  )
}

export const NavbarMobileMenu = ({
  isOpen,
  onClose,
}: NavbarMobileMenuProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const isAuthenticated = !!localStorage.getItem("authenticated")
  const authUser = localStorage.getItem("authUser") ?? ""

  const handleSignOut = () => {
    localStorage.removeItem("authenticated")
    localStorage.removeItem("authUser")
    onClose()
    window.location.reload()
  }

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        onClose()
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-background shadow-2xl",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            to={PageRoutes.HOME}
            onClick={onClose}
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            WELLCOMMERCE
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={onClose}
            className="cursor-pointer"
          >
            <X strokeWidth={2} className="size-5" />
          </Button>
        </div>

        <Separator />

        {/* Scrollable nav body */}
        <nav className="flex flex-1 flex-col overflow-y-auto">
          {mobileNavSections.map((section, sectionIdx) => (
            <div key={section.sectionId}>
              {sectionIdx > 0 && <Separator />}
              <p className="px-5 pt-4 pb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                {section.heading}
              </p>
              {section.items.map((link) => (
                <MobileNavItem key={link.id} link={link} onClose={onClose} />
              ))}
            </div>
          ))}

          <Separator className="mt-2" />

          {/* Auth section */}
          {isAuthenticated ? (
            <>
              <div className="px-5 pt-4 pb-2">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Account
                </p>
                <p className="mt-2 font-heading text-sm font-bold tracking-tight text-foreground">
                  {authUser}
                </p>
              </div>

              {authMenuItems.map(({ id, label, icon: Icon, to }) => (
                <Link
                  key={id}
                  to={to}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3",
                    "text-sm font-medium text-foreground",
                    "transition-colors duration-150 hover:bg-secondary",
                    "cursor-pointer outline-none focus-visible:bg-secondary"
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    <Icon strokeWidth={1.75} className="size-4" />
                  </span>
                  {label}
                  <ChevronRight
                    strokeWidth={1.75}
                    className="ml-auto size-4 shrink-0 text-muted-foreground/50"
                  />
                </Link>
              ))}

              <button
                type="button"
                onClick={handleSignOut}
                className={cn(
                  "mb-4 flex w-full items-center gap-3 px-5 py-3",
                  "text-sm font-medium text-destructive",
                  "transition-colors duration-150 hover:bg-secondary",
                  "cursor-pointer outline-none focus-visible:bg-secondary"
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <LogOut strokeWidth={1.75} className="size-4" />
                </span>
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 px-5 py-4">
              <p className="mb-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                Account
              </p>
              <Button
                render={<Link to={PageRoutes.LOGIN} onClick={onClose} />}
                nativeButton={false}
                variant="default"
                className="h-10 w-full cursor-pointer rounded-full"
              >
                <LogIn
                  strokeWidth={2}
                  className="size-4"
                  data-icon="inline-start"
                />
                Sign In
              </Button>
              <Button
                render={<Link to={PageRoutes.REGISTER} onClick={onClose} />}
                nativeButton={false}
                variant="outline"
                className="h-10 w-full cursor-pointer rounded-full"
              >
                <UserPlus
                  strokeWidth={2}
                  className="size-4"
                  data-icon="inline-start"
                />
                Create Account
              </Button>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default NavbarMobileMenu
