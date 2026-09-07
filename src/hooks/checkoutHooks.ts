import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  PaymentMethod,
  defaultCardFormValues,
  defaultShippingAddress,
  type CardFormValues,
} from "@/constants/checkoutConst"
import {
  type ShippingAddress,
  type PaymentMethod as PaymentMethodInfo,
} from "@/constants/orderHistoryConst"
import { useCartStore } from "@/hooks/cartStores"
import { useOrderHistoryStore } from "@/hooks/orderHistoryStore"
import { PageRoutes } from "@/config/routes"

export const useCheckout = () => {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const placeOrder = useOrderHistoryStore((state) => state.placeOrder)
  const navigate = useNavigate()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    PaymentMethod.CREDIT_CARD
  )
  const [cardValues, setCardValues] =
    useState<CardFormValues>(defaultCardFormValues)
  const [shippingValues, setShippingValues] =
    useState<ShippingAddress>(defaultShippingAddress)
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

    const paymentByMethod: Record<PaymentMethod, PaymentMethodInfo> = {
      [PaymentMethod.CREDIT_CARD]: {
        brand: "Credit Card",
        last4: cardValues.cardNumber.replace(/\s/g, "").slice(-4),
        note: "Billing address same as shipping",
      },
      [PaymentMethod.PAYPAL]: {
        brand: "PayPal",
        last4: "",
        note: "Paid via PayPal",
      },
      [PaymentMethod.GPAY]: {
        brand: "Google Pay",
        last4: "",
        note: "Paid via Google Pay",
      },
    }

    placeOrder(cart, shippingValues, paymentByMethod[selectedMethod])
    clearCart()
    navigate(PageRoutes.HOME)
  }

  return {
    cart,
    selectedMethod,
    cardValues,
    shippingValues,
    isEditingShipping,
    submitAttempted,
    handleCardChange,
    handleShippingChange,
    handlePayNow,
    onSelectMethod: (method: PaymentMethod) => {
      setSelectedMethod(method)
      setSubmitAttempted(false)
    },
    onEditShipping: () => setIsEditingShipping(true),
    onSaveShipping: () => setIsEditingShipping(false),
  }
}
