import { Button } from "../ui/button"

import { PageRoutes } from "@/config/routes"
import { brandsImage } from "@/constants/homepageConst"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <>
      <div className="hero bg-secondary pt-20 pb-0">
        <div className="container mx-auto gap-10 px-10">
          {/* Because the parent is not flex then we use w-full
              If the parent is flex we can use basis-full */}
          <div className="flex w-full flex-row justify-start">
            <div className="basis-7/12">
              <h1 className="mb-4 text-5xl">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="mb-6 text-muted-foreground">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individually and cater to
                your sense of style.
              </p>

              <Button
                render={<Link to={PageRoutes.BROWSE} />}
                nativeButton={false}
                className="mb-10"
                size="xl"
              >
                Shop Now
              </Button>

              <div className="grid grid-cols-3 gap-4">
                <div className="border-r-2">
                  <p className="text-4xl font-bold text-foreground">200+</p>
                  <p className="text-md mt-3 text-muted-foreground">
                    International Brands
                  </p>
                </div>
                <div className="border-r-2">
                  <p className="text-4xl font-bold text-foreground">2.000+</p>
                  <p className="text-md mt-3 text-muted-foreground">
                    High-Quality Products
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-foreground">30.000+</p>
                  <p className="text-md mt-3 text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-5/12"></div>
          </div>
        </div>

        <div className="brands bg-primary">
          <div className="container mx-auto mt-15 grid h-25 grid-cols-5 items-center justify-items-center gap-10">
            {brandsImage.map((bImg) => (
              <div
                key={bImg.alt}
                className="flex h-25 w-40 items-center justify-center rounded"
              >
                <img
                  className="h-full w-full object-contain"
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
