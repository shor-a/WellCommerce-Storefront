import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import { CheckoutTabsSection } from "@/components/section/CheckoutTabsSection"
import { CheckoutOrderSummary } from "@/components/subsection/CheckoutOrderSummary"
import { DELIVERY_FEE, DISCOUNT_RATE } from "@/constants/checkoutConst"
import { useCheckout } from "@/hooks/checkoutHooks"

export const CheckoutPage = () => {
  const {
    cart,
    selectedMethod,
    cardValues,
    shippingValues,
    isEditingShipping,
    submitAttempted,
    handleCardChange,
    handleShippingChange,
    handlePayNow,
    onSelectMethod,
    onEditShipping,
    onSaveShipping,
  } = useCheckout()

  return (
    <>
      <Navbar />

      <main className="w-full bg-background">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <h1 className="mb-6 text-3xl lg:text-3xl">Checkout</h1>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="lg:basis-7/12">
              <CheckoutTabsSection
                selectedMethod={selectedMethod}
                cardValues={cardValues}
                shippingValues={shippingValues}
                isEditingShipping={isEditingShipping}
                submitAttempted={submitAttempted}
                onSelectMethod={onSelectMethod}
                onCardChange={handleCardChange}
                onShippingChange={handleShippingChange}
                onEditShipping={onEditShipping}
                onSaveShipping={onSaveShipping}
              />
            </div>

            <div className="lg:basis-5/12">
              <CheckoutOrderSummary
                items={cart}
                discountRate={DISCOUNT_RATE}
                deliveryFee={DELIVERY_FEE}
                onPayNow={handlePayNow}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default CheckoutPage
