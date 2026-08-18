import { ChevronDown, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DiscPrice from "@/components/atomic/DiscPrice"
import { Rating } from "@/components/atomic/Rating"
import FilterSidebar from "@/components/section/FilterSidebar"
import { productList } from "@/constants/productConst"

const categoryName = "Casual"
const totalProducts = 100
const currentPage = 1
const pageSize = 10

export const FilterCategorySection = () => {
  const displayedProducts = productList

  return (
    <section
      aria-label="Filter and category browse"
      className="w-full bg-background"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        {/* Desktop layout: sidebar + product grid side by side */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Filter sidebar — hidden on mobile, shown on desktop */}
          <aside
            aria-label="Product filters"
            className="hidden lg:block lg:shrink-0 lg:basis-1/4"
          >
            <FilterSidebar />
          </aside>

          {/* Products panel */}
          <div className="flex flex-col gap-6 lg:basis-3/4">
            {/* Top bar: title + mobile filter button + count + sort */}
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
                  {Math.min(currentPage * pageSize, totalProducts)} of{" "}
                  {totalProducts} Products
                </span>
                <span className="hidden sm:inline">
                  Sort by:{" "}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Most Popular
                    <ChevronDown className="size-4" strokeWidth={1.5} />
                  </button>
                </span>
              </div>
            </div>

            {/* Product grid */}
            <div
              aria-label="Product list"
              className="grid grid-cols-2 gap-4 lg:grid-cols-3"
            >
              {displayedProducts.map((product) => (
                <article
                  key={product.itemId}
                  className="flex flex-col gap-2"
                  aria-label={product.itemName}
                >
                  {/* Product image */}
                  <div className="aspect-5/5 w-full overflow-hidden rounded-2xl bg-secondary">
                    <img
                      src={product.itemImg}
                      alt={product.itemName}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Product info */}
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

            {/* Pagination */}
            <div className="border-t border-border pt-6">
              <Pagination className="justify-between">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className="rounded-[7px] border-border px-4 [&_span]:block"
                    />
                  </PaginationItem>
                </PaginationContent>
                <PaginationContent>
                  {[1, 2, 3].map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        className={
                          page === currentPage
                            ? "rounded-[7px] border-transparent bg-secondary text-foreground hover:bg-secondary"
                            : "rounded-[7px] border-transparent"
                        }
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {[8, 9, 10].map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        className={
                          page === currentPage
                            ? "rounded-[7px] border-transparent bg-secondary text-foreground hover:bg-secondary"
                            : "rounded-[7px] border-transparent"
                        }
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="rounded-[7px] border-border px-4 [&_span]:block"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilterCategorySection
