import ProductPagination from "@/components/atomic/ProductPagination"
import FilterSidebar from "@/components/section/FilterSidebar"
import ProductShowcase from "@/components/section/ProductShowcase"
import {
  allProductDetails,
  populateFilteredProducts,
} from "@/constants/productDetailConst"
import ProductCategoryHooks from "@/hooks/ProductCategoryHooks"

// Used by ProductShowcase
const categoryName = "Casual"
const totalProducts = 100
// Used by both
const currentPage = 1
// Used by Pagination
const pageSize = 10

export const ProductCategorySection = () => {
  const {
    selectedColor,
    selectedSize,
    sliderRange,
    setMultipleColor,
    setMultipleSize,
    setSlider,
  } = ProductCategoryHooks()

  const displayedProducts = populateFilteredProducts(
    selectedColor,
    selectedSize,
    sliderRange,
    allProductDetails
  )

  return (
    <section
      aria-label="Filter and category browse"
      className="w-full bg-background"
    >
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {/* Desktop layout: sidebar + product grid side by side */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Filter sidebar */}
          <aside
            aria-label="Product filters"
            className="hidden lg:block lg:shrink-0 lg:basis-1/4"
          >
            <FilterSidebar
              sliderRange={sliderRange}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              changeColor={setMultipleColor}
              changeSize={setMultipleSize}
              changeSliderValue={setSlider}
            />
          </aside>

          {/* Products panel */}
          <div className="flex flex-col gap-6 lg:basis-3/4">
            <ProductShowcase
              categoryName={categoryName}
              products={displayedProducts}
              currentPage={currentPage}
              pageSize={pageSize}
              totalProducts={totalProducts}
            />
            {/* Pagination */}
            <ProductPagination
              currentPage={currentPage}
              startPages={[1, 2, 3]}
              endPages={[8, 9, 10]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCategorySection
