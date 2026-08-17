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

const selectedColor = "blue"
const selectedSize = "Large"
const priceRange = [filterPriceRange.min, filterPriceRange.max]

interface FilterSidebarProps {
  onClose?: () => void
}

export const FilterSidebar = ({ onClose }: FilterSidebarProps) => (
  <div className="flex flex-col gap-6 rounded-2xl border border-border px-6 py-5">
    {/* Header */}
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold text-foreground">Filters</span>
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
          defaultValue={priceRange}
          min={filterPriceRange.min}
          max={filterPriceRange.max}
          aria-label="Price range"
        />
        <div className="flex justify-between text-sm font-medium text-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
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

export default FilterSidebar
