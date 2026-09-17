import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  OrderStatus,
  OrderHistoryView,
  ORDERS_PER_PAGE,
  orderSortOptions,
  type Order,
  type OrderSortOption as OrderSortOptionType,
  type OrderHistoryView as OrderHistoryViewType,
} from "@/constants/orderHistoryConst"
import type { WishlistItem } from "@/hooks/wishlistStores"
import ProductPagination from "../atomic/ProductPagination"
import { SortPopover } from "@/components/atomic/SortPopover"
import { OrderHistoryCollapsed } from "@/components/subsection/OrderHistoryCollapsed"
import { OrderHistoryExpanded } from "@/components/subsection/OrderHistoryExpanded"
import { WishlistItemCard } from "@/components/subsection/WishlistItemCard"

interface OrderHistorySectionProps {
  className?: string
  // view
  activeView: OrderHistoryViewType
  // orders
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
  // wishlist
  wishlistItems: WishlistItem[]
  onWishlistAddToCart: (productId: string) => void
  onWishlistRemove: (productId: string) => void
  onWishlistUpdateQty: (productId: string, qty: number) => void
}

export const OrderHistorySection = ({
  activeView,
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
  wishlistItems,
  onWishlistAddToCart,
  onWishlistRemove,
  onWishlistUpdateQty,
}: OrderHistorySectionProps) => {
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

  // Wishlist view
  if (activeView === OrderHistoryView.WISHLIST) {
    return (
      <section className={cn("w-full bg-background lg:basis-3/4")}>
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            My Wishlist
          </h1>
          {wishlistItems.length > 0 && (
            <span className="ml-1 rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
              {wishlistItems.length}
            </span>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Heart
              strokeWidth={1.25}
              className="size-14 text-muted-foreground/40"
            />
            <p className="text-lg font-semibold text-foreground">
              Your wishlist is empty
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Browse products and tap the heart icon to save items here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlistItems.map((item) => (
              <WishlistItemCard
                key={item.productId}
                item={item}
                onAddToCart={onWishlistAddToCart}
                onRemove={onWishlistRemove}
                onUpdateQty={onWishlistUpdateQty}
              />
            ))}
          </div>
        )}
      </section>
    )
  }

  // Orders view (default)
  return (
    <section className={cn("w-full bg-background lg:basis-3/4")}>
      {/* top bar: title + count + sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground md:text-3xl">
          Order History
        </h1>

        <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
          {totalOrders === 0 ? (
            <span className="whitespace-nowrap">No orders found</span>
          ) : (
            <span className="whitespace-nowrap">
              Showing {rangeStart}–{rangeEnd} of {totalOrders} Orders
            </span>
          )}
          <SortPopover
            value={sortOption}
            options={orderSortOptions}
            onChange={onSortChange}
          />
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
