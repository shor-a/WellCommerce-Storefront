import {
  oneLifeTshirt,
  ProductColor,
  ProductSize,
} from "@/constants/productDetailConst"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Rating } from "@/components/atomic/Rating"
import { ColorSwatch } from "@/components/atomic/ColorSwatch"
import { SizePill } from "@/components/atomic/SizePill"
import { QuantityStepper } from "@/components/atomic/QuantityStepper"
import { ProductImageThumb } from "@/components/atomic/ProductImageThumb"
import { useState } from "react"

export const ProductSection = () => {
  const product = oneLifeTshirt
  const discountedPrice = Math.round(
    product.itemPrice - (product.itemPrice * product.discount) / 100
  )

  const [selectedColor, setColor] = useState<string>(ProductColor.OLIVE.colorId)
  const [selectedSize, setSize] = useState<ProductSize>(ProductSize.MEDIUM)
  const [activeImgIndex, setActiveImg] = useState(0)
  const [quantity, setQty] = useState(1)

  const changeQty = (increment: boolean): void => {
    return void (increment
      ? setQty((qty) => (qty < 10 ? qty + 1 : qty))
      : setQty((qty) => (qty > 1 ? qty - 1 : qty)))
  }

  return (
    <section aria-label="Product detail" className="w-full bg-background">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-10 lg:py-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* ── Gallery block ── */}
          <div className="flex flex-col gap-3 lg:shrink-0 lg:basis-5/12">
            <div className="flex flex-col-reverse gap-3 md:flex-row">
              {/* Thumbnail strip */}
              <div className="flex flex-row gap-3 overflow-x-auto pb-1 md:w-24 md:flex-col md:overflow-x-visible md:pb-0 lg:w-28">
                {product.images.map((img, i) => (
                  <div key={i} className="w-24 shrink-0 md:w-auto">
                    <ProductImageThumb
                      index={i}
                      src={img}
                      alt={`${product.itemName} view ${i + 1}`}
                      isActive={i === activeImgIndex}
                      setActiveImg={setActiveImg}
                    />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="aspect-4/5 w-full overflow-hidden rounded-2xl bg-secondary md:flex-1">
                <img
                  src={product.images[activeImgIndex]}
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
                    colorId={color.colorId}
                    key={color.colorId}
                    hex={color.hex}
                    label={color.label}
                    isActive={selectedColor === color.colorId}
                    setColor={setColor}
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
                    setSize={setSize}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA row — quantity stepper + Add to Cart */}
            <div className="flex gap-3">
              <QuantityStepper quantity={quantity} changeQty={changeQty} />
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
