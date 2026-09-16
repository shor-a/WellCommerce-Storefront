import { Trash2, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { WishlistItem } from "@/hooks/wishlistStores"

interface WishlistItemCardProps {
  item: WishlistItem
  onAddToCart: (productId: string) => void
  onRemove: (productId: string) => void
  onUpdateQty: (productId: string, qty: number) => void
}

export const WishlistItemCard = ({
  item,
  onAddToCart,
  onRemove,
  onUpdateQty,
}: WishlistItemCardProps) => {
  const discountedPrice = Math.round(
    item.itemPrice - (item.itemPrice * item.discount) / 100
  )

  const handleDecrement = () => onUpdateQty(item.productId, item.quantity - 1)
  const handleIncrement = () => onUpdateQty(item.productId, item.quantity + 1)
  const handleAddToCart = () => onAddToCart(item.productId)
  const handleRemove = () => onRemove(item.productId)

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-background p-4 sm:p-5">
      {/* Product image */}
      <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:size-28">
        <img
          src={item.itemImg}
          alt={item.itemName}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Info + actions */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Top row: name + remove */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold leading-snug text-foreground sm:text-base">
            {item.itemName}
          </h3>
          <button
            type="button"
            aria-label={`Remove ${item.itemName} from wishlist`}
            onClick={handleRemove}
            className={cn(
              "shrink-0 rounded-full p-1.5 text-muted-foreground",
              "transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "cursor-pointer"
            )}
          >
            <Trash2 strokeWidth={1.75} className="size-4" />
          </button>
        </div>

        {/* Color + Size pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-3 rounded-full border border-border"
              style={{ backgroundColor: item.selectedColorHex }}
              aria-hidden="true"
            />
            {item.selectedColor}
          </span>
          <span className="text-border">·</span>
          <span>{item.selectedSize}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            ${discountedPrice}
          </span>
          {item.discount > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${item.itemPrice}
              </span>
              <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                -{item.discount}%
              </span>
            </>
          )}
        </div>

        {/* Bottom row: qty stepper + Add to Cart */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
          {/* Quantity stepper */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-secondary px-1 py-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-foreground",
                "transition-colors duration-150 hover:bg-background",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "cursor-pointer"
              )}
            >
              <Minus strokeWidth={2.5} className="size-3" />
            </button>
            <span className="min-w-[24px] text-center text-sm font-medium tabular-nums text-foreground">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={handleIncrement}
              disabled={item.quantity >= 10}
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-foreground",
                "transition-colors duration-150 hover:bg-background",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "cursor-pointer"
              )}
            >
              <Plus strokeWidth={2.5} className="size-3" />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            variant="default"
            size="sm"
            className="rounded-full text-sm"
            aria-label={`Add ${item.itemName} to cart`}
            onClick={handleAddToCart}
          >
            <ShoppingCart
              strokeWidth={1.75}
              className="size-4"
              data-icon="inline-start"
            />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WishlistItemCard
