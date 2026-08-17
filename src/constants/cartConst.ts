import type { Product } from "./productConst"

export interface Cart extends Pick<Product, "itemId" | "itemName" | "itemImg"> {
  itemQty: number
  itemColor: string
  itemSize: string
  finalPrice: number
}

export const DELIVERY_FEE = 15
export const DISCOUNT_RATE = 20
