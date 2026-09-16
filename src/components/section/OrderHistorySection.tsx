import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  OrderStatus,
  ORDERS_PER_PAGE,
  orderSortOptions,
  type Order,
  type OrderSortOption as OrderSortOptionType,
} from "@/constants/orderHistoryConst"
import ProductPagination from "../atomic/ProductPagination"
import { OrderHistoryCollapsed } from "@/components/subsection/OrderHistoryCollapsed"
import { OrderHistoryExpanded } from "@/components/subsection/OrderHistoryExpanded"

interface OrderHistorySectionProps {
  className?: string
  orders: Order[]
  expandedOrderId: string | null
  currentPage: number
  totalPages: number
  totalOrders: number
  sortOption: OrderSortOptionType
  onSortChange: (option: OrderSortOptionType) => void
  onToggleOrder: (orderId: string) => void
  onViewInvoice: (orderId: string) => void
  onRequestReturn: (orderId: string) => void
  onReorderItems: (orderId: string) => void
  onTrackOrder: (orderId: string) => void
  onCancelOrder: (orderId: string) => void
  onPageChange: (page: number) => void
}

export const OrderHistorySection = ({
  orders,
  expandedOrderId,
  currentPage,
  totalPages,
  totalOrders,
  sortOption,
  onSortChange,
  onToggleOrder,
  onViewInvoice,
  onRequestReturn,
  onReorderItems,
  onTrackOrder,
  onCancelOrder,
  onPageChange,
}: OrderHistorySectionProps) => {
  const [sortOpen, setSortOpen] = useState(false)

  const handleActionForCollapsed = (order: Order) => {
    if (order.status === OrderStatus.SHIPPED)
      return () => onTrackOrder(order.orderId)
    if (order.status === OrderStatus.PROCESSING)
      return () => onCancelOrder(order.orderId)
    if (order.status === OrderStatus.CANCELLED)
      return () => onReorderItems(order.orderId)
    return () => onToggleOrder(order.orderId)
  }

  const rangeStart =
    totalOrders === 0 ? 0 : (currentPage - 1) * ORDERS_PER_PAGE + 1
  const rangeEnd = Math.min(currentPage * ORDERS_PER_PAGE, totalOrders)

  return (
    <section className={cn("w-full bg-background lg:basis-3/4")}>
      {/* ── top bar: title + count + sort ── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Order History
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {totalOrders === 0 ? (
            <span>No orders found</span>
          ) : (
            <span>
              Showing {rangeStart}–{rangeEnd} of {totalOrders} Orders
            </span>
          )}
          <span className="flex items-center">
            Sort by:
            <Popover open={sortOpen} onOpenChange={setSortOpen}>
              <PopoverTrigger
                className="inline-flex h-auto items-center gap-1 rounded px-2 py-1 text-sm font-medium text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={`Sort by: ${sortOption}`}
              >
                {sortOption}
                <ChevronDown className="size-4" strokeWidth={1.5} />
              </PopoverTrigger>
              <PopoverContent align="end" side="bottom" className="w-48 p-1">
                {orderSortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={cn(
                      "w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none",
                      option === sortOption
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => {
                      onSortChange(option)
                      setSortOpen(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No orders found.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) =>
            expandedOrderId === order.orderId ? (
              <OrderHistoryExpanded
                key={order.orderId}
                order={order}
                onToggle={() => onToggleOrder(order.orderId)}
                onViewInvoice={() => onViewInvoice(order.orderId)}
                onRequestReturn={() => onRequestReturn(order.orderId)}
                onReorderItems={() => onReorderItems(order.orderId)}
                onTrackOrder={() => onTrackOrder(order.orderId)}
                onCancelOrder={() => onCancelOrder(order.orderId)}
              />
            ) : (
              <OrderHistoryCollapsed
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
