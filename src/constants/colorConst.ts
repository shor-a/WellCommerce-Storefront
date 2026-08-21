interface ProductColorItem {
  colorId: string
  hex: string
  label: string
}

export const ProductColor = {
  OLIVE: { colorId: "Olive", hex: "#4F4631", label: "Olive" },
  TEAL: { colorId: "Teal", hex: "#314F4A", label: "Teal" },
  NAVY: { colorId: "Navy", hex: "#31344F", label: "Navy" },
  GREEN: { colorId: "Green", hex: "#00C12B", label: "Green" },
  RED: { colorId: "Red", hex: "#F50606", label: "Red" },
  BLUE: { colorId: "Blue", hex: "#063AF5", label: "Blue" },
  PURPLE: { colorId: "Purple", hex: "#7D06F5", label: "Purple" },
  PINK: { colorId: "Pink", hex: "#F506A4", label: "Pink" },
  WHITE: { colorId: "White", hex: "#FFFFFF", label: "White" },
  BLACK: { colorId: "Black", hex: "#000000", label: "Black" },
} as const satisfies Record<string, ProductColorItem>

export type ProductColor = (typeof ProductColor)[keyof typeof ProductColor]
