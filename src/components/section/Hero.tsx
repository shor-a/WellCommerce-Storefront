import heroSm from "@/assets/images/general/hero-sm.webp"
import { Button } from "../ui/button"

import { PageRoutes } from "@/config/routes/routes"
import { brandsImage } from "@/constants/homepageConst"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <>
      <div className="hero bg-secondary pt-10 pb-0 lg:pt-20">
        <div className="container mx-auto gap-10 px-4 lg:px-10">
          {/* Mobile: stacked column  text then image. Desktop: side-by-side row */}
          <div className="flex w-full flex-col lg:flex-row lg:justify-start">
            <div className="flex flex-col md:items-center lg:basis-7/12 lg:items-start">
              <h1 className="mb-4 text-2xl md:text-5xl">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="mb-2 max-w-80 self-start text-xs text-muted-foreground md:max-w-150 md:text-sm lg:mb-6">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individually and cater to
                your sense of style.
              </p>

              {/* Mobile: full-width image flush into button; Desktop: hidden (bg-image handles it) */}
              <div className="-mx-4 flex justify-center lg:hidden">
                <img
                  src={heroSm}
                  alt="Hero fashion models"
                  fetchPriority="high"
                  className="w-md"
                />
              </div>

              <Button
                render={<Link to={PageRoutes.BROWSE} />}
                nativeButton={false}
                className="-mt-0.5 mb-4 w-full border-2 border-white/15 md:w-110 lg:mt-0 lg:mb-6 lg:w-auto lg:border-0"
                size="xl"
              >
                Shop Now
              </Button>

              {/* Mobile: flex row with dividers; Desktop: grid 3-cols with dividers */}
              <div className="mb-8 flex flex-row items-start justify-between lg:mb-0 lg:grid lg:grid-cols-3 lg:gap-4">
                <div className="flex-1 border-r border-border pr-4 text-center lg:border-r-2 lg:pr-0 lg:text-left">
                  <p className="text-2xl font-bold text-foreground md:text-4xl">
                    200+
                  </p>
                  <p className="lg:text-md mt-1 text-xs text-muted-foreground lg:mt-3">
                    International Brands
                  </p>
                </div>
                <div className="flex-1 border-r border-border px-4 text-center lg:border-r-2 lg:px-0 lg:text-left">
                  <p className="text-2xl font-bold text-foreground md:text-4xl">
                    2,000+
                  </p>
                  <p className="lg:text-md mt-1 text-xs text-muted-foreground lg:mt-3">
                    High-Quality Products
                  </p>
                </div>
                <div className="flex-1 pl-4 text-center lg:pl-0 lg:text-left">
                  <p className="text-2xl font-bold text-foreground md:text-4xl">
                    30,000+
                  </p>
                  <p className="lg:text-md mt-1 text-xs text-muted-foreground lg:mt-3">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="brands bg-primary">
          <div className="container mx-auto grid grid-cols-5 items-center justify-items-center gap-2 px-3 py-5 lg:mt-10 lg:h-25 lg:gap-10 lg:px-10 lg:py-0">
            {brandsImage.map((bImg) => (
              <div key={bImg.alt} className="flex items-center justify-center">
                <img
                  className="h-4 w-auto object-contain lg:h-10"
                  src={bImg.src}
                  alt={bImg.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
