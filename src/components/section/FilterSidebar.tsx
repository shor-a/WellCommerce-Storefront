import { ChevronRight, SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { ColorSwatch } from "@/components/atomic/ColorSwatch"
import { SizePill } from "@/components/atomic/SizePill"
import {
  filterCategories,
  filterColors,
  filterDressStyles,
  filterPriceRange,
  filterSizes,
} from "@/constants/categoryConst"
import { ProductSize } from "@/constants/sizeConst"

interface FilterSidebarProps {
  sliderRange: [number, number]
  selectedColor: string
  selectedSize: ProductSize
  changeColor: (newColor: string) => void
  changeSize: (newSize: ProductSize) => void
  changeSliderValue: (newRange: [number, number]) => void
  onClose?: () => void
}

export const FilterSidebar = ({
  sliderRange,
  selectedColor,
  selectedSize,
  changeColor,
  changeSize,
  changeSliderValue,
  onClose,
}: FilterSidebarProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">Filters</span>
        {/* onClose conditional if screen size is SM swap icon to X for close filter pop-up */}
        {onClose ? (
          <button
            type="button"
            aria-label="Close filters"
            className="flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            onClick={onClose}
          >
            <X className="size-5 text-muted-foreground" strokeWidth={1.5} />
          </button>
        ) : (
          <SlidersHorizontal
            className="size-5 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>

      <Separator />

      {/* Category list */}
      <div className="flex flex-col gap-5">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="flex items-center justify-between text-base text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span>{cat}</span>
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        ))}
      </div>

      <Separator />

      {/* Price */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">Price</span>
          <ChevronRight
            className="size-4 rotate-180 text-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Slider
            value={sliderRange}
            min={filterPriceRange.min}
            max={filterPriceRange.max}
            step={10}
            aria-label="Price range"
            onValueChange={(newRange) =>
              changeSliderValue(newRange as [number, number])
            }
          />
          <div className="flex justify-between text-sm font-medium text-foreground">
            <span>${sliderRange[0]}</span>
            <span>${sliderRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">Colors</span>
          <ChevronRight
            className="size-4 rotate-180 text-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {filterColors.map((color) => (
            <ColorSwatch
              key={color.colorId}
              colorId={color.colorId}
              hex={color.hex}
              label={color.label}
              isActive={selectedColor === color.colorId}
              size="lg"
              setColor={changeColor}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">Size</span>
          <ChevronRight
            className="size-4 rotate-180 text-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterSizes.map((size) => (
            <SizePill
              key={size}
              label={size}
              isActive={selectedSize === size}
              className="text-sm"
              setSize={changeSize}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Dress Style */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">Dress Style</span>
          <ChevronRight
            className="size-4 rotate-180 text-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col gap-5">
          {filterDressStyles.map((style) => (
            <button
              key={style}
              type="button"
              className="flex items-center justify-between text-base text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span>{style}</span>
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filter CTA */}
      <Button variant="default" size="xl" className="w-full rounded-full">
        Apply Filter
      </Button>
    </div>
  )
}

export default FilterSidebar
