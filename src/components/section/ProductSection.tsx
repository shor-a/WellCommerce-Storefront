import { oneLifeTshirt } from "@/constants/productDetailConst"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Rating } from "@/components/atomic/Rating"
import { ColorSwatch } from "@/components/atomic/ColorSwatch"
import { SizePill } from "@/components/atomic/SizePill"
import { QuantityStepper } from "@/components/atomic/QuantityStepper"
import { ProductImageThumb } from "@/components/atomic/ProductImageThumb"

export const ProductSection = () => {
  const product = oneLifeTshirt
  const discountedPrice = Math.round(
    product.itemPrice - (product.itemPrice * product.discount) / 100
  )
  const selectedColor = "olive"
  const selectedSize = "Large"
  const activeImageIndex = 0
  const quantity = 1

  return (
    <section aria-label="Product detail" className="w-full bg-background">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        {/* Three-tier layout: mobile stacks, desktop side-by-side */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* ── Gallery block ── */}
          <div className="flex flex-col gap-3 lg:shrink-0 lg:basis-6/12">
            {/* Mobile: main image on top */}
            <div className="aspect-4/5 w-full overflow-hidden rounded-2xl bg-secondary md:hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.itemName}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Mobile: horizontal thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto pb-1 md:hidden">
              {product.images.map((img, i) => (
                <div key={i} className="w-24 shrink-0">
                  <ProductImageThumb
                    src={img}
                    alt={`${product.itemName} view ${i + 1}`}
                    isActive={i === activeImageIndex}
                  />
                </div>
              ))}
            </div>

            {/* Tablet+: vertical thumbs + main image side by side */}
            <div className="hidden md:flex md:gap-3">
              {/* Vertical thumbnail column */}
              <div className="flex flex-col gap-3 md:w-24 lg:w-28">
                {product.images.map((img, i) => (
                  <ProductImageThumb
                    key={i}
                    src={img}
                    alt={`${product.itemName} view ${i + 1}`}
                    isActive={i === activeImageIndex}
                  />
                ))}
              </div>

              {/* Main image */}
              <div className="aspect-4/5 flex-1 overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.itemName}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ── Product info block ── */}
          <div className="flex flex-col gap-4 lg:basis-6/12">
            {/* Title */}
            <h1 className="text-3xl leading-tight lg:text-4xl">
              {product.itemName}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rating starValue={product.itemRating} className="size-5" />
              <span className="text-sm text-foreground">
                {product.itemRating}/
                <span className="text-muted-foreground">5</span>
              </span>
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3">
              <span className="font-heading text-3xl font-bold">
                ${discountedPrice}
              </span>
              <span className="font-heading text-3xl font-bold text-foreground/40 line-through">
                ${product.itemPrice}
              </span>
              <Badge
                variant="destructive"
                className="h-auto rounded-full px-3 py-1 text-sm"
              >
                -{product.discount}%
              </Badge>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <Separator />

            {/* Color selector */}
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">
                Select Colors
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <ColorSwatch
                    key={color.colorId}
                    hex={color.hex}
                    label={color.label}
                    isActive={selectedColor === color.colorId}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Size selector */}
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">Choose Size</span>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <SizePill
                    key={size}
                    label={size}
                    isActive={selectedSize === size}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA row — quantity stepper + Add to Cart */}
            <div className="flex gap-3">
              <QuantityStepper quantity={quantity} />
              <Button
                variant="default"
                size="xl"
                className="flex-1 rounded-full text-base"
                aria-label="Add to cart"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
