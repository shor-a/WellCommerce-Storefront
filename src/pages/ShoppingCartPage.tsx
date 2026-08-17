import { ChevronRight } from "lucide-react"
import Navbar from "@/components/section/Navbar"
import CartSection from "@/components/section/CartSection"
import Footer from "@/components/section/Footer"
import NavigationText from "@/components/section/NavigationText"

const cartCrumbs = [
  { label: "Home", href: "/" },
  { label: "Cart", href: null },
]

const ShoppingCartPage = () => (
  <>
    <Navbar />
    <NavigationText />
    <CartSection />
    <Footer />
  </>
)

export default ShoppingCartPage
