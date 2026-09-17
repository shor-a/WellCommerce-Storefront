import type { Cart } from "@/constants/cartConst"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCartStore } from "@/hooks/cartStores"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface CartPageItemRowProps {
  cartItem: Cart
  productId: number
}

export const CartPageItemRow = ({
  cartItem,
  productId,
}: CartPageItemRowProps) => {
  const { addToCart, removeFromCart } = useCartStore()

  return (
    <div className="flex gap-4">
      <Link
        to={`/product-detail/${productId}`}
        className={cn(
          "group flex shrink-0 flex-col gap-3",
          "cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      >
        {/* Product image */}
        <div className="size-24 overflow-hidden rounded-lg bg-secondary transition-opacity duration-150 group-hover:opacity-80 lg:size-[124px]">
          {cartItem.itemImg && (
            <img
              src={cartItem.itemImg}
              alt={cartItem.itemName}
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>
      </Link>

      {/* Info + actions*/}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Name + delete */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product-detail/${productId}`}
            className="cursor-pointer focus-visible:outline-none"
          >
            <p className="text-base leading-tight font-bold text-foreground transition-colors hover:text-foreground/70 lg:text-xl">
              {cartItem.itemName}
            </p>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove ${cartItem.itemName} from cart`}
            className="shrink-0 text-destructive hover:text-destructive"
            onClick={() => removeFromCart(1, cartItem.cartItemID, true)}
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Size + Color */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground">Size:</span> {cartItem.itemSize}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground">Color:</span> {cartItem.itemColor}
          </p>
        </div>

        {/* Price + quantity stepper */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-2xl font-bold text-foreground">
            ${cartItem.finalPrice}
          </span>
          <div className="flex items-center gap-3 rounded-full bg-secondary px-4 py-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Decrease quantity"
              className="rounded-full"
              onClick={() => removeFromCart(1, cartItem.cartItemID, false)}
            >
              <Minus strokeWidth={2.5} />
            </Button>
            <span className="min-w-[1ch] text-center text-sm font-medium">
              {cartItem.itemQty}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Increase quantity"
              className="rounded-full"
              onClick={() => addToCart(1, cartItem)}
            >
              <Plus strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPageItemRow
