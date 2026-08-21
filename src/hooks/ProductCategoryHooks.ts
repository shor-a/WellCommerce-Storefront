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

  const setMultipleColor = (addColor: string) => {
    const exist = selectedColor.some((color) => addColor === color)
    console.log(JSON.stringify(selectedColor, null, 1))

    return exist
      ? setColor(selectedColor.filter((color) => addColor !== color))
      : setColor([...selectedColor, addColor])
  }

  const setMultipleSize = (addSize: ProductSize) => {
    const exist = selectedSize.some((size) => size === addSize)
    console.log(JSON.stringify(selectedSize, null, 1))

    return exist
      ? setSize(selectedSize.filter((size) => size !== addSize))
      : setSize([...selectedSize, addSize])
  }

  return {
    selectedColor,
    selectedSize,
    sliderRange,
    setMultipleColor,
    setMultipleSize,
    setSlider,
  }
}

export default ProductCategoryHooks
