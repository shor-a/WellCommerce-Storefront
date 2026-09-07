import { PageRoutes } from "@/config/routes"
import { X } from "lucide-react"
import { Link } from "react-router-dom"

const OfferNavbar = () => {
  return (
    <>
      <div className="offernav bg-primary p-2 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between gap-5 px-2">
          <div className="flex basis-11/12 items-center justify-center">
            <p className="mx-1 text-sm">
              Sign up and get 20% off to you first order.
            </p>
            <Link className="text-sm" to={PageRoutes.REGISTER}>
              <u>Sign Up Now</u>
            </Link>
          </div>

          <div className="flex basis-1/12 items-center justify-center">
            <X className="size-5" strokeWidth={3} />
          </div>
        </div>
      </div>
    </>
  )
}

export default OfferNavbar
