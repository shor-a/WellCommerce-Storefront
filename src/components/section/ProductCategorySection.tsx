import { useState } from "react"

import ProductPagination from "@/components/atomic/ProductPagination"
import FilterSidebar from "@/components/section/FilterSidebar"
import ProductShowcase from "@/components/section/ProductShowcase"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  allProductDetails,
  populateFilteredProducts,
} from "@/constants/productDetailConst"
import ProductCategoryHooks from "@/hooks/ProductCategoryHooks"
import {
  allStyles,
  filterDressStyles,
  pageSize,
} from "@/constants/categoryConst"
import DressStyle from "./DressStyle"

export const ProductCategorySection = () => {
  const {
    selectedColor,
    selectedSize,
    selectedCategory,
    selectedDressStyle,
    sortOption,
    sliderRange,
    currentPage,
    setMultipleColor,
    setMultipleSize,
    setMultipleCategory,
    setMultipleDressStyle,
    handleSliderChange,
    handleSortChange,
    setCurrentPage,
    clearAllFilter,
  } = ProductCategoryHooks()

  // Mobile filter sheet open/close
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Filtered + sorted products (all pages)
  const filteredProducts = populateFilteredProducts(
    selectedColor,
    selectedSize,
    sliderRange,
    allProductDetails,
    selectedCategory,
    selectedDressStyle,
    sortOption
  )

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize))

  // Slice to current page
  const pageStart = (currentPage - 1) * pageSize
  const pagedProducts = filteredProducts.slice(pageStart, pageStart + pageSize)

  const filterSidebarProps = {
    sliderRange,
    selectedColor,
    selectedSize,
    selectedCategory,
    selectedDressStyle,
    changeColor: setMultipleColor,
    changeSize: setMultipleSize,
    changeCategory: setMultipleCategory,
    changeDressStyle: setMultipleDressStyle,
    changeSliderValue: handleSliderChange,
    clearAllFilter: clearAllFilter,
  }

  return (
    <section
      aria-label="Filter and category browse"
      className="w-full bg-background"
    >
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {/* Desktop layout: sidebar + product grid side by side */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Desktop filter sidebar — hidden on mobile */}
          <aside
            aria-label="Product filters"
            className="hidden lg:block lg:shrink-0 lg:basis-1/4"
          >
            <FilterSidebar {...filterSidebarProps} />
          </aside>

          {/* Products panel */}
          <div className="flex flex-col gap-6 lg:basis-3/4">
            <ProductShowcase
              categoryName={
                selectedDressStyle.length > 0
                  ? selectedDressStyle[0]
                  : allStyles
              }
              products={pagedProducts}
              currentPage={currentPage}
              pageSize={pageSize}
              totalProducts={totalProducts}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              onOpenFilters={() => setFiltersOpen(true)}
            />
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Mobile filter sheet — rendered outside the grid so it overlays correctly */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent>
          <div className="p-5">
            <FilterSidebar
              {...filterSidebarProps}
              onClose={() => setFiltersOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default ProductCategorySection
