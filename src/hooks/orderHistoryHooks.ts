import { useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  OrderStatus,
  OrderSortOption,
  OrderHistoryView,
  WishlistMenu,
  ORDERS_PER_PAGE,
  type OrderStatus as OrderStatusType,
  type OrderSortOption as OrderSortOptionType,
  type OrderHistoryView as OrderHistoryViewType,
  type WishlistMenu as WishlistMenuType,
  type Order,
} from "@/constants/orderHistoryConst"
import { useOrderHistoryStore } from "@/hooks/orderHistoryStores"
import { useOrderActionModal } from "@/hooks/useOrderActionModal"
import { useCartStore } from "@/hooks/cartStores"
import { useWishlistStore } from "@/hooks/wishlistStores"
import type { Cart } from "@/constants/cartConst"
import { PageRoutes } from "@/config/routes"

export const useOrderHistoryFilters = () => {
  const orderHistory = useOrderHistoryStore((state) => state.orders)
  const cancelOrder = useOrderHistoryStore((state) => state.cancelOrder)
  const addToCart = useCartStore((state) => state.addToCart)
  const wishlistItems = useWishlistStore((state) => state.items)
  const removeFromWishlist = useWishlistStore((state) => state.removeItem)
  const updateWishlistQty = useWishlistStore((state) => state.updateQuantity)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  // View mode — driven purely by the URL path
  const activeView: OrderHistoryViewType =
    pathname === PageRoutes.WISHLIST
      ? OrderHistoryView.WISHLIST
      : OrderHistoryView.ORDERS

  const [activeWishlistMenu, setActiveWishlistMenu] =
    useState<WishlistMenuType>(WishlistMenu.MY_WISHLIST)

  const handleViewChange = useCallback(
    (view: OrderHistoryViewType) => {
      if (view === OrderHistoryView.WISHLIST) {
        navigate(PageRoutes.WISHLIST)
      } else {
        navigate(PageRoutes.ORDER_HISTORY)
      }
    },
    [navigate]
  )

  const handleWishlistMenuChange = useCallback((item: WishlistMenuType) => {
    setActiveWishlistMenu(item)
  }, [])

  // Orders filters
  const [activeStatus, setActiveStatus] = useState<OrderStatusType>(
    OrderStatus.ALL
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<OrderSortOptionType>(
    OrderSortOption.NEWEST
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const { modalType, modalOrder, openModal, closeModal } = useOrderActionModal()

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

  const statusCounts: Partial<Record<OrderStatusType, number>> = {
    [OrderStatus.ALL]: orderHistory.length,
    [OrderStatus.ACTIVE]: orderHistory.filter(
      (o) =>
        o.status === OrderStatus.PROCESSING || o.status === OrderStatus.SHIPPED
    ).length,
    [OrderStatus.DELIVERED]: orderHistory.filter(
      (o) => o.status === OrderStatus.DELIVERED
    ).length,
    [OrderStatus.CANCELLED]: orderHistory.filter(
      (o) => o.status === OrderStatus.CANCELLED
    ).length,
    [OrderStatus.RETURNS]: orderHistory.filter(
      (o) => o.status === OrderStatus.RETURNED
    ).length,
  }

  const handleToggleOrder = useCallback((orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }, [])

  const handleStatusChange = useCallback((status: OrderStatusType) => {
    setActiveStatus(status)
    setCurrentPage(1)
  }, [])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((option: OrderSortOptionType) => {
    setSortOption(option)
    setCurrentPage(1)
  }, [])

  const handleViewInvoice = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (order) openModal("view-invoice", order)
    },
    [orderHistory, openModal]
  )

  const handleTrackOrder = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (order) openModal("track-order", order)
    },
    [orderHistory, openModal]
  )

  const handleCancelOrder = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (order) openModal("cancel-order", order)
    },
    [orderHistory, openModal]
  )

  const handleRequestReturn = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (order) openModal("request-return", order)
    },
    [orderHistory, openModal]
  )

  const handleReorderItems = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (order) openModal("reorder-items", order)
    },
    [orderHistory, openModal]
  )

  const handleConfirmCancel = useCallback(
    (orderId: string) => {
      cancelOrder(orderId)
    },
    [cancelOrder]
  )

  const handleConfirmReorder = useCallback(
    (orderId: string) => {
      const order = orderHistory.find((o) => o.orderId === orderId)
      if (!order) return
      order.items.forEach((item) => {
        const cartItem: Cart = {
          cartItemID: `${item.itemId}${item.color.substring(0, 1)}${item.size.substring(0, 1)}`,
          itemName: item.itemName,
          itemImg: item.itemImg,
          itemColor: item.color,
          itemSize: item.size,
          itemQty: item.quantity,
          finalPrice: item.price,
        }
        addToCart(item.quantity, cartItem)
      })
    },
    [orderHistory, addToCart]
  )

  // Wishlist actions
  const handleWishlistAddToCart = useCallback(
    (productId: string) => {
      const item = wishlistItems.find((i) => i.productId === productId)
      if (!item) return
      const finalPrice = Math.round(
        item.itemPrice - (item.itemPrice * item.discount) / 100
      )
      const cartItem: Cart = {
        cartItemID: `${item.productId}${item.selectedColor.substring(0, 1)}${item.selectedSize.substring(0, 1)}`,
        itemName: item.itemName,
        itemImg: item.itemImg,
        itemColor: item.selectedColor,
        itemSize: item.selectedSize,
        itemQty: item.quantity,
        finalPrice,
      }
      addToCart(item.quantity, cartItem)
    },
    [wishlistItems, addToCart]
  )

  const handleWishlistRemove = useCallback(
    (productId: string) => {
      removeFromWishlist(productId)
    },
    [removeFromWishlist]
  )

  const handleWishlistUpdateQty = useCallback(
    (productId: string, qty: number) => {
      updateWishlistQty(productId, qty)
    },
    [updateWishlistQty]
  )

  // Pagination
  const totalOrders = filteredOrders.length
  const totalPages = Math.max(1, Math.ceil(totalOrders / ORDERS_PER_PAGE))
  const pagedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  )

  return {
    // view
    activeView,
    activeWishlistMenu,
    handleViewChange,
    handleWishlistMenuChange,
    // orders
    activeStatus,
    searchQuery,
    sortOption,
    currentPage,
    expandedOrderId,
    pagedOrders,
    totalOrders,
    totalPages,
    statusCounts,
    modalType,
    modalOrder,
    closeModal,
    handleToggleOrder,
    handleStatusChange,
    handleSearchChange,
    handleSortChange,
    handleViewInvoice,
    handleRequestReturn,
    handleReorderItems,
    handleTrackOrder,
    handleCancelOrder,
    handleConfirmCancel,
    handleConfirmReorder,
    setCurrentPage,
    // wishlist
    wishlistItems,
    handleWishlistAddToCart,
    handleWishlistRemove,
    handleWishlistUpdateQty,
  }
}
