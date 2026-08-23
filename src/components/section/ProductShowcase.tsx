import type { ProductDetail } from "@/constants/productDetailConst"

import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import DiscPrice from "@/components/atomic/DiscPrice"
import { Rating } from "@/components/atomic/Rating"
import { generatePath, Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes"
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
            onClick={onOpenFilters}
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            Filters
          </Button>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {totalProducts === 0 ? (
            <span>No products found</span>
          ) : (
            <span>
              Showing {rangeStart}–{rangeEnd} of {totalProducts} Products
            </span>
          )}
          <span className="hidden sm:inline">
            Sort by:
            <Popover>
              <PopoverTrigger
                className="inline-flex h-auto items-center gap-1 rounded px-2 py-1 text-sm font-medium text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={`Sort by: ${sortOption}`}
              >
                {sortOption}
                <ChevronDown className="size-4" strokeWidth={1.5} />
              </PopoverTrigger>
              <PopoverContent align="end" side="bottom" className="w-48 p-1">
                {filterSortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none ${
                      option === sortOption
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => onSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </span>
        </div>
      </div>

      {/* Product grid — or empty state */}
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
