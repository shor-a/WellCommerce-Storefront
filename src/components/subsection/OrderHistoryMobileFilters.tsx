import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import {
  orderStatusFilters,
  type OrderStatus as OrderStatusType,
} from "@/constants/orderHistoryConst"

interface OrderHistoryMobileFiltersProps {
  activeStatus: OrderStatusType
  searchQuery: string
  onStatusChange: (s: OrderStatusType) => void
  onSearchChange: (q: string) => void
}

export const OrderHistoryMobileFilters = ({
  activeStatus,
  searchQuery,
  onStatusChange,
  onSearchChange,
}: OrderHistoryMobileFiltersProps) => (
  <div className="flex flex-col gap-4 rounded-[20px] bg-card p-2.5 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]">
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

export default OrderHistoryMobileFilters
