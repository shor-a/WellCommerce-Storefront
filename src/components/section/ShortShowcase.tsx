import type { Product } from "@/constants/productConst"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import Rating from "@/components/atomic/Rating"
import DiscPrice from "../atomic/DiscPrice"
import { generatePath, Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

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
  return (
    <>
      <section className={cn("showcase", className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-center text-xl md:text-3xl">{title}</h2>
          <div className="grid grid-cols-2 gap-4 pt-10 pb-5 lg:grid-cols-4">
            {product.map((p) => (
              <Link
                key={p.itemId}
                to={generatePath(PageRoutes.PRODUCT, {
                  productid: String(p.itemId),
                })}
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col gap-3 pt-2">
                    <div className="flex justify-center overflow-hidden rounded-md bg-secondary">
                      <img
                        className="h-40 w-full object-contain sm:h-44 lg:h-60"
                        src={p.itemImg}
                        alt={`product-${p.itemId}`}
                      />
                    </div>
                    <p className="lg:text-md text-sm leading-snug font-bold">
                      {p.itemName}
                    </p>
                    <Rating starValue={p.itemRating} />
                    <DiscPrice itemPrice={p.itemPrice} discount={p.discount} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {showAllBtn ? (
            <div className="flex w-full items-center justify-center pb-5">
              <Button
                render={<Link to={PageRoutes.BROWSE} />}
                nativeButton={false}
                className="w-full px-18 py-5 lg:w-auto"
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
