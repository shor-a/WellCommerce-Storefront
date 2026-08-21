import {
  ProductColor,
  type ProductColor as ProductColorType,
} from "./colorConst"

import { ProductSize, type ProductSize as ProductSizeType } from "./sizeConst"

export const filterColors: ProductColorType[] = [
  ProductColor.OLIVE,
  ProductColor.TEAL,
  ProductColor.NAVY,
  ProductColor.GREEN,
  ProductColor.RED,
  ProductColor.BLUE,
  ProductColor.PURPLE,
  ProductColor.PINK,
  ProductColor.WHITE,
  ProductColor.BLACK,
]

export const filterSizes: ProductSizeType[] = [
  ProductSize.XX_SMALL,
  ProductSize.X_SMALL,
  ProductSize.SMALL,
  ProductSize.MEDIUM,
  ProductSize.LARGE,
  ProductSize.X_LARGE,
  ProductSize.XX_LARGE,
  ProductSize.XXXX_LARGE,
]

export const filterCategories: string[] = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
]

export const filterDressStyles: string[] = ["Casual", "Formal", "Party", "Gym"]

export const filterPriceRange = { min: 0, max: 300 } as const
