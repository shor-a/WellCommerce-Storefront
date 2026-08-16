import type { Cart } from "@/constants/cartConst"

interface CartItemRowProps {
  cartItem: Cart
}

export const CartItemRow = ({ cartItem }: CartItemRowProps) => {
  const discountedPrice = cartItem.finalPrice

  return (
    <div className="flex items-center gap-3">
      <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
        {cartItem.itemImg && (
          <img
            src={cartItem.itemImg}
            alt={cartItem.itemName}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {cartItem.itemName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Qty: {cartItem.itemQty}
        </p>
      </div>

      <p className="shrink-0 text-sm font-bold text-foreground">
        ${cartItem.itemQty * discountedPrice}
      </p>
    </div>
  )
}

export default CartItemRow
