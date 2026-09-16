import { cn } from "@/lib/utils"
import { OrderFiltersAside } from "@/components/section/OrderFiltersAside"
import { OrderHistorySection } from "@/components/section/OrderHistorySection"
import { OrderHistoryMobileFilters } from "@/components/subsection/OrderHistoryMobileFilters"
import { OrderActionModals } from "@/components/subsection/OrderActionModals"
import type {
  Order,
  OrderStatus as OrderStatusType,
  OrderSortOption as OrderSortOptionType,
  OrderHistoryView as OrderHistoryViewType,
  WishlistMenu as WishlistMenuType,
  OrderModalType,
} from "@/constants/orderHistoryConst"
import type { WishlistItem } from "@/hooks/wishlistStores"

interface OrderHistoryLayoutSectionProps {
  className?: string
  // view
  activeView: OrderHistoryViewType
  activeWishlistMenu: WishlistMenuType
  onViewChange: (view: OrderHistoryViewType) => void
  onWishlistMenuChange: (item: WishlistMenuType) => void
  // orders
  orders: Order[]
  expandedOrderId: string | null
  currentPage: number
  totalPages: number
  totalOrders: number
  activeStatus: OrderStatusType
  searchQuery: string
  sortOption: OrderSortOptionType
  statusCounts: Partial<Record<OrderStatusType, number>>
  // modal
  modalType: OrderModalType
  modalOrder: Order | null
  onCloseModal: () => void
  onConfirmCancel: (orderId: string) => void
  onConfirmReorder: (orderId: string) => void
  // order handlers
  onStatusChange: (status: OrderStatusType) => void
  onSearchChange: (query: string) => void
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

export const OrderHistoryLayoutSection = ({
  className,
  activeView,
  activeWishlistMenu,
  onViewChange,
  onWishlistMenuChange,
  orders,
  expandedOrderId,
  currentPage,
  totalPages,
  totalOrders,
  activeStatus,
  searchQuery,
  sortOption,
  statusCounts,
  modalType,
  modalOrder,
  onCloseModal,
  onConfirmCancel,
  onConfirmReorder,
  onStatusChange,
  onSearchChange,
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
}: OrderHistoryLayoutSectionProps) => (
  <section
    aria-label="Order history"
    className={cn("w-full bg-background", className)}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      {/* mobile filters */}
      <div className="mb-6 lg:hidden">
        <OrderHistoryMobileFilters
          activeStatus={activeStatus}
          searchQuery={searchQuery}
          statusCounts={statusCounts}
          onStatusChange={onStatusChange}
          onSearchChange={onSearchChange}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* desktop sidebar */}
        <aside
          aria-label="Order filters"
          className="hidden lg:sticky lg:top-8 lg:block lg:shrink-0 lg:basis-1/4"
        >
          <OrderFiltersAside
            activeView={activeView}
            activeStatus={activeStatus}
            activeWishlistMenu={activeWishlistMenu}
            searchQuery={searchQuery}
            statusCounts={statusCounts}
            wishlistCount={wishlistItems.length}
            onStatusChange={onStatusChange}
            onSearchChange={onSearchChange}
            onViewChange={onViewChange}
            onWishlistMenuChange={onWishlistMenuChange}
          />
        </aside>

        {/* main content */}
        <OrderHistorySection
          activeView={activeView}
          orders={orders}
          expandedOrderId={expandedOrderId}
          currentPage={currentPage}
          totalPages={totalPages}
          totalOrders={totalOrders}
          sortOption={sortOption}
          onSortChange={onSortChange}
          onToggleOrder={onToggleOrder}
          onViewInvoice={onViewInvoice}
          onRequestReturn={onRequestReturn}
          onReorderItems={onReorderItems}
          onTrackOrder={onTrackOrder}
          onCancelOrder={onCancelOrder}
          onPageChange={onPageChange}
          wishlistItems={wishlistItems}
          onWishlistAddToCart={onWishlistAddToCart}
          onWishlistRemove={onWishlistRemove}
          onWishlistUpdateQty={onWishlistUpdateQty}
        />
      </div>
    </div>

    {/* modals */}
    <OrderActionModals
      modalType={modalType}
      modalOrder={modalOrder}
      onClose={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmReorder={onConfirmReorder}
    />
  </section>
)

export default OrderHistoryLayoutSection
