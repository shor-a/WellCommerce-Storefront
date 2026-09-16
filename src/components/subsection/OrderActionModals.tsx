import {
  AlertTriangleIcon,
  CheckCircleIcon,
  DownloadIcon,
  MapPinIcon,
  PackageIcon,
  RefreshCwIcon,
  TruckIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { OrderTrackingBar } from "@/components/atomic/OrderTrackingBar"
import { OrderStatusBadge } from "@/components/atomic/OrderStatusBadge"
import type { OrderModalType, Order } from "@/constants/orderHistoryConst"
import { getPaymentLabel } from "@/constants/orderHistoryConst"

const InvoiceModal = ({
  order,
  onClose,
}: {
  order: Order
  onClose: () => void
}) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <DownloadIcon className="size-5 text-foreground" strokeWidth={1.5} />
        <DialogTitle className="text-lg font-bold">Invoice</DialogTitle>
      </div>
      <DialogDescription>
        Order #{order.orderId} &mdash; {order.placedDate}
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">SHOP.CO</span>
        <OrderStatusBadge status={order.status} />
      </div>
      <Separator />
      {order.items.map((item) => (
        <div
          key={item.itemId}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-muted-foreground">
            {item.itemName}{" "}
            <span className="text-xs">
              ({item.size} / {item.color} &times; {item.quantity})
            </span>
          </span>
          <span className="font-medium text-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
      <Separator />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Subtotal</span>
        <span>${order.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Discount (-{order.discountRate}%)</span>
        <span className="text-destructive">
          -${((order.subtotal * order.discountRate) / 100).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Delivery Fee</span>
        <span>${order.deliveryFee.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-base font-bold text-foreground">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 pt-1 text-xs text-muted-foreground">
        <p className="text-sm font-medium text-foreground">
          {order.shippingAddress.name}
        </p>
        <p>{order.shippingAddress.line1}</p>
        <p>{order.shippingAddress.city}</p>
        <p>{order.shippingAddress.country}</p>
      </div>
      <div className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Payment: </span>
        {getPaymentLabel(order.paymentMethod.brand, order.paymentMethod.last4)}
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" className="rounded-full" onClick={onClose}>
        Close
      </Button>
      <Button className="gap-2 rounded-full" onClick={onClose}>
        <DownloadIcon className="size-4" strokeWidth={2} />
        Download PDF
      </Button>
    </DialogFooter>
  </>
)

const TrackOrderModal = ({ order }: { order: Order; onClose: () => void }) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <TruckIcon className="size-5 text-foreground" strokeWidth={1.5} />
        <DialogTitle className="text-lg font-bold">Track Order</DialogTitle>
      </div>
      <DialogDescription>
        Order #{order.orderId} &mdash; {order.placedDate}
      </DialogDescription>
    </DialogHeader>

    <div className="rounded-xl border border-border bg-secondary/40 px-4 py-6">
      <OrderTrackingBar currentStep={order.currentStep} />
    </div>

    <div className="flex flex-col gap-1 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPinIcon className="size-4 shrink-0" strokeWidth={1.5} />
        <span className="font-medium text-foreground">Delivering to</span>
      </div>
      <p className="pl-6 leading-5 text-muted-foreground">
        {order.shippingAddress.line1}
        <br />
        {order.shippingAddress.city}, {order.shippingAddress.country}
      </p>
    </div>

    <DialogFooter showCloseButton />
  </>
)

const CancelOrderModal = ({
  order,
  onClose,
  onConfirm,
}: {
  order: Order
  onClose: () => void
  onConfirm: () => void
}) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <AlertTriangleIcon
          className="size-5 text-destructive"
          strokeWidth={1.5}
        />
        <DialogTitle className="text-lg font-bold">Cancel Order?</DialogTitle>
      </div>
      <DialogDescription>
        This will cancel order{" "}
        <span className="font-medium text-foreground">#{order.orderId}</span>.
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
      <p className="mb-2 font-medium text-foreground">Order Summary</p>
      <div className="flex flex-col gap-1.5">
        {order.items.map((item) => (
          <p key={item.itemId}>
            {item.quantity}&times; {item.itemName} ({item.size} / {item.color})
          </p>
        ))}
      </div>
      <Separator className="my-3" />
      <div className="flex justify-between font-bold text-foreground">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" className="rounded-full" onClick={onClose}>
        Keep Order
      </Button>
      <Button
        variant="destructive"
        className="rounded-full"
        onClick={() => {
          onConfirm()
          onClose()
        }}
      >
        Yes, Cancel Order
      </Button>
    </DialogFooter>
  </>
)

const RequestReturnModal = ({
  order,
  onClose,
  onConfirm,
}: {
  order: Order
  onClose: () => void
  onConfirm: () => void
}) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <RefreshCwIcon className="size-5 text-foreground" strokeWidth={1.5} />
        <DialogTitle className="text-lg font-bold">Request Return</DialogTitle>
      </div>
      <DialogDescription>
        Request a return for order{" "}
        <span className="font-medium text-foreground">#{order.orderId}</span>.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
      <p className="font-medium text-foreground">Items to return</p>
      {order.items.map((item) => (
        <div key={item.itemId} className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {item.itemName} ({item.size} / {item.color})
          </span>
          <span className="font-medium text-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
      <Separator />
      <p className="text-xs text-muted-foreground">
        Returns are processed within 3&ndash;5 business days. Refund will be
        issued to your original payment method.
      </p>
    </div>

    <DialogFooter>
      <Button variant="outline" className="rounded-full" onClick={onClose}>
        Cancel
      </Button>
      <Button
        className="rounded-full"
        onClick={() => {
          onConfirm()
          onClose()
        }}
      >
        Confirm Return
      </Button>
    </DialogFooter>
  </>
)

const ReorderItemsModal = ({
  order,
  onClose,
  onConfirm,
}: {
  order: Order
  onClose: () => void
  onConfirm: () => void
}) => (
  <>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <PackageIcon className="size-5 text-foreground" strokeWidth={1.5} />
        <DialogTitle className="text-lg font-bold">Reorder Items</DialogTitle>
      </div>
      <DialogDescription>
        Add all items from order{" "}
        <span className="font-medium text-foreground">#{order.orderId}</span>{" "}
        back to your cart.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
      {order.items.map((item) => (
        <div key={item.itemId} className="flex items-center gap-3">
          <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
            <img
              src={item.itemImg}
              alt={item.itemName}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="leading-tight font-medium text-foreground">
              {item.itemName}
            </span>
            <span className="text-xs text-muted-foreground">
              {item.size} / {item.color} &times; {item.quantity}
            </span>
          </div>
          <span className="ml-auto font-bold text-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
    </div>

    <DialogFooter>
      <Button variant="outline" className="rounded-full" onClick={onClose}>
        Cancel
      </Button>
      <Button
        className="gap-2 rounded-full"
        onClick={() => {
          onConfirm()
          onClose()
        }}
      >
        <CheckCircleIcon className="size-4" strokeWidth={2} />
        Add to Cart
      </Button>
    </DialogFooter>
  </>
)

interface OrderActionModalsProps {
  modalType: OrderModalType
  modalOrder: Order | null
  onClose: () => void
  onConfirmCancel?: (orderId: string) => void
  onConfirmReturn?: (orderId: string) => void
  onConfirmReorder?: (orderId: string) => void
}

export const OrderActionModals = ({
  modalType,
  modalOrder,
  onClose,
  onConfirmCancel,
  onConfirmReturn,
  onConfirmReorder,
}: OrderActionModalsProps) => {
  const isOpen = modalType !== null && modalOrder !== null

  const renderContent = () => {
    if (!modalOrder) return null
    switch (modalType) {
      case "view-invoice":
        return <InvoiceModal order={modalOrder} onClose={onClose} />
      case "track-order":
        return <TrackOrderModal order={modalOrder} onClose={onClose} />
      case "cancel-order":
        return (
          <CancelOrderModal
            order={modalOrder}
            onClose={onClose}
            onConfirm={() => onConfirmCancel?.(modalOrder.orderId)}
          />
        )
      case "request-return":
        return (
          <RequestReturnModal
            order={modalOrder}
            onClose={onClose}
            onConfirm={() => onConfirmReturn?.(modalOrder.orderId)}
          />
        )
      case "reorder-items":
        return (
          <ReorderItemsModal
            order={modalOrder}
            onClose={onClose}
            onConfirm={() => onConfirmReorder?.(modalOrder.orderId)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        className={cn(
          "sm:max-w-md",
          modalType === "view-invoice" && "sm:max-w-lg"
        )}
        showCloseButton
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}

export default OrderActionModals
