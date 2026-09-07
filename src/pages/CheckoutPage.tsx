import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import { CheckoutSection } from "@/components/section/CheckoutSection"
import { PaymentProgressModal } from "@/components/subsection/PaymentProgressModal"
import { useCheckout } from "@/hooks/checkoutHooks"

export const CheckoutPage = () => {
  const {
    cart,
    orderTotal,
    selectedMethod,
    cardValues,
    shippingValues,
    isEditingShipping,
    submitAttempted,
    isModalOpen,
    paymentStep,
    handleCardChange,
    handleShippingChange,
    handlePayNow,
    handleCloseModal,
    onSelectMethod,
    onEditShipping,
    onSaveShipping,
  } = useCheckout()

  return (
    <>
      <Navbar />
      <CheckoutSection
        className="py-6 lg:py-8"
        cart={cart}
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
        onPayNow={handlePayNow}
      />
      <Footer />
      <PaymentProgressModal
        isOpen={isModalOpen}
        currentStep={paymentStep}
        orderTotal={orderTotal}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default CheckoutPage
