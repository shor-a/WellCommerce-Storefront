import { allProductDetails } from "@/constants/productDetailConst"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Rating } from "@/components/atomic/Rating"
import { ColorSwatch } from "@/components/atomic/ColorSwatch"
import { SizePill } from "@/components/atomic/SizePill"
import { QuantityStepper } from "@/components/atomic/QuantityStepper"
import { ProductImageThumb } from "@/components/atomic/ProductImageThumb"
import DiscPrice from "@/components/atomic/DiscPrice"

import { useCartStore } from "@/hooks/cartStores"
import { useWishlistStore, buildWishlistItem } from "@/hooks/wishlistStores"

import { useState } from "react"
import { Heart } from "lucide-react"
import { constructCID } from "@/constants/cartConst"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { ProductSize } from "@/constants/sizeConst"

export const ProductSection = () => {
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  const { productid } = useParams()
  const productDetail =
    allProductDetails[productid ? parseInt(productid) - 1 : parseInt("0")]

  const discountedPrice = Math.round(
    productDetail.itemPrice -
      (productDetail.itemPrice * productDetail.discount) / 100
  )

  const [selectedColor, setColor] = useState<string>(
    productDetail.colors[0].colorId
  )
  const [selectedSize, setSize] = useState<ProductSize>(productDetail.sizes[0])
  const [activeImgIndex, setActiveImg] = useState(0)
  const [quantity, setQty] = useState(1)

  const wishlisted = isWishlisted(String(productDetail.itemId))

  const handleToggleWishlist = () => {
    const colorObj = productDetail.colors.find(
      (c) => c.colorId === selectedColor
    )
    toggleWishlist(
      buildWishlistItem(
        productDetail,
        selectedColor,
        colorObj?.hex ?? "#000000",
        selectedSize,
        quantity
      )
    )
  }

  const changeQty = (increment: boolean): void => {
    return void (increment
      ? setQty((qty) => (qty < 10 ? qty + 1 : qty))
      : setQty((qty) => (qty > 1 ? qty - 1 : qty)))
  }

  return (
    <section aria-label="Product detail" className="w-full bg-background">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* ── Gallery block ── */}
          <div className="flex flex-col gap-3 lg:shrink-0 lg:basis-5/12">
            <div className="flex flex-col-reverse gap-3 md:flex-row">
              {/* Thumbnail strip */}
              <div className="flex flex-row gap-3 overflow-x-auto pb-1 md:w-24 md:flex-col md:overflow-x-visible md:pb-0 lg:w-28">
                {productDetail.images.map((img, i) => (
                  <div key={i} className="w-24 shrink-0 md:w-auto">
                    <ProductImageThumb
                      index={i}
                      src={img}
                      alt={`${productDetail.itemName} view ${i + 1}`}
                      isActive={i === activeImgIndex}
                      setActiveImg={setActiveImg}
                    />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="aspect-4/5 w-full overflow-hidden rounded-2xl bg-secondary md:flex-1">
                <img
                  src={productDetail.images[activeImgIndex]}
                  alt={productDetail.itemName}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ── Product info block ── */}
          <div className="flex flex-col gap-4 lg:basis-6/12">
            {/* Title */}
            <h1 className="text-3xl leading-tight lg:text-4xl">
              {productDetail.itemName}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rating starValue={productDetail.itemRating} className="size-5" />
              <span className="text-sm text-foreground">
                {productDetail.itemRating}/
                <span className="text-muted-foreground">5</span>
              </span>
            </div>

            {/* Price row */}
            <DiscPrice
              itemPrice={productDetail.itemPrice}
              discount={productDetail.discount}
              fontSize="text-3xl"
            />

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {productDetail.description}
            </p>

            <Separator />

            {/* Color selector */}
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">
                Select Colors
              </span>
              <div className="flex gap-3">
                {productDetail.colors.map((color) => (
                  <ColorSwatch
                    colorId={color.colorId}
                    key={color.colorId}
                    hex={color.hex}
                    label={color.label}
                    isActive={selectedColor === color.colorId}
                    setColor={setColor}
                    size="lg"
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Size selector */}
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">Choose Size</span>
              <div className="flex flex-wrap gap-3">
                {productDetail.sizes.map((size) => (
                  <SizePill
                    key={size}
                    label={size}
                    isActive={selectedSize === size}
                    setSize={() => setSize(size)}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA row — quantity stepper + Add to Cart + Wishlist */}
            <div className="flex gap-3">
              <QuantityStepper quantity={quantity} changeQty={changeQty} />
              <Button
                variant="default"
                size="xl"
                className="flex-1 rounded-full text-base"
                aria-label="Add to cart"
                onClick={() => {
                  addToCart(quantity, {
                    itemName: productDetail.itemName,
                    cartItemID: constructCID(
                      productDetail.itemId,
                      selectedColor,
                      selectedSize
                    ),
                    itemQty: quantity,
                    itemImg: productDetail.itemImg,
                    itemColor: selectedColor,
                    itemSize: selectedSize,
                    finalPrice: discountedPrice,
                  })
                }}
              >
                Add to Cart
              </Button>

              {/* Wishlist toggle */}
              <Button
                variant="outline"
                size="xl"
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={wishlisted}
                onClick={handleToggleWishlist}
                className={cn(
                  "shrink-0 rounded-full transition-colors duration-200",
                  wishlisted
                    ? "border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10"
                    : "hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
                )}
              >
                <Heart
                  strokeWidth={1.75}
                  className={cn(
                    "size-5 transition-all duration-200",
                    wishlisted ? "fill-destructive stroke-destructive" : ""
                  )}
                />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
