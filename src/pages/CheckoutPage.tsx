import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "@/components/section/Navbar"
import Footer from "@/components/section/Footer"
import { PaymentMethodSection } from "@/components/section/PaymentMethodSection"
import { OrderSummarySection } from "@/components/section/OrderSummarySection"
import { ShippingAddressSection } from "@/components/section/ShippingAddressSection"
import {
  PaymentMethod,
  defaultCardFormValues,
  DELIVERY_FEE,
  DISCOUNT_RATE,
  type CardFormValues,
} from "@/constants/checkoutConst"
import { type ShippingAddress } from "@/constants/orderHistoryConst"
import { useCartStore } from "@/hooks/cartStores"
import { useOrderHistoryStore } from "@/hooks/orderHistoryStore"
import { PageRoutes } from "@/config/routes"
import NavigationText from "@/components/section/NavigationText"

const defaultShippingAddress: ShippingAddress = {
  name: "John Doe",
  line1: "123 Fashion Ave, Apt 4B",
  city: "New York, NY 10001",
  country: "United States",
  phone: "+1 (555) 123-4567",
}

export const CheckoutPage = () => {
  const cart = useCartStore((state) => state.cart)
  const placeOrder = useOrderHistoryStore((state) => state.placeOrder)
  const navigate = useNavigate()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    PaymentMethod.CREDIT_CARD
  )
  const [cardValues, setCardValues] = useState<CardFormValues>(
    defaultCardFormValues
  )
  const [shippingValues, setShippingValues] = useState<ShippingAddress>(
    defaultShippingAddress
  )
  const [isEditingShipping, setIsEditingShipping] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleCardChange = (
    field: keyof CardFormValues,
    value: string | boolean
  ) => {
    setCardValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleShippingChange = (
    field: keyof ShippingAddress,
    value: string
  ) => {
    setShippingValues((prev) => ({ ...prev, [field]: value }))
  }

  const isShippingValid = (): boolean => {
    const required: (keyof ShippingAddress)[] = [
      "name",
      "line1",
      "city",
      "country",
      "phone",
    ]
    return required.every((f) => shippingValues[f].trim() !== "")
  }

  const isPaymentValid = (): boolean => {
    if (selectedMethod === PaymentMethod.CREDIT_CARD) {
      return (
        cardValues.cardholderName.trim() !== "" &&
        cardValues.cardNumber.trim() !== "" &&
        cardValues.expiryDate.trim() !== "" &&
        cardValues.cvv.trim() !== ""
      )
    }
    return true
  }

  const handlePayNow = () => {
    setSubmitAttempted(true)
    if (!isPaymentValid() || !isShippingValid()) return
    if (cart.length === 0) return
    placeOrder(cart)
    navigate(PageRoutes.HOME)
  }

  return (
    <>
      <Navbar />

      <main className="w-full bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <NavigationText />

          <span className="font-heading text-3xl font-black tracking-tight text-foreground">
            CHECKOUT
          </span>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col gap-6 lg:basis-2/3">
              <PaymentMethodSection
                selectedMethod={selectedMethod}
                cardValues={cardValues}
                submitAttempted={submitAttempted}
                onSelectMethod={(method) => {
                  setSelectedMethod(method)
                  setSubmitAttempted(false)
                }}
                onCardChange={handleCardChange}
              />

              <ShippingAddressSection
                shippingValues={shippingValues}
                isEditing={isEditingShipping}
                submitAttempted={submitAttempted}
                onEdit={() => setIsEditingShipping(true)}
                onSave={() => setIsEditingShipping(false)}
                onShippingChange={handleShippingChange}
              />
            </div>

            <div className="lg:basis-1/3">
              <OrderSummarySection
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
