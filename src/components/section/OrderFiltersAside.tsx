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
  type OrderStatus as OrderStatusType,
} from "@/constants/orderHistoryConst"

interface OrderFiltersAsideProps {
  className?: string
  activeStatus: OrderStatusType
  searchQuery: string
  /** Per-status counts computed from the full (unfiltered) order list */
  statusCounts: Partial<Record<OrderStatusType, number>>
  onStatusChange: (status: OrderStatusType) => void
  onSearchChange: (query: string) => void
}

export const OrderFiltersAside = ({
  className,
  activeStatus,
  searchQuery,
  statusCounts,
  onStatusChange,
  onSearchChange,
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

      {/* Search */}
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

      {/* Status filter */}
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
              const isActive = status === activeStatus
              const count = statusCounts[status]
              return (
                <button
                  key={status}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onStatusChange(status)}
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
    </div>
  </aside>
)

export default OrderFiltersAside
