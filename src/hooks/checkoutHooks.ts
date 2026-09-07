import { useState } from "react"
import {
  PaymentMethod,
  PaymentStep,
  defaultCardFormValues,
  defaultShippingAddress,
  type CardFormValues,
} from "@/constants/checkoutConst"
import type { PaymentStep as PaymentStepType } from "@/constants/checkoutConst"
import {
  type ShippingAddress,
  type PaymentMethod as PaymentMethodInfo,
} from "@/constants/orderHistoryConst"
import { useCartStore } from "@/hooks/cartStores"
import { useOrderHistoryStore } from "@/hooks/orderHistoryStore"

import { DELIVERY_FEE, DISCOUNT_RATE } from "@/constants/checkoutConst"

export const useCheckout = () => {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const placeOrder = useOrderHistoryStore((state) => state.placeOrder)

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [paymentStep, setPaymentStep] = useState<PaymentStepType>(
    PaymentStep.VALIDATING
  )

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.itemQty,
    0
  )
  const discountAmount = Math.round((subtotal * DISCOUNT_RATE) / 100)
  const orderTotal = subtotal - discountAmount + DELIVERY_FEE

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

    setPaymentStep(PaymentStep.VALIDATING)
    setIsModalOpen(true)

    setTimeout(() => setPaymentStep(PaymentStep.PROCESSING), 800)
    setTimeout(() => setPaymentStep(PaymentStep.CONFIRMED), 1800)
    setTimeout(() => {
      placeOrder(cart, shippingValues, paymentByMethod[selectedMethod])
      clearCart()
      setPaymentStep(PaymentStep.COMPLETE)
    }, 2800)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPaymentStep(PaymentStep.VALIDATING)
  }

  return {
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
    onSelectMethod: (method: PaymentMethod) => {
      setSelectedMethod(method)
      setSubmitAttempted(false)
    },
    onEditShipping: () => setIsEditingShipping(true),
    onSaveShipping: () => setIsEditingShipping(false),
  }
}
