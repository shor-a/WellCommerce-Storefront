import type { product } from "@/types/product"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import Rating from "@/components/atomic/Rating"
import DiscPrice from "../atomic/DiscPrice"

interface ShowcaseProps {
  className?: string
  title: string
  product: product[]
}

const ShortShowcase = ({ title, product, className }: ShowcaseProps) => {
  return (
    <>
      <section className={cn("showcase", className)}>
        <div className={`container mx-auto px-10 ${className}`}>
          <h2 className="text-center text-4xl">{title}</h2>
          <div className="flex w-full flex-row justify-between gap-5 pt-10 pb-5">
            {product.map((p) => (
              <div className="basis-3/12">
                <Card className="border-none p-0" key={p.itemId}>
                  <CardContent className="flex flex-col gap-3 pt-2 pb-5">
                    <div className="flex justify-center bg-secondary">
                      <img
                        className="sm:h-25 sm:w-30 lg:h-60 lg:w-70"
                        src={p.itemImg}
                        alt={`product-${p.itemId}`}
                      />
                    </div>
                    <p className="text-md">{p.itemName}</p>

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
            ))}
          </div>
          <div className="flex w-full items-center justify-center pb-10">
            <Button className="px-18 py-5" variant="outline">
              View All
            </Button>
          </div>
          <Separator />
        </div>
      </section>
    </>
  )
}

export default ShortShowcase
