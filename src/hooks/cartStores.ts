import { create } from "zustand"

import { type Cart } from "@/constants/cartConst"

interface CartStore {
  cart: Cart[]
  addToCart: (qty: number, cartItem: Cart) => void
  removeFromCart: (qty: number, cartItemID: string) => void
  countItems: () => number
  countSubTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  // addToCart just calls set((state)) and do nothing / returns void
  // the return statements bellow is for callback function of set((state)) / set new value for state
  addToCart: (qty, cartItem) =>
    set((state) => {
      const itemExist = state.cart.some(
        (item) => item.cartItemID === cartItem.cartItemID
      )

      if (itemExist) {
        return {
          cart: state.cart.map((item) =>
            item.cartItemID === cartItem.cartItemID
              ? { ...item, itemQty: item.itemQty + qty }
              : item
          ),
        }
      }
      return {
        cart: [...state.cart, { ...cartItem, itemQty: qty }],
      }
    }),
  removeFromCart: (qty, cartItemID) =>
    set((state) => {
      return {
        cart: state.cart.map((item) =>
          item.cartItemID === cartItemID
            ? {
                ...item,
                itemQty: item.itemQty - qty < 1 ? 1 : item.itemQty - qty,
              }
            : item
        ),
      }
    }),
  countItems: () => get().cart.reduce((sum, item) => sum + item.itemQty, 0),
  countSubTotal: () =>
    get().cart.reduce(
      (sum, cartItem) => cartItem.finalPrice * cartItem.itemQty + sum,
      0
    ),
}))
