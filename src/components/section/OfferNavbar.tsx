import { PageRoutes } from "@/config/routes"
import { X } from "lucide-react"
import { Link } from "react-router-dom"

const OfferNavbar = () => {
  return (
    <>
      <div className="offernav bg-primary p-2 text-primary-foreground">
        <div className="container mx-auto flex items-center px-4 sm:px-6 lg:px-10">
          {/* Left spacer — mirrors the X button width to keep text truly centered */}

          <div className="flex flex-1 items-center justify-center">
            <p className="mx-1 text-sm">
              Sign up and get 20% off to you first order.
            </p>
            <Link className="text-sm" to={PageRoutes.REGISTER}>
              <u>Sign Up Now</u>
            </Link>
          </div>

          <X className="size-5 shrink-0" strokeWidth={3} />
        </div>
      </div>
    </>
  )
}

export default OfferNavbar
