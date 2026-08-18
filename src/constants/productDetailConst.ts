import type { Product } from "@/constants/productConst"

import pdImage1 from "@/assets/images/productdetail/image1.webp"
import pdImage2 from "@/assets/images/productdetail/image2.webp"
import pdImage6 from "@/assets/images/productdetail/image6.webp"
import {
  ProductColor,
  type ProductColor as ProductColorType,
} from "./colorConst"

import { ProductSize, type ProductSize as ProductSizeType } from "./sizeConst"

export interface ProductDetail extends Product {
  ratingCount: number
  description: string
  colors: ProductColorType[]
  sizes: ProductSizeType[]
  images: string[]
}

const defaultProduct: Product = {
  itemId: 0,
  itemName: "",
  itemRating: 0,
  itemPrice: 0,
  discount: 0,
  itemImg: "",
}

export const oneLifeTshirt: ProductDetail = {
  ...defaultProduct,
  itemId: 6,
  itemName: "One Life Graphic T-shirt",
  itemRating: 4.5,
  itemPrice: 300,
  discount: 40,
  itemImg: pdImage1,
  ratingCount: 451,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  colors: [ProductColor.OLIVE, ProductColor.TEAL, ProductColor.NAVY],
  sizes: [
    ProductSize.SMALL,
    ProductSize.MEDIUM,
    ProductSize.LARGE,
    ProductSize.X_LARGE,
  ],
  images: [pdImage1, pdImage2, pdImage6],
}
