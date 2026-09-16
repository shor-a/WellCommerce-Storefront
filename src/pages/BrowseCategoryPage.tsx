import { useSearchParams } from "react-router-dom"
import Navbar from "@/components/section/Navbar"
import NavigationText from "@/components/section/NavigationText"
import ProductCategorySection from "@/components/section/ProductCategorySection"
import Footer from "@/components/section/Footer"
import { PageRoutes } from "@/config/routes"

const browseCrumbs = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "Shop", href: null },
]

const BrowseCategoryPage = () => {
  // Re-mount ProductCategorySection when the search params change so the
  // hook re-reads the URL and seeds the correct initial filter state.
  const [searchParams] = useSearchParams()
  const sectionKey = searchParams.toString()

  return (
    <>
      <Navbar />
      <NavigationText crumbs={browseCrumbs} />
      <ProductCategorySection key={sectionKey} />
      <Footer />
    </>
  )
}

export default BrowseCategoryPage
