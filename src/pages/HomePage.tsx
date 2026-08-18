import DressStyle from "@/components/section/DressStyle"
import Footer from "@/components/section/Footer"
import HappyCustomers from "@/components/section/HappyCustomers"
import Hero from "@/components/section/Hero"
import Navbar from "@/components/section/Navbar"
import ShortShowcase from "@/components/section/ShortShowcase"
import { productList } from "@/constants/productConst"

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <ShortShowcase
          title="NEW ARRIVALS"
          product={productList.slice(0, 4)}
          className="pt-10 pb-5"
        />
        <ShortShowcase
          title="TOP SELLING"
          product={productList.slice(4, 8)}
          className="py-0"
        />
        <DressStyle />
        <HappyCustomers />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
