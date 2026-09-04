import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import { OrderFiltersAside } from "@/components/section/OrderFiltersAside"
import { OrderHistorySection } from "@/components/section/OrderHistorySection"
import {
  OrderStatus,
  orderStatusFilters,
  orderHistory,
  type OrderStatus as OrderStatusType,
} from "@/constants/orderHistoryConst"
import NavigationText from "@/components/section/NavigationText"

// ─── Mobile filter strip

interface MobileFiltersProps {
  activeStatus: OrderStatusType
  searchQuery: string
  onStatusChange: (s: OrderStatusType) => void
  onSearchChange: (q: string) => void
}

const MobileFilters = ({
  activeStatus,
  searchQuery,
  onStatusChange,
  onSearchChange,
}: MobileFiltersProps) => (
  <div className="flex flex-col gap-4 rounded-[20px] bg-card p-2.5 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]">
    {/* search */}
    <div className="relative">
      <SearchIcon
        className="absolute top-1/2 left-4 size-[15px] -translate-y-1/2 text-muted-foreground"
        strokeWidth={2}
      />
      <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn(
          "w-full rounded-full border border-border bg-secondary py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      />
    </div>

    {/* horizontally scrollable filter chips */}
    <div className="flex [scrollbar-width:none] gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
      {orderStatusFilters.map((status) => {
        const isActive = status === activeStatus
        return (
          <button
            key={status}
            aria-pressed={isActive}
            onClick={() => onStatusChange(status)}
            className={cn(
              "shrink-0 rounded-full px-6 py-2 text-sm font-normal transition-all duration-150",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-[0_2px_4px_-2px_rgb(0_0_0/0.1),0_4px_6px_-1px_rgb(0_0_0/0.1)]"
                : "border border-border bg-card text-muted-foreground hover:bg-muted active:scale-95"
            )}
          >
            {status}
          </button>
        )
      })}
    </div>
  </div>
)

// ─── Page

const OrderHistoryPage = () => {
  const [activeStatus, setActiveStatus] = useState<OrderStatusType>(
    OrderStatus.ALL
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orderHistory[0]?.orderId ?? null
  )

  const filteredOrders = orderHistory.filter((order) => {
    const matchesStatus =
      activeStatus === OrderStatus.ALL
        ? true
        : activeStatus === OrderStatus.ACTIVE
          ? order.status === OrderStatus.PROCESSING ||
            order.status === OrderStatus.SHIPPED
          : order.status === activeStatus

    const matchesSearch =
      searchQuery.trim() === "" ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) =>
        i.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesStatus && matchesSearch
  })

  const handleToggleOrder = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }

  const handleViewInvoice = (_orderId: string) => {}
  const handleRequestReturn = (_orderId: string) => {}
  const handleReorderItems = (_orderId: string) => {}
  const handleTrackOrder = (_orderId: string) => {}
  const handleApplyFilters = () => {}

  return (
    <>
      <Navbar />

      {/* breadcrumb — matches NavigationText styling */}
      <NavigationText />

      {/* main content — matches ProductCategorySection container */}
      <section aria-label="Order history" className="w-full bg-background">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* mobile filter strip */}
          <div className="mb-6 lg:hidden">
            <MobileFilters
              activeStatus={activeStatus}
              searchQuery={searchQuery}
              onStatusChange={setActiveStatus}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* desktop layout: sidebar + order list — mirrors ProductCategorySection */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* desktop sidebar */}
            <aside
              aria-label="Order filters"
              className="hidden lg:sticky lg:top-8 lg:block lg:shrink-0 lg:basis-1/4"
            >
              <OrderFiltersAside
                activeStatus={activeStatus}
                searchQuery={searchQuery}
                onStatusChange={setActiveStatus}
                onSearchChange={setSearchQuery}
                onApplyFilters={handleApplyFilters}
              />
            </aside>

            {/* order list */}
            <OrderHistorySection
              className="lg:basis-3/4"
              orders={filteredOrders}
              expandedOrderId={expandedOrderId}
              currentPage={currentPage}
              onToggleOrder={handleToggleOrder}
              onViewInvoice={handleViewInvoice}
              onRequestReturn={handleRequestReturn}
              onReorderItems={handleReorderItems}
              onTrackOrder={handleTrackOrder}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default OrderHistoryPage
