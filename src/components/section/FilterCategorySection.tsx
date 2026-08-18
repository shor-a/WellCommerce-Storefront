import ProductPagination from "@/components/atomic/ProductPagination"
import FilterSidebar from "@/components/section/FilterSidebar"
import ProductShowcase from "@/components/section/ProductShowcase"
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
          {/* Filter sidebar */}
          <aside
            aria-label="Product filters"
            className="hidden lg:block lg:shrink-0 lg:basis-1/4"
          >
            <FilterSidebar />
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

export default FilterCategorySection
