import { ChevronLeft, SlidersHorizontal, X } from "lucide-react"

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
import type { PCategoryHook } from "@/hooks/productCategoryHooks"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

interface FilterSidebarProps {
  sliderRange: PCategoryHook["sliderRange"]
  selectedColor: PCategoryHook["selectedColor"]
  selectedSize: PCategoryHook["selectedSize"]
  selectedCategory: PCategoryHook["selectedCategory"]
  selectedDressStyle: PCategoryHook["selectedDressStyle"]
  changeColor: PCategoryHook["setMultipleColor"]
  changeSize: PCategoryHook["setMultipleSize"]
  changeCategory: PCategoryHook["setMultipleCategory"]
  changeDressStyle: PCategoryHook["setMultipleDressStyle"]
  changeSliderValue: PCategoryHook["handleSliderChange"]
  clearAllFilter: PCategoryHook["clearAllFilter"]
  onClose?: () => void
}

export const FilterSidebar = ({
  sliderRange,
  selectedColor,
  selectedSize,
  selectedCategory,
  selectedDressStyle,
  changeColor,
  changeSize,
  changeCategory,
  changeDressStyle,
  changeSliderValue,
  clearAllFilter,
  onClose,
}: FilterSidebarProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">Filters</span>
        {/* onClose conditional if screen size is SM swap icon to X for close filter pop-up */}
        {onClose ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close filters"
            onClick={onClose}
          >
            <X className="size-5 text-muted-foreground" strokeWidth={1.5} />
          </Button>
        ) : (
          <SlidersHorizontal
            className="size-5 text-muted-foreground"
            strokeWidth={1.5}
          />
        )}
      </div>

      <Separator />

      {/* Category list */}
      <Collapsible className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-foreground">Category</span>
          <ChevronLeft
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-5">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory.includes(cat)}
                className={`flex items-center justify-between text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  selectedCategory.includes(cat)
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => changeCategory(cat)}
              >
                <span>{cat}</span>
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price */}
      <Collapsible defaultOpen className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-foreground">Price</span>
          <ChevronLeft
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Colors */}
      <Collapsible defaultOpen className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-foreground">Colors</span>
          <ChevronLeft
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-4">
            {filterColors.map((color) => (
              <ColorSwatch
                key={color.colorId}
                colorId={color.colorId}
                hex={color.hex}
                label={color.label}
                isActive={selectedColor.some(
                  (findColor) => findColor === color.colorId
                )}
                size="lg"
                setColor={changeColor}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Size */}
      <Collapsible defaultOpen className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-foreground">Size</span>
          <ChevronLeft
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2">
            {filterSizes.map((size) => (
              <SizePill
                key={size}
                label={size}
                isActive={selectedSize.some((findSize) => findSize === size)}
                className="text-sm"
                setSize={changeSize}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Dress Style */}
      <Collapsible className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-foreground">Dress Style</span>
          <ChevronLeft
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex flex-col gap-5">
            {filterDressStyles.map((style) => (
              <button
                key={style}
                type="button"
                aria-pressed={selectedDressStyle.includes(style)}
                className={`flex items-center justify-between text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  selectedDressStyle.includes(style)
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => changeDressStyle(style)}
              >
                <span>{style}</span>
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Apply Filter CTA */}
      <Button
        variant="default"
        size="xl"
        className="w-full rounded-full"
        onClick={clearAllFilter}
      >
        Clear Filters
      </Button>
    </div>
  )
}

export default FilterSidebar
