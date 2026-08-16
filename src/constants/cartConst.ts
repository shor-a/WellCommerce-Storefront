import type { Product } from "./productConst"

export interface Cart extends Product {
  itemQty: number
  selectedColor: string
  selectedSize: string
  finalPrice: number
}
