import { DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "@/components/atomic/OrderStatusBadge"
import { OrderTrackingBar } from "@/components/atomic/OrderTrackingBar"
import { OrderItemRow } from "@/components/atomic/OrderItemRow"
import { OrderStatus, type Order } from "@/constants/orderHistoryConst"

interface OrderHistoryExpandedProps {
  order: Order
  onToggle: () => void
  onViewInvoice: () => void
  onRequestReturn: () => void
  onReorderItems: () => void
  onTrackOrder: () => void
  onCancelOrder: () => void
}

export const OrderHistoryExpanded = ({
  order,
  onToggle,
  onViewInvoice,
  onRequestReturn,
  onReorderItems,
  onTrackOrder,
  onCancelOrder,
}: OrderHistoryExpandedProps) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-[20px] border border-border bg-card",
      "shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]"
    )}
  >
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

    <div className="border-b border-border px-8 py-8">
      <OrderTrackingBar currentStep={order.currentStep} />
    </div>

    <div className="border-b border-border px-6 py-6">
      <p className="mb-4 text-base font-bold text-foreground">Items</p>
      <div className="flex flex-col gap-4">
        {order.items.map((item) => (
          <OrderItemRow key={item.itemId} item={item} />
        ))}
      </div>
    </div>

    <div className="border-b border-border px-6 py-6">
      <p className="mb-4 text-base font-bold text-foreground">Order Summary</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            ${order.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Discount (-{order.discountRate}%)</span>
          <span className="font-medium text-destructive">
            -${((order.subtotal * order.discountRate) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Delivery Fee</span>
          <span className="font-medium text-foreground">
            ${order.deliveryFee.toFixed(2)}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-base font-bold text-foreground">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-6 border-b border-border bg-secondary/30 px-6 py-6 lg:flex-row">
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

      <div className="flex flex-col gap-3 lg:basis-1/2 lg:pl-16">
        <p className="text-base font-bold text-foreground">Payment Method</p>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded border border-border bg-card px-1">
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

    <div className="flex flex-wrap items-center justify-end gap-4 px-6 py-6">
      {order.status === OrderStatus.PROCESSING && (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={onCancelOrder}
        >
          Cancel Order
        </Button>
      )}
      {order.status === OrderStatus.DELIVERED && (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={onRequestReturn}
        >
          Request Return
        </Button>
      )}
      {(order.status === OrderStatus.DELIVERED ||
        order.status === OrderStatus.CANCELLED) && (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={onReorderItems}
        >
          Reorder Items
        </Button>
      )}
      {order.status === OrderStatus.SHIPPED && (
        <Button
          variant="default"
          size="lg"
          className="rounded-full"
          onClick={onTrackOrder}
        >
          Track Order
        </Button>
      )}
    </div>
  </div>
)

export default OrderHistoryExpanded
