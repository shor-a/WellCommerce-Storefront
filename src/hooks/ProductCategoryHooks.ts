import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { ProductSize } from "@/constants/sizeConst"
import {
  filterPriceRange,
  SortOption,
  filterSortOptions,
  type SortOption as SortOptionType,
} from "@/constants/categoryConst"
import { NavFilterParam } from "@/constants/navbarConst"

export type PCategoryHook = ReturnType<typeof ProductCategoryHooks>

const ProductCategoryHooks = () => {
  const [searchParams] = useSearchParams()

  // ── Seed initial state from URL params
  const paramCategory = searchParams.get(NavFilterParam.CATEGORY)
  const paramSort = searchParams.get(NavFilterParam.SORT)

  const initialCategory = paramCategory ? [paramCategory] : []
  const initialSort: SortOptionType =
    filterSortOptions.find((o) => o === paramSort) ?? SortOption.MOST_POPULAR

  // ── Filter state
  const [selectedColor, setColor] = useState<string[]>([])
  const [selectedSize, setSize] = useState<ProductSize[]>([])
  const [sliderRange, setSlider] = useState<[number, number]>([
    filterPriceRange.min,
    filterPriceRange.max,
  ])
  const [selectedCategory, setCategory] = useState<string[]>(initialCategory)
  const [selectedDressStyle, setDressStyle] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOptionType>(initialSort)
  const [currentPage, setCurrentPage] = useState(1)

  // ── Toggle helpers
  const setMultipleColor = (addColor: string) => {
    setCurrentPage(1)
    const exists = selectedColor.some((c) => c === addColor)
    setColor(
      exists
        ? selectedColor.filter((c) => c !== addColor)
        : [...selectedColor, addColor]
    )
  }

  const setMultipleSize = (addSize: ProductSize) => {
    setCurrentPage(1)
    const exists = selectedSize.some((s) => s === addSize)
    setSize(
      exists
        ? selectedSize.filter((s) => s !== addSize)
        : [...selectedSize, addSize]
    )
  }

  const setMultipleCategory = (addCategory: string) => {
    setCurrentPage(1)
    const exists = selectedCategory.some((c) => c === addCategory)
    setCategory(
      exists
        ? selectedCategory.filter((c) => c !== addCategory)
        : [...selectedCategory, addCategory]
    )
  }

  const setMultipleDressStyle = (addStyle: string) => {
    setCurrentPage(1)
    const exists = selectedDressStyle.some((s) => s === addStyle)
    setDressStyle(
      exists
        ? selectedDressStyle.filter((s) => s !== addStyle)
        : [...selectedDressStyle, addStyle]
    )
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
    setSlider([filterPriceRange.min, filterPriceRange.max])
    setCategory([])
    setDressStyle([])
    setSortOption(SortOption.MOST_POPULAR)
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
