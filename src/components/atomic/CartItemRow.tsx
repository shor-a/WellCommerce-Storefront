import type { Cart } from "@/constants/cartConst"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemRowProps {
  cartItem: Cart
}

export const CartItemRow = ({ cartItem }: CartItemRowProps) => (
  <div className="flex gap-4">
    {/* Product image */}
    <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-secondary lg:size-[124px]">
      {cartItem.itemImg && (
        <img
          src={cartItem.itemImg}
          alt={cartItem.itemName}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>

    {/* Info + actions */}
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      {/* Top row: name + delete */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-base leading-tight font-bold text-foreground lg:text-xl">
          {cartItem.itemName}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Remove ${cartItem.itemName} from cart`}
          className="shrink-0 text-destructive hover:text-destructive"
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

      {/* Bottom row: price + quantity stepper */}
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
          >
            <Plus strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default CartItemRow
