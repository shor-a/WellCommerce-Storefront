import ProductPagination from "@/components/atomic/ProductPagination"
import FilterSidebar from "@/components/section/FilterSidebar"
import ProductShowcase from "@/components/section/ProductShowcase"
import { filterPriceRange } from "@/constants/categoryConst"
import { allProducts } from "@/constants/productConst"
import { ProductSize } from "@/constants/sizeConst"
import { useState } from "react"

// Used by ProductShowcase
const categoryName = "Casual"
const totalProducts = 100
// Used by both
const currentPage = 1
// Used by Pagination
const pageSize = 10

export const ProductCategorySection = () => {
  const displayedProducts = allProducts

  const [selectedColor, setColor] = useState<string[]>([])

  const [selectedSize, setSize] = useState<ProductSize[]>([])

  const [sliderRange, setSlider] = useState<[number, number]>([
    filterPriceRange.min,
    filterPriceRange.max,
  ])

  const selectMultipleColor = (addColor: string) => {
    const exist = selectedColor.some((color) => addColor === color)
    console.log(JSON.stringify(selectedColor, null, 1))

    return exist
      ? setColor(selectedColor.filter((color) => addColor !== color))
      : setColor([...selectedColor, addColor])
  }

  const selectMultipleSize = (addSize: ProductSize) => {
    const exist = selectedSize.some((size) => size === addSize)
    console.log(JSON.stringify(selectedSize, null, 1))

    return exist
      ? setSize(selectedSize.filter((size) => size !== addSize))
      : setSize([...selectedSize, addSize])
  }

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
              changeColor={selectMultipleColor}
              changeSize={selectMultipleSize}
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
