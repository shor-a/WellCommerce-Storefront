import type { ProductSize } from "@/constants/sizeConst"
import { filterPriceRange } from "@/constants/categoryConst"
import { useState } from "react"

export type PCategoryHook = ReturnType<typeof ProductCategoryHooks>

const ProductCategoryHooks = () => {
  const [selectedColor, setColor] = useState<string[]>([])
  const [selectedSize, setSize] = useState<ProductSize[]>([])
  const [sliderRange, setSlider] = useState<[number, number]>([
    filterPriceRange.min,
    filterPriceRange.max,
  ])
  const [currentPage, setCurrentPage] = useState(1)

  const setMultipleColor = (addColor: string) => {
    // Reset to page 1 whenever a filter changes
    setCurrentPage(1)
    const exists = selectedColor.some((color) => addColor === color)
    return exists
      ? setColor(selectedColor.filter((color) => addColor !== color))
      : setColor([...selectedColor, addColor])
  }

  const setMultipleSize = (addSize: ProductSize) => {
    setCurrentPage(1)
    const exists = selectedSize.some((size) => size === addSize)
    return exists
      ? setSize(selectedSize.filter((size) => size !== addSize))
      : setSize([...selectedSize, addSize])
  }

  const handleSliderChange = (range: [number, number]) => {
    setCurrentPage(1)
    setSlider(range)
  }

  return {
    selectedColor,
    selectedSize,
    sliderRange,
    currentPage,
    setMultipleColor,
    setMultipleSize,
    handleSliderChange,
    setCurrentPage,
  }
}

export default ProductCategoryHooks
