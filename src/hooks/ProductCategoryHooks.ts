import type { ProductSize } from "@/constants/sizeConst"
import {
  filterPriceRange,
  SortOption,
  type SortOption as SortOptionType,
} from "@/constants/categoryConst"
import { useState } from "react"

export type PCategoryHook = ReturnType<typeof ProductCategoryHooks>

const ProductCategoryHooks = () => {
  const [selectedColor, setColor] = useState<string[]>([])
  const [selectedSize, setSize] = useState<ProductSize[]>([])
  const [sliderRange, setSlider] = useState<[number, number]>([
    filterPriceRange.min,
    filterPriceRange.max,
  ])
  const [selectedCategory, setCategory] = useState<string[]>([])
  const [selectedDressStyle, setDressStyle] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOptionType>(
    SortOption.MOST_POPULAR
  )
  const [currentPage, setCurrentPage] = useState(1)

  const setMultipleColor = (addColor: string) => {
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

  const setMultipleCategory = (addCategory: string) => {
    setCurrentPage(1)
    const exists = selectedCategory.some((cat) => cat === addCategory)
    return exists
      ? setCategory(selectedCategory.filter((cat) => cat !== addCategory))
      : setCategory([...selectedCategory, addCategory])
  }

  const setMultipleDressStyle = (addStyle: string) => {
    setCurrentPage(1)
    const exists = selectedDressStyle.some((style) => style === addStyle)
    return exists
      ? setDressStyle(selectedDressStyle.filter((style) => style !== addStyle))
      : setDressStyle([...selectedDressStyle, addStyle])
  }

  const handleSliderChange = (range: [number, number]) => {
    setCurrentPage(1)
    setSlider(range)
  }

  const handleSortChange = (option: SortOptionType) => {
    setCurrentPage(1)
    setSortOption(option)
  }

  const clearAllFilter = () => {
    setCurrentPage(1)
    setColor([])
    setSize([])
    setSlider([0, 300])
    setCategory([])
    setDressStyle([])
  }

  return {
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
  }
}

export default ProductCategoryHooks
