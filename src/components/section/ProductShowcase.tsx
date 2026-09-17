import type { ProductDetail } from "@/constants/productDetailConst"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DiscPrice from "@/components/atomic/DiscPrice"
import { Rating } from "@/components/atomic/Rating"
import { SortPopover } from "@/components/atomic/SortPopover"
import { generatePath, Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"
import {
  filterSortOptions,
  type SortOption as SortOptionType,
} from "@/constants/categoryConst"

interface ProductShowcaseProps {
  categoryName: string
  products: ProductDetail[]
  currentPage: number
  pageSize: number
  totalProducts: number
  sortOption: SortOptionType
  onSortChange: (option: SortOptionType) => void
  onOpenFilters?: () => void
}

export const ProductShowcase = ({
  categoryName,
  products,
  currentPage,
  pageSize,
  totalProducts,
  sortOption,
  onSortChange,
  onOpenFilters,
}: ProductShowcaseProps) => {
  const rangeStart = totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, totalProducts)

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: title + mobile filter trigger + count + sort */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl font-bold text-foreground md:text-3xl">
            {categoryName}
          </h1>
          {/* Mobile filter trigger  only shown below lg */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            aria-label="Open filters"
            onClick={onOpenFilters}
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            Filters
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
          {totalProducts === 0 ? (
            <span className="whitespace-nowrap">No products found</span>
          ) : (
            <span className="whitespace-nowrap">
              Showing {rangeStart}–{rangeEnd} of {totalProducts} Products
            </span>
          )}
          <SortPopover
            value={sortOption}
            options={filterSortOptions}
            onChange={onSortChange}
          />
        </div>
      </div>

      {/* Product grid  or empty state */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-base font-medium text-foreground">
            No products match your filters
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting the color, size, or price range
          </p>
        </div>
      ) : (
        <div
          aria-label="Product list"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3"
        >
          {products.map((product) => (
            <Link
              key={product.itemId}
              to={generatePath(PageRoutes.PRODUCT, {
                productid: String(product.itemId),
              })}
            >
              <Card aria-label={product.itemName} className="ring-0">
                <CardContent className="flex flex-col gap-3 pt-2">
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-secondary">
                    <img
                      src={product.itemImg}
                      alt={product.itemName}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <p className="truncate text-sm font-bold text-foreground sm:text-base">
                    {product.itemName}
                  </p>
                  <Rating starValue={product.itemRating} showScale />
                  <DiscPrice
                    itemPrice={product.itemPrice}
                    discount={product.discount}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductShowcase
