import DressStyle from "@/components/section/DressStyle"
import Footer from "@/components/section/Footer"
import Hero from "@/components/section/Hero"
import Navbar from "@/components/section/Navbar"
import ShortShowcase from "@/components/section/ShortShowcase"
import { arrivals } from "@/config/constants/productConst"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShortShowcase
        title="NEW ARRIVALS"
        product={arrivals.slice(0, 4)}
        className="pt-10 pb-5"
      />
      <ShortShowcase
        title="TOP SELLING"
        product={arrivals.slice(4)}
        className="py-0"
      />
      <DressStyle />
      <Footer />
    </>
  )
}

export default HomePage
