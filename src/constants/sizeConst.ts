// export type ProductSize = "Small" | "Medium" | "Large" | "X-Large"
export const ProductSize = {
  XX_SMALL: "XX-Small",
  X_SMALL: "X-Small",
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
  X_LARGE: "X-Large",
  XX_LARGE: "XX-Large",
  XXX_LARGE: "XXX-Large",
  XXXX_LARGE: "XXXX-Large",
} as const

export type ProductSize = (typeof ProductSize)[keyof typeof ProductSize]
