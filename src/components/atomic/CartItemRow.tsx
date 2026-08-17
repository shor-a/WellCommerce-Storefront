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

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {cartItem.itemName}
          </p>
        </div>
        <div className="flex flex-row">
          <div className="basis-2/6">
            <p className="text-xs font-medium text-muted-foreground">
              Qty: {cartItem.itemQty}
            </p>
          </div>
          <div className="basis-2/6">
            <p className="text-xs font-medium text-muted-foreground">
              {cartItem.itemColor}
            </p>
          </div>
          <div className="basis-2/6">
            <p className="text-xs font-medium text-muted-foreground">
              {cartItem.itemSize}
            </p>
          </div>
        </div>
      </div>

      <p className="shrink-0 text-sm font-bold text-foreground">
        ${cartItem.itemQty * discountedPrice}
      </p>
    </div>
  )
}

export default CartItemRow
