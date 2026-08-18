import type { Product } from "@/constants/productConst"

import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import DiscPrice from "@/components/atomic/DiscPrice"
import { Rating } from "@/components/atomic/Rating"

interface ProductShowcaseProps {
  categoryName: string
  products: Product[]
  currentPage: number
  pageSize: number
  totalProducts: number
}

export const ProductShowcase = ({
  categoryName,
  products,
  currentPage,
  pageSize,
  totalProducts,
}: ProductShowcaseProps) => (
  <div className="flex flex-col gap-6">
    {/* Top bar: title + mobile filter trigger + count + sort */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          {categoryName}
        </h1>
        {/* Mobile filter trigger — only shown below lg */}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.5} />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          Showing {(currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, totalProducts)} of {totalProducts}{" "}
          Products
        </span>
        <span className="hidden sm:inline">
          Sort by:
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1 px-2 py-1 font-medium text-foreground"
          >
            Most Popular
            <ChevronDown className="size-4" strokeWidth={1.5} />
          </Button>
        </span>
      </div>
    </div>

    {/* Product grid */}
    <div
      aria-label="Product list"
      className="grid grid-cols-2 gap-4 lg:grid-cols-3"
    >
      {products.map((product) => (
        <article
          key={product.itemId}
          className="flex flex-col gap-2"
          aria-label={product.itemName}
        >
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
            <img
              src={product.itemImg}
              alt={product.itemName}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-1 px-1">
            <p className="truncate text-sm font-bold text-foreground sm:text-base">
              {product.itemName}
            </p>
            <Rating starValue={product.itemRating} showScale />
            <DiscPrice
              itemPrice={product.itemPrice}
              discount={product.discount}
            />
          </div>
        </article>
      ))}
    </div>
  </div>
)

export default ProductShowcase
