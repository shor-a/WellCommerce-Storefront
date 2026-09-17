import { useParams } from "react-router-dom"
import Footer from "@/components/section/Footer"
import MultiMenuSection from "@/components/section/MultiMenuSection"
import Navbar from "@/components/section/Navbar"
import NavigationText from "@/components/section/NavigationText"
import ProductSection from "@/components/section/ProductSection"
import ShortShowcase from "@/components/section/ShortShowcase"
import { allProducts } from "@/constants/productConst"
import { allProductDetails } from "@/constants/productDetailConst"
import { PageRoutes } from "@/config/routes/routes"

const ProductDetailPage = () => {
  const { productid } = useParams()
  const product = allProductDetails[productid ? parseInt(productid) - 1 : 0]

  const productCrumbs = [
    { label: "Home", href: PageRoutes.HOME },
    { label: "Shop", href: PageRoutes.BROWSE },
    { label: product?.itemName ?? "Product", href: null },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NavigationText crumbs={productCrumbs} />
      <ProductSection />
      <MultiMenuSection />
      <ShortShowcase
        title="You might also like"
        product={allProducts.slice(0, 4)}
        showAllBtn={false}
        className="pt-8"
      />
      <Footer />
    </div>
  )
}

export default ProductDetailPage
