import { cn } from "@/lib/utils"
import { OrderFiltersAside } from "@/components/section/OrderFiltersAside"
import { OrderHistorySection } from "@/components/section/OrderHistorySection"
import { OrderHistoryMobileFilters } from "@/components/subsection/OrderHistoryMobileFilters"
import type {
  Order,
  OrderStatus as OrderStatusType,
  OrderSortOption as OrderSortOptionType,
} from "@/constants/orderHistoryConst"

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
  <section aria-label="Order history" className={cn("w-full bg-background", className)}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <div className="mb-6 lg:hidden">
        <OrderHistoryMobileFilters
          activeStatus={activeStatus}
          searchQuery={searchQuery}
          onStatusChange={onStatusChange}
          onSearchChange={onSearchChange}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside
          aria-label="Order filters"
          className="hidden lg:sticky lg:top-8 lg:block lg:shrink-0 lg:basis-1/4"
        >
          <OrderFiltersAside
            activeStatus={activeStatus}
            searchQuery={searchQuery}
            onStatusChange={onStatusChange}
            onSearchChange={onSearchChange}
          />
        </aside>

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
  </section>
)

export default OrderHistoryLayoutSection
