import { DELIVERY_FEE, DISCOUNT_RATE } from "@/constants/cartConst"

export const PaymentMethod = {
  CREDIT_CARD: "Credit Card",
  PAYPAL: "PayPal",
  GPAY: "GPay",
} as const

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]

export const paymentMethods: PaymentMethod[] = [
  PaymentMethod.CREDIT_CARD,
  PaymentMethod.PAYPAL,
  PaymentMethod.GPAY,
]

export interface CardFormValues {
  cardholderName: string
  cardNumber: string
  expiryDate: string
  cvv: string
  saveCard: boolean
}

export const defaultCardFormValues: CardFormValues = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  saveCard: false,
}

export { DELIVERY_FEE, DISCOUNT_RATE }
