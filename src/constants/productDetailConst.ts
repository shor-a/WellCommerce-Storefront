import type { Product } from "@/constants/productConst"

import pdImage1 from "@/assets/images/productdetail/image1.webp"
import pdImage2 from "@/assets/images/productdetail/image2.webp"
import pdImage6 from "@/assets/images/productdetail/image6.webp"

export interface ProductColor {
  colorId: string
  hex: string
  label: string
}

export type ProductSize = "Small" | "Medium" | "Large" | "X-Large"

export interface ProductDetail extends Product {
  ratingCount: number
  description: string
  colors: ProductColor[]
  sizes: ProductSize[]
  images: string[]
}

const defaultProduct: Product = {
  itemId: "",
  itemName: "",
  itemRating: 0,
  itemPrice: 0,
  discount: 0,
  itemImg: "",
}

export const oneLifeTshirt: ProductDetail = {
  ...defaultProduct,
  itemId: "pd-1",
  itemName: "One Life Graphic T-shirt",
  itemRating: 4.5,
  itemPrice: 300,
  discount: 40,
  itemImg: pdImage1,
  ratingCount: 451,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  colors: [
    { colorId: "olive", hex: "#4F4631", label: "Olive" },
    { colorId: "teal", hex: "#314F4A", label: "Teal" },
    { colorId: "navy", hex: "#31344F", label: "Navy" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
  images: [pdImage1, pdImage2, pdImage6],
}
