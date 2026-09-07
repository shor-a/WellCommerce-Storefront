import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import NavigationText from "@/components/section/NavigationText"
import { OrderHistoryLayoutSection } from "@/components/section/OrderHistoryLayoutSection"
import { useOrderHistoryFilters } from "@/hooks/orderHistoryHooks"
import { PageRoutes } from "@/config/routes"

const orderHistoryCrumbs = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "Order History", href: null },
]

const OrderHistoryPage = () => {
  const {
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
  } = useOrderHistoryFilters()

  return (
    <>
      <Navbar />
      <NavigationText crumbs={orderHistoryCrumbs} />
      <OrderHistoryLayoutSection
        className="py-6 lg:py-8"
        orders={pagedOrders}
        expandedOrderId={expandedOrderId}
        currentPage={currentPage}
        totalPages={totalPages}
        totalOrders={totalOrders}
        activeStatus={activeStatus}
        searchQuery={searchQuery}
        sortOption={sortOption}
        statusCounts={statusCounts}
        modalType={modalType}
        modalOrder={modalOrder}
        onCloseModal={closeModal}
        onConfirmCancel={handleConfirmCancel}
        onConfirmReorder={handleConfirmReorder}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onToggleOrder={handleToggleOrder}
        onViewInvoice={handleViewInvoice}
        onRequestReturn={handleRequestReturn}
        onReorderItems={handleReorderItems}
        onTrackOrder={handleTrackOrder}
        onCancelOrder={handleCancelOrder}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </>
  )
}

export default OrderHistoryPage
