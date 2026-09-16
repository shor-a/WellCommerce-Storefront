import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
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
import { mobileNavLinks } from "@/constants/navbarConst"

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
  { id: "wishlist", label: "My Wishlist", icon: Heart, to: PageRoutes.HOME },
  { id: "settings", label: "Settings", icon: Settings, to: PageRoutes.HOME },
] as const

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
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on Escape key
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
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
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

        {/* Nav links */}
        <nav className="flex flex-1 flex-col overflow-y-auto py-3">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-5 py-3",
                "text-sm font-medium text-foreground",
                "transition-colors duration-150 hover:bg-secondary",
                "cursor-pointer outline-none focus-visible:bg-secondary"
              )}
            >
              {link.label}
              <ChevronRight
                strokeWidth={1.75}
                className="size-4 shrink-0 text-muted-foreground"
              />
            </Link>
          ))}

          {/* Auth section separator */}
          <Separator className="my-2" />

          {isAuthenticated ? (
            <>
              {/* Welcome */}
              <div className="px-5 py-2">
                <p className="py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Welcome back
                </p>
                <p className="font-heading text-sm font-bold tracking-tight text-foreground">
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
                  <Icon
                    strokeWidth={1.75}
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                  {label}
                </Link>
              ))}

              <button
                type="button"
                onClick={handleSignOut}
                className={cn(
                  "flex w-full items-center gap-3 px-5 py-3",
                  "text-sm font-medium text-destructive",
                  "transition-colors duration-150 hover:bg-secondary",
                  "cursor-pointer outline-none focus-visible:bg-secondary"
                )}
              >
                <LogOut strokeWidth={1.75} className="size-4 shrink-0" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 px-5 py-3">
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
