import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/atomic/OrderStatusBadge"
import {
  OrderStatus,
  type Order,
  type OrderStatus as OrderStatusType,
} from "@/constants/orderHistoryConst"

interface OrderHistoryCollapsedProps {
  order: Order
  onToggle: () => void
  onAction: () => void
}

const actionLabel: Partial<Record<OrderStatusType, string>> = {
  [OrderStatus.SHIPPED]: "Track",
  [OrderStatus.PROCESSING]: "Cancel",
  [OrderStatus.CANCELLED]: "Reorder",
  [OrderStatus.RETURNED]: "Details",
}

export const OrderHistoryCollapsed = ({
  order,
  onToggle,
  onAction,
}: OrderHistoryCollapsedProps) => {
  const label = actionLabel[order.status]
  const isCancelled = order.status === OrderStatus.CANCELLED

  return (
    <button
      onClick={onToggle}
      aria-expanded={false}
      className={cn(
        "w-full cursor-pointer rounded-[20px] border border-border bg-card p-6 text-left",
        "shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isCancelled && "opacity-75"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0">
          {order.items.length > 1 && (
            <div className="absolute -top-2 left-2 size-16 rounded border border-border bg-secondary" />
          )}
          <div className="relative size-16 overflow-hidden rounded border border-border bg-secondary">
            <img
              src={order.items[0]?.itemImg}
              alt={order.items[0]?.itemName ?? ""}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "text-lg font-bold text-foreground lg:text-xl",
                isCancelled && "line-through"
              )}
            >
              Order #{order.orderId}
            </span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {order.placedDate} •{" "}
            <span className="font-bold">
              {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
            </span>{" "}
            • Total:{" "}
            <span className="font-bold">${order.total.toFixed(2)}</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {label && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                onAction()
              }}
            >
              {label}
            </Button>
          )}
          <ChevronRightIcon
            className="size-3 text-muted-foreground"
            strokeWidth={2}
          />
        </div>
      </div>
    </button>
  )
}

export default OrderHistoryCollapsed
