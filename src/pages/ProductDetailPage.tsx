import Footer from "@/components/section/Footer"
import MultiMenuSection from "@/components/section/MultiMenuSection"
import Navbar from "@/components/section/Navbar"
import NavigationText from "@/components/section/NavigationText"
import ProductSection from "@/components/section/ProductSection"
import ShortShowcase from "@/components/section/ShortShowcase"
import { allProducts } from "@/constants/productConst"

const ProductDetailPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <NavigationText />
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

export default ProductDetailPage
