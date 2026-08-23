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

export const pageSize = 9

export const filterDressStyles: string[] = ["Casual", "Formal", "Party", "Gym"]

export const filterPriceRange = { min: 0, max: 300 } as const

export const SortOption = {
  MOST_POPULAR: "Most Popular",
  NEWEST: "Newest",
  PRICE_LOW_HIGH: "Price: Low to High",
  PRICE_HIGH_LOW: "Price: High to Low",
  TOP_RATED: "Top Rated",
} as const

export type SortOption = (typeof SortOption)[keyof typeof SortOption]

export const filterSortOptions: SortOption[] = [
  SortOption.MOST_POPULAR,
  SortOption.NEWEST,
  SortOption.PRICE_LOW_HIGH,
  SortOption.PRICE_HIGH_LOW,
  SortOption.TOP_RATED,
]
