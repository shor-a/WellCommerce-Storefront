import type { Product } from "./productConst"
import type { ProductSize } from "./sizeConst"

export interface Cart extends Pick<Product, "itemName" | "itemImg"> {
  cartItemID: string
  itemQty: number
  itemColor: string
  itemSize: string
  finalPrice: number
}

// 1 Navy Large => 1NL
export const constructCID = (
  itemId: number,
  color: string,
  size: ProductSize
): string => {
  let cid = ""
  cid = cid.concat(
    itemId.toString(),
    color.substring(0, 1),
    size.substring(0, 1)
  )
  return cid
}

// 1NL => 1 Navy Large
export const destructProductId = (cid: string): number => {
  return parseInt(cid.substring(0, 1))
}

export const DELIVERY_FEE = 15
export const DISCOUNT_RATE = 20
