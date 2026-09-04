import { ChevronRightIcon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "@/components/atomic/OrderStatusBadge"
import { OrderTrackingBar } from "@/components/atomic/OrderTrackingBar"
import { OrderItemRow } from "@/components/atomic/OrderItemRow"
import { ProductPagination } from "@/components/atomic/ProductPagination"
import {
  OrderStatus,
  TOTAL_ORDER_PAGES,
  type Order,
  type OrderStatus as OrderStatusType,
} from "@/constants/orderHistoryConst"

// ─── Props

interface OrderHistorySectionProps {
  className?: string
  orders: Order[]
  expandedOrderId: string | null
  currentPage: number
  totalPages?: number
  onToggleOrder: (orderId: string) => void
  onViewInvoice: (orderId: string) => void
  onRequestReturn: (orderId: string) => void
  onReorderItems: (orderId: string) => void
  onTrackOrder: (orderId: string) => void
  onPageChange: (page: number) => void
}

// ─── Collapsed card

interface CollapsedCardProps {
  order: Order
  onToggle: () => void
  onAction: () => void
}

const actionLabel: Partial<Record<OrderStatusType, string>> = {
  [OrderStatus.SHIPPED]: "Track",
  [OrderStatus.PROCESSING]: undefined,
  [OrderStatus.CANCELLED]: "Reorder",
  [OrderStatus.RETURNED]: "Details",
}

const CollapsedCard = ({ order, onToggle, onAction }: CollapsedCardProps) => {
  const label = actionLabel[order.status]
  const isCancelled = order.status === OrderStatus.CANCELLED

  return (
    <button
      onClick={onToggle}
      aria-expanded={false}
      className={cn(
        "w-full rounded-[20px] border border-border bg-card p-6 text-left",
        "shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isCancelled && "opacity-75"
      )}
    >
      <div className="flex items-center gap-4">
        {/* image stack */}
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

        {/* info */}
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

        {/* action */}
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

// ─── Expanded card

interface ExpandedCardProps {
  order: Order
  onToggle: () => void
  onViewInvoice: () => void
  onRequestReturn: () => void
  onReorderItems: () => void
  onTrackOrder: () => void
}

const ExpandedCard = ({
  order,
  onToggle,
  onViewInvoice,
  onRequestReturn,
  onReorderItems,
  onTrackOrder,
}: ExpandedCardProps) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-[20px] border border-border bg-card",
      "shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]"
    )}
  >
    {/* ── header ── */}
    <button
      onClick={onToggle}
      aria-expanded={true}
      className={cn(
        "flex w-full items-start justify-between gap-4 border-b border-border bg-secondary/30 px-6 py-6 text-left",
        "transition-colors duration-150 hover:bg-secondary/50",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-bold text-foreground lg:text-xl">
            Order #{order.orderId}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          Placed on {order.placedDate} • {order.items.length} Item
          {order.items.length !== 1 ? "s" : ""} • Total:{" "}
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="shrink-0 rounded-full"
        onClick={(e) => {
          e.stopPropagation()
          onViewInvoice()
        }}
      >
        View Invoice
        <DownloadIcon data-icon="inline-end" strokeWidth={2} />
      </Button>
    </button>

    {/* ── tracking bar ── */}
    <div className="border-b border-border px-8 py-8">
      <OrderTrackingBar currentStep={order.currentStep} />
    </div>

    {/* ── items list ── */}
    <div className="border-b border-border px-6 py-6">
      <p className="mb-4 text-base font-bold text-foreground">Items</p>
      <div className="flex flex-col gap-4">
        {order.items.map((item) => (
          <OrderItemRow key={item.itemId} item={item} />
        ))}
      </div>
    </div>

    {/* ── shipping & payment ── */}
    <div className="flex flex-col gap-6 border-b border-border bg-secondary/30 px-6 py-6 lg:flex-row">
      {/* shipping address */}
      <div className="flex flex-col gap-3 lg:basis-1/2">
        <p className="text-base font-bold text-foreground">Shipping Address</p>
        <p className="text-sm leading-5 text-muted-foreground">
          {order.shippingAddress.name}
          <br />
          {order.shippingAddress.line1}
          <br />
          {order.shippingAddress.city}
          <br />
          {order.shippingAddress.country}
          <br />
          {order.shippingAddress.phone}
        </p>
      </div>

      {/* payment method */}
      <div className="flex flex-col gap-3 lg:basis-1/2 lg:pl-16">
        <p className="text-base font-bold text-foreground">Payment Method</p>
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded border border-border bg-card px-1">
            <span className="text-xs font-bold text-foreground">
              {order.paymentMethod.brand}
            </span>
          </div>
          <p className="text-sm leading-5 text-muted-foreground">
            {order.paymentMethod.brand} ending in {order.paymentMethod.last4}
            <br />
            {order.paymentMethod.note}
          </p>
        </div>
      </div>
    </div>

    {/* ── actions ── */}
    <div className="flex flex-wrap items-center justify-end gap-4 px-6 py-6">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={onRequestReturn}
      >
        Request Return
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={onReorderItems}
      >
        Reorder Items
      </Button>
      <Button
        variant="default"
        size="lg"
        className="rounded-full"
        onClick={onTrackOrder}
      >
        Track Order
      </Button>
    </div>
  </div>
)

// ─── Section

export const OrderHistorySection = ({
  className,
  orders,
  expandedOrderId,
  currentPage,
  totalPages = TOTAL_ORDER_PAGES,
  onToggleOrder,
  onViewInvoice,
  onRequestReturn,
  onReorderItems,
  onTrackOrder,
  onPageChange,
}: OrderHistorySectionProps) => {
  const handleActionForCollapsed = (order: Order) => {
    if (order.status === OrderStatus.SHIPPED)
      return () => onTrackOrder(order.orderId)
    if (order.status === OrderStatus.CANCELLED)
      return () => onReorderItems(order.orderId)
    return () => onToggleOrder(order.orderId)
  }

  return (
    <section className={cn("w-full bg-background", className)}>
      {orders.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No orders found.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) =>
            expandedOrderId === order.orderId ? (
              <ExpandedCard
                key={order.orderId}
                order={order}
                onToggle={() => onToggleOrder(order.orderId)}
                onViewInvoice={() => onViewInvoice(order.orderId)}
                onRequestReturn={() => onRequestReturn(order.orderId)}
                onReorderItems={() => onReorderItems(order.orderId)}
                onTrackOrder={() => onTrackOrder(order.orderId)}
              />
            ) : (
              <CollapsedCard
                key={order.orderId}
                order={order}
                onToggle={() => onToggleOrder(order.orderId)}
                onAction={handleActionForCollapsed(order)}
              />
            )
          )}
        </div>
      )}

      <Separator className="mt-8" />
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  )
}

export default OrderHistorySection
