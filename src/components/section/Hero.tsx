import { Button } from "../ui/button"

const Hero = () => {
  return (
    <>
      <div className="hero bg-secondary px-5 py-20">
        <div className="container mx-auto flex items-center justify-start gap-10 px-2">
          <div className="flex basis-7/12 flex-col justify-start">
            <h1 className="mb-4 text-5xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="mb-6 text-muted-foreground">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individually and cater to your sense of
              style.
            </p>

            <div className="flex">
              <Button className="mb-10" size="xl">
                Shop Now
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="border-r-2">
                <p className="text-4xl font-bold text-foreground">200+</p>
                <p className="text-md text-muted-foreground">
                  International Brands
                </p>
              </div>
              <div className="">
                <p className="text-4xl font-bold text-foreground">2.000+</p>
                <p className="text-md text-muted-foreground">
                  High-Quality Products
                </p>
              </div>
              <div className="">
                <p className="text-4xl font-bold text-foreground">30.000+</p>
                <p className="text-md text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="flex basis-5/12 items-center justify-center"></div>

{/* container (flex-col)
├── top row (flex row)
│   ├── basis-7/12 — text, button, stats
│   └── basis-5/12 — image
└── bottom row (grid-cols-5) — brand logos */}

          <div className="grid grid-cols-5">
            <p>as</p>
            <p>as</p>
            <p>as</p>
            <p>as</p>
            <p>as</p>
            {/* <img src="" alt="logo-1" />
              <img src="" alt="logo-1" />
              <img src="" alt="logo-1" />
              <img src="" alt="logo-1" />
              <img src="" alt="logo-1" /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
