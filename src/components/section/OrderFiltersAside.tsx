import {
  ChevronDownIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  orderStatusFilters,
  wishlistMenuItems,
  OrderHistoryView,
  type OrderStatus as OrderStatusType,
  type WishlistMenu as WishlistMenuType,
  type OrderHistoryView as OrderHistoryViewType,
} from "@/constants/orderHistoryConst"

interface OrderFiltersAsideProps {
  className?: string
  activeView: OrderHistoryViewType
  activeStatus: OrderStatusType
  activeWishlistMenu: WishlistMenuType
  searchQuery: string
  statusCounts: Partial<Record<OrderStatusType, number>>
  wishlistCount: number
  onStatusChange: (status: OrderStatusType) => void
  onSearchChange: (query: string) => void
  onViewChange: (view: OrderHistoryViewType) => void
  onWishlistMenuChange: (item: WishlistMenuType) => void
}

export const OrderFiltersAside = ({
  className,
  activeView,
  activeStatus,
  activeWishlistMenu,
  searchQuery,
  statusCounts,
  wishlistCount,
  onStatusChange,
  onSearchChange,
  onViewChange,
  onWishlistMenuChange,
}: OrderFiltersAsideProps) => (
  <aside className={cn("w-full bg-background", className)}>
    <div className="flex flex-col gap-6 rounded-2xl border border-border px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">Filters</span>
        <SlidersHorizontalIcon
          className="size-5 text-muted-foreground"
          strokeWidth={1.5}
        />
      </div>

      <Separator />

      {/* Search — only shown in orders view */}
      {activeView === OrderHistoryView.ORDERS && (
        <div className="relative">
          <SearchIcon
            className="absolute top-1/2 left-3 size-[10.5px] -translate-y-1/2 text-muted-foreground"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full rounded-full border border-border bg-secondary py-2 pr-4 pl-8 text-sm text-foreground placeholder:text-muted-foreground",
              "transition-colors duration-150"
            )}
          />
        </div>
      )}

      {/* Status - collapsible */}
      <Collapsible defaultOpen className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between">
          <span className="text-xl font-bold text-foreground">Status</span>
          <ChevronDownIcon
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex flex-col gap-2">
            {orderStatusFilters.map((status) => {
              const isActive =
                activeView === OrderHistoryView.ORDERS &&
                status === activeStatus
              const count = statusCounts[status]
              return (
                <button
                  key={status}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    onViewChange(OrderHistoryView.ORDERS)
                    onStatusChange(status)
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition-all duration-150",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground active:scale-[0.98]"
                  )}
                >
                  <span>{status}</span>
                  {isActive && count !== undefined && count > 0 && (
                    <span className="flex min-w-[20px] items-center justify-center rounded-full bg-background px-1.5 text-xs font-normal text-foreground">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Wishlist collapsible */}
      <Collapsible defaultOpen className="group flex flex-col gap-5">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between">
          <span className="text-xl font-bold text-foreground">Wishlist</span>
          <ChevronDownIcon
            className="size-4 text-foreground transition-transform group-data-open:rotate-180"
            strokeWidth={1.5}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex flex-col gap-2">
            {wishlistMenuItems.map((item) => {
              const isActive =
                activeView === OrderHistoryView.WISHLIST &&
                item === activeWishlistMenu
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    onViewChange(OrderHistoryView.WISHLIST)
                    onWishlistMenuChange(item)
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition-all duration-150",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground active:scale-[0.98]"
                  )}
                >
                  <span>{item}</span>
                  {isActive && wishlistCount > 0 && (
                    <span className="flex min-w-[20px] items-center justify-center rounded-full bg-background px-1.5 text-xs font-normal text-foreground">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </aside>
)

export default OrderFiltersAside
