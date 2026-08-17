export interface FilterColor {
  colorId: string
  hex: string
  label: string
}

export const filterColors: FilterColor[] = [
  { colorId: "green", hex: "#00C12B", label: "Green" },
  { colorId: "red", hex: "#F50606", label: "Red" },
  { colorId: "yellow", hex: "#F5DD06", label: "Yellow" },
  { colorId: "orange", hex: "#F57906", label: "Orange" },
  { colorId: "cyan", hex: "#06CAF5", label: "Cyan" },
  { colorId: "blue", hex: "#063AF5", label: "Blue" },
  { colorId: "purple", hex: "#7D06F5", label: "Purple" },
  { colorId: "pink", hex: "#F506A4", label: "Pink" },
  { colorId: "white", hex: "#FFFFFF", label: "White" },
  { colorId: "black", hex: "#000000", label: "Black" },
]

export const filterSizes: string[] = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
]

export const filterCategories: string[] = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
]

export const filterDressStyles: string[] = ["Casual", "Formal", "Party", "Gym"]

export const filterPriceRange = { min: 50, max: 200 } as const
