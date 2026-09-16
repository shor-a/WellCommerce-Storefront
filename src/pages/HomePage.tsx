import DressStyle from "@/components/section/DressStyle"
import Footer from "@/components/section/Footer"
import HappyCustomers from "@/components/section/HappyCustomers"
import Hero from "@/components/section/Hero"
import Navbar from "@/components/section/Navbar"
import ShortShowcase from "@/components/section/ShortShowcase"
import { dressStyles } from "@/constants/homepageConst"
import { allProducts } from "@/constants/productConst"
import reviews from "@/constants/testimonyConst"

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <ShortShowcase
          title="NEW ARRIVALS"
          product={allProducts.slice(0, 4)}
          className="pt-15 lg:pt-20"
        />
        <ShortShowcase
          title="TOP SELLING"
          product={allProducts.slice(4, 8)}
          className="pt-15 lg:pt-20"
        />
        <DressStyle styles={dressStyles} />
        <HappyCustomers testimonies={reviews} />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
