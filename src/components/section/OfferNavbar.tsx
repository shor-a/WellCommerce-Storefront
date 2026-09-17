import { X } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PageRoutes } from "@/config/routes/routes"
import useOfferNavbar from "@/hooks/useOfferNavbarHooks"

interface OfferNavbarProps {
  className?: string
}

export const OfferNavbar = ({ className }: OfferNavbarProps) => {
  const { isDismissed, dismiss } = useOfferNavbar()
  const isAuthenticated = !!localStorage.getItem("authenticated")

  // Hide if user dismissed it or is already logged in
  if (isDismissed || isAuthenticated) return null

  return (
    <div
      className={cn(
        "offernav w-full bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="container mx-auto flex items-center px-4 py-2 sm:px-6 lg:px-10">
        {/* Left spacer on desktop  mirrors X button width to keep text truly centered */}
        <div className="hidden shrink-0 lg:block lg:w-5" aria-hidden="true" />

        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-0">
          <p className="text-xs sm:text-sm">
            Sign up and get 20% off to your first order.
          </p>
          <Link
            className="text-xs font-medium underline underline-offset-2 transition-opacity duration-150 hover:opacity-80 sm:text-sm"
            to={PageRoutes.REGISTER}
          >
            Sign Up Now
          </Link>
        </div>

        {/* X button  desktop only; on mobile the banner is dismissible only by logging in */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss offer"
          onClick={dismiss}
          className="hidden shrink-0 cursor-pointer text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground lg:flex"
        >
          <X strokeWidth={3} className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default OfferNavbar
