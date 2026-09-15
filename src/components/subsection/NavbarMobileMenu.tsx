import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PageRoutes } from "@/config/routes"
import { mobileNavLinks } from "@/constants/navbarConst"

interface NavbarMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const NavbarMobileMenu = ({ isOpen, onClose }: NavbarMobileMenuProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)

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
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
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
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
                "flex items-center justify-between px-5 py-3.5",
                "text-sm font-medium text-foreground",
                "transition-colors duration-150 hover:bg-secondary",
                "focus-visible:bg-secondary outline-none cursor-pointer"
              )}
            >
              {link.label}
              <ChevronRight
                strokeWidth={1.75}
                className="size-4 shrink-0 text-muted-foreground"
              />
            </Link>
          ))}
        </nav>

        <Separator />

        {/* Footer CTA */}
        <div className="flex flex-col gap-3 px-5 py-5">
          <Button
            render={<Link to={PageRoutes.LOGIN} onClick={onClose} />}
            nativeButton={false}
            variant="default"
            className="h-11 w-full rounded-full cursor-pointer"
          >
            Sign In
          </Button>
          <Button
            render={<Link to={PageRoutes.REGISTER} onClick={onClose} />}
            nativeButton={false}
            variant="outline"
            className="h-11 w-full rounded-full cursor-pointer"
          >
            Create Account
          </Button>
        </div>
      </div>
    </>
  )
}

export default NavbarMobileMenu
