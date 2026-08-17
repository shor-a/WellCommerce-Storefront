import type { Product } from "@/constants/productConst"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import Rating from "@/components/atomic/Rating"
import DiscPrice from "../atomic/DiscPrice"
import { generatePath, Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes"

interface ShowcaseProps {
  className?: string
  title: string
  showAllBtn?: boolean
  product: Product[]
}

const ShortShowcase = ({
  title,
  product,
  showAllBtn = true,
  className,
}: ShowcaseProps) => {
  const currentSlug = "1"
  return (
    <>
      <section className={cn("showcase", className)}>
        <div className={`container mx-auto px-10 ${className}`}>
          <h2 className="text-center text-4xl">{title}</h2>
          <div className="flex w-full flex-row justify-between gap-5 pt-10 pb-5">
            {product.map((p) => (
              <Link
                key={p.itemId}
                to={generatePath(PageRoutes.PRODUCT, {
                  productid: currentSlug,
                })}
              >
                <div className="basis-3/12">
                  <Card className="pt-3 sm:min-h-58 lg:min-h-90">
                    <CardContent className="flex flex-col gap-3 pt-2">
                      <div className="flex justify-center bg-secondary">
                        <img
                          className="sm:h-30 sm:w-40 lg:h-60 lg:w-70"
                          src={p.itemImg}
                          alt={`product-${p.itemId}`}
                        />
                      </div>
                      <p className="text-md font-bold">{p.itemName}</p>

                      {<Rating starValue={p.itemRating} />}
                      {
                        <DiscPrice
                          itemPrice={p.itemPrice}
                          discount={p.discount}
                        />
                      }
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
          {showAllBtn ? (
            <div className="flex w-full items-center justify-center pb-10">
              <Button
                render={<Link to={PageRoutes.BROWSE} />}
                className="px-18 py-5"
                variant="outline"
              >
                View All
              </Button>
            </div>
          ) : (
            <></>
          )}

          <Separator />
        </div>
      </section>
    </>
  )
}

export default ShortShowcase
