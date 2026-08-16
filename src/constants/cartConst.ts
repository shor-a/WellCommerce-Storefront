import type { Product } from "./productConst"

export interface Cart extends Pick<Product, "itemId" | "itemName" | "itemImg"> {
  itemQty: number
  itemColor: string
  itemSize: string
  finalPrice: number
}
