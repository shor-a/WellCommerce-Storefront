import { cn } from "@/lib/utils"
import { OrderFiltersAside } from "@/components/section/OrderFiltersAside"
import { OrderHistorySection } from "@/components/section/OrderHistorySection"
import { OrderHistoryMobileFilters } from "@/components/subsection/OrderHistoryMobileFilters"
import { OrderActionModals } from "@/components/subsection/OrderActionModals"
import type {
  Order,
  OrderStatus as OrderStatusType,
  OrderSortOption as OrderSortOptionType,
} from "@/constants/orderHistoryConst"
import type { OrderModalType } from "@/hooks/useOrderActionModal"

interface OrderHistoryLayoutSectionProps {
  className?: string
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
  // handlers
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
}

export const OrderHistoryLayoutSection = ({
  className,
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
            activeStatus={activeStatus}
            searchQuery={searchQuery}
            statusCounts={statusCounts}
            onStatusChange={onStatusChange}
            onSearchChange={onSearchChange}
          />
        </aside>

        {/* main content */}
        <OrderHistorySection
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
        />
      </div>
    </div>

    {/* modals — rendered at section level to avoid z-index issues */}
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
