import { useState } from "react"
import {
  OrderStatus,
  OrderSortOption,
  ORDERS_PER_PAGE,
  type OrderStatus as OrderStatusType,
  type OrderSortOption as OrderSortOptionType,
  type Order,
} from "@/constants/orderHistoryConst"
import { useOrderHistoryStore } from "@/hooks/orderHistoryStore"

export const useOrderHistoryFilters = () => {
  const orderHistory = useOrderHistoryStore((state) => state.orders)
  const [activeStatus, setActiveStatus] = useState<OrderStatusType>(
    OrderStatus.ALL
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<OrderSortOptionType>(
    OrderSortOption.NEWEST
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const filteredOrders: Order[] = orderHistory
    .filter((order) => {
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
    .sort((a, b) => {
      switch (sortOption) {
        case OrderSortOption.OLDEST:
          return (
            new Date(a.placedDate).getTime() - new Date(b.placedDate).getTime()
          )
        case OrderSortOption.HIGHEST_TOTAL:
          return b.total - a.total
        case OrderSortOption.LOWEST_TOTAL:
          return a.total - b.total
        case OrderSortOption.NEWEST:
        default:
          return (
            new Date(b.placedDate).getTime() - new Date(a.placedDate).getTime()
          )
      }
    })

  const handleToggleOrder = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }

  const handleStatusChange = (status: OrderStatusType) => {
    setActiveStatus(status)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSortChange = (option: OrderSortOptionType) => {
    setSortOption(option)
    setCurrentPage(1)
  }

  const handleViewInvoice = (_orderId: string) => {}
  const handleRequestReturn = (_orderId: string) => {}
  const handleReorderItems = (_orderId: string) => {}
  const handleTrackOrder = (_orderId: string) => {}
  const handleCancelOrder = (_orderId: string) => {}

  const totalOrders = filteredOrders.length
  const totalPages = Math.max(1, Math.ceil(totalOrders / ORDERS_PER_PAGE))
  const pagedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  )

  return {
    activeStatus,
    searchQuery,
    sortOption,
    currentPage,
    expandedOrderId,
    pagedOrders,
    totalOrders,
    totalPages,
    handleToggleOrder,
    handleStatusChange,
    handleSearchChange,
    handleSortChange,
    handleViewInvoice,
    handleRequestReturn,
    handleReorderItems,
    handleTrackOrder,
    handleCancelOrder,
    setCurrentPage,
  }
}
