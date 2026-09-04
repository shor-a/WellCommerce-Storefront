import type { OrderItem } from "@/constants/orderHistoryConst"

interface OrderItemRowProps {
  item: OrderItem
  /** compact=true uses 60px thumb (mobile expanded card), default=false uses 80px (desktop) */
  compact?: boolean
}

export const OrderItemRow = ({ item, compact = false }: OrderItemRowProps) => {
  const thumbSize = compact ? "size-[60px]" : "size-20"

  return (
    <div className="flex items-center gap-4">
      {/* thumbnail */}
      <div
        className={`${thumbSize} shrink-0 overflow-hidden rounded-lg border border-border bg-secondary`}
      >
        <img
          src={item.itemImg}
          alt={item.itemName}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-base font-normal text-foreground">
          {item.itemName}
        </p>
        <p className="text-sm text-muted-foreground">
          Size: {item.size} • Color: {item.color}
        </p>
        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
      </div>

      {/* price */}
      <p className="shrink-0 text-2xl font-bold text-foreground">
        ${item.price}
      </p>
    </div>
  )
}

export default OrderItemRow
