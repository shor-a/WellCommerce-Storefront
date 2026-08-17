import type { Product } from "./productConst"

import product1 from "@/assets/images/clothes/image1.webp"
import product3 from "@/assets/images/clothes/image3.webp"
import product2 from "@/assets/images/clothes/image2.webp"

export interface Cart extends Pick<Product, "itemId" | "itemName" | "itemImg"> {
  itemQty: number
  itemColor: string
  itemSize: string
  finalPrice: number
}

export const DELIVERY_FEE = 15
export const DISCOUNT_RATE = 20

export const defaultCartItems: Cart[] = [
  {
    itemId: 1,
    itemName: "Gradient Graphic T-shirt",
    itemImg: product1,
    itemQty: 1,
    itemColor: "White",
    itemSize: "Large",
    finalPrice: 145,
  },
  {
    itemId: 3,
    itemName: "Checkered Shirt",
    itemImg: product3,
    itemQty: 1,
    itemColor: "Red",
    itemSize: "Medium",
    finalPrice: 180,
  },
  {
    itemId: 2,
    itemName: "Skinny Fit Jeans",
    itemImg: product2,
    itemQty: 1,
    itemColor: "Blue",
    itemSize: "Large",
    finalPrice: 240,
  },
]
