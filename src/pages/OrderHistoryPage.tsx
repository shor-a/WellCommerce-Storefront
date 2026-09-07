import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import { OrderFiltersAside } from "@/components/section/OrderFiltersAside"
import { OrderHistorySection } from "@/components/section/OrderHistorySection"
import { OrderHistoryMobileFilters } from "@/components/subsection/OrderHistoryMobileFilters"
import NavigationText from "@/components/section/NavigationText"
import { useOrderHistoryFilters } from "@/hooks/orderHistoryHooks"
import { PageRoutes } from "@/config/routes"

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
  } = useOrderHistoryFilters()

  const orderHistoryCrumbs = [
    { label: "Home", href: PageRoutes.HOME },
    { label: "Order History", href: null },
  ]

  return (
    <>
      <Navbar />

      <NavigationText crumbs={orderHistoryCrumbs} />

      <section aria-label="Order history" className="w-full bg-background">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mb-6 lg:hidden">
            <OrderHistoryMobileFilters
              activeStatus={activeStatus}
              searchQuery={searchQuery}
              onStatusChange={handleStatusChange}
              onSearchChange={handleSearchChange}
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
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
              />
            </aside>

            <OrderHistorySection
              orders={pagedOrders}
              expandedOrderId={expandedOrderId}
              currentPage={currentPage}
              totalPages={totalPages}
              totalOrders={totalOrders}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              onToggleOrder={handleToggleOrder}
              onViewInvoice={handleViewInvoice}
              onRequestReturn={handleRequestReturn}
              onReorderItems={handleReorderItems}
              onTrackOrder={handleTrackOrder}
              onCancelOrder={handleCancelOrder}
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
