import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { ProductDetail } from "@/constants/productDetailConst"

export interface WishlistItem {
  productId: string
  itemName: string
  itemImg: string
  itemPrice: number
  discount: number
  selectedColor: string
  selectedColorHex: string
  selectedSize: string
  quantity: number
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
  countItems: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId)
          if (exists) return state
          return { items: [...state.items, item] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),

      isWishlisted: (productId) =>
        get().items.some((i) => i.productId === productId),

      toggleWishlist: (item) => {
        const exists = get().isWishlisted(item.productId)
        if (exists) {
          get().removeItem(item.productId)
        } else {
          get().addItem(item)
        }
      },

      countItems: () => get().items.length,
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

/** Build a WishlistItem from a ProductDetail with current selections */
export const buildWishlistItem = (
  product: ProductDetail,
  selectedColor: string,
  selectedColorHex: string,
  selectedSize: string,
  quantity: number
): WishlistItem => ({
  productId: String(product.itemId),
  itemName: product.itemName,
  itemImg: product.itemImg ?? "",
  itemPrice: product.itemPrice,
  discount: product.discount,
  selectedColor,
  selectedColorHex,
  selectedSize,
  quantity,
})
