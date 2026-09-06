import { create } from "zustand"

import {
  OrderStatus,
  TrackingStep,
  orderHistory,
  type Order,
  type OrderItem,
} from "@/constants/orderHistoryConst"
import type { Cart } from "@/constants/cartConst"
import { DELIVERY_FEE, DISCOUNT_RATE } from "@/constants/cartConst"
import { createJSONStorage, persist } from "zustand/middleware"

interface OrderHistoryStore {
  orders: Order[]
  placeOrder: (cart: Cart[]) => string
}

const buildOrderId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  const suffix = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("")
  return `well-${suffix}`
}

export const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set) => ({
      orders: orderHistory,

      placeOrder: (cart) => {
        const items: OrderItem[] = cart.map((cartItem) => ({
          itemId: parseInt(cartItem.cartItemID) || 0,
          itemName: cartItem.itemName,
          size: cartItem.itemSize,
          color: cartItem.itemColor,
          quantity: cartItem.itemQty,
          price: cartItem.finalPrice,
          itemImg: cartItem.itemImg ?? "",
        }))

        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        const newOrder: Order = {
          orderId: buildOrderId(),
          status: OrderStatus.PROCESSING,
          placedDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          currentStep: TrackingStep.ORDER_PLACED,
          shippingAddress: {
            name: "",
            line1: "",
            city: "",
            country: "",
            phone: "",
          },
          paymentMethod: {
            brand: "",
            last4: "",
            note: "",
          },
          items,
          discountRate: DISCOUNT_RATE,
          deliveryFee: DELIVERY_FEE,
          subtotal,
          total:
            subtotal -
            Math.round((subtotal * DISCOUNT_RATE) / 100) +
            DELIVERY_FEE,
        }

        set((state) => ({ orders: [newOrder, ...state.orders] }))
        return newOrder.orderId
      },
    }),
    {
      name: "order-history-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
