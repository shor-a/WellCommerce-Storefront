import Navbar from "@/components/section/Navbar"
import NavigationText from "@/components/section/NavigationText"
import ProductCategorySection from "@/components/section/ProductCategorySection"
import Footer from "@/components/section/Footer"
import { PageRoutes } from "@/config/routes"

const browseCrumbs = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "Shop", href: null },
]

const BrowseCategoryPage = () => (
  <>
    <Navbar />
    <NavigationText crumbs={browseCrumbs} />
    <ProductCategorySection />
    <Footer />
  </>
)

export default BrowseCategoryPage
