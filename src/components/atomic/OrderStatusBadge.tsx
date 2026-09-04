import { cn } from "@/lib/utils"
import { OrderStatus } from "@/constants/orderHistoryConst"

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const statusConfig: Record<string, { label: string; className: string }> = {
  [OrderStatus.DELIVERED]: {
    label: "DELIVERED",
    className: "bg-[#01AB31]/10 text-[#01AB31]",
  },
  [OrderStatus.SHIPPED]: {
    label: "SHIPPED",
    className: "bg-muted text-muted-foreground",
  },
  [OrderStatus.PROCESSING]: {
    label: "PROCESSING",
    className: "bg-muted text-muted-foreground",
  },
  [OrderStatus.ACTIVE]: {
    label: "ACTIVE",
    className: "bg-muted text-muted-foreground",
  },
  [OrderStatus.CANCELLED]: {
    label: "CANCELLED",
    className: "bg-destructive/10 text-destructive",
  },
  [OrderStatus.RETURNED]: {
    label: "RETURNED",
    className: "bg-primary text-primary-foreground",
  },
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status] ?? {
    label: status.toUpperCase(),
    className: "bg-muted text-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}

export default OrderStatusBadge
