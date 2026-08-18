import type { Product } from "@/constants/productConst"

import product1 from "@/assets/images/clothes/image1.webp"
import product2 from "@/assets/images/clothes/image2.webp"
import product3 from "@/assets/images/clothes/image3.webp"
import product4 from "@/assets/images/clothes/image4.webp"
import product5 from "@/assets/images/clothes/image5.webp"
import product6 from "@/assets/images/clothes/image6.webp"
import product7 from "@/assets/images/clothes/image7.webp"
import product8 from "@/assets/images/clothes/image8.webp"
import product9 from "@/assets/images/clothes/image9.webp"
import product10 from "@/assets/images/clothes/image10.webp"
import product11 from "@/assets/images/clothes/image11.webp"
import product12 from "@/assets/images/clothes/image12.webp"

import pdImage1 from "@/assets/images/productdetail/image1.webp"
import pdImage2 from "@/assets/images/productdetail/image2.webp"
import pdImage5 from "@/assets/images/productdetail/image5.webp"
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

export const allProductDetails: ProductDetail[] = [
  {
    itemId: 1,
    itemName: "T-shirt with Tape Details",
    itemPrice: 120,
    itemRating: 4.5,
    discount: 0,
    itemImg: product1,
    ratingCount: 120,
    description:
      "A casual t-shirt featuring distinctive tape details. Made from soft, breathable cotton for all-day comfort and effortless style.",
    colors: [ProductColor.WHITE, ProductColor.BLACK, ProductColor.NAVY],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product1],
  },
  {
    itemId: 2,
    itemName: "Polo Collar T-shirt",
    itemPrice: 210,
    itemRating: 4.5,
    discount: 0,
    itemImg: product2,
    ratingCount: 156,
    description:
      "A classic polo collar t-shirt with a clean, structured look. Crafted from breathable piqué fabric for smart-casual styling.",
    colors: [ProductColor.TEAL, ProductColor.NAVY, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product2],
  },
  {
    itemId: 3,
    itemName: "Pink Polo Shirt",
    itemPrice: 80,
    itemRating: 3.0,
    discount: 0,
    itemImg: product3,
    ratingCount: 75,
    description:
      "A clean and classic pink polo shirt with a relaxed fit. Perfect for smart-casual occasions or everyday wear.",
    colors: [ProductColor.PINK, ProductColor.RED, ProductColor.BLUE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product3],
  },
  {
    itemId: 4,
    itemName: "Sleeve Stripped T-shirt",
    itemPrice: 160,
    itemRating: 5.0,
    discount: 30,
    itemImg: product4,
    ratingCount: 340,
    description:
      "A sporty raglan tee with bold sleeve stripes. Lightweight fabric makes it ideal for active days or casual wear.",
    colors: [ProductColor.WHITE, ProductColor.BLACK, ProductColor.NAVY],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product4],
  },
  {
    itemId: 5,
    itemName: "Skinny Fit Jeans",
    itemPrice: 260,
    itemRating: 3.5,
    discount: 20,
    itemImg: product5,
    ratingCount: 98,
    description:
      "Classic skinny fit jeans crafted from stretch denim for a sleek silhouette with maximum comfort throughout the day.",
    colors: [ProductColor.BLUE, ProductColor.NAVY, ProductColor.BLACK],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product5],
  },
  {
    itemId: 6,
    itemName: "Checkered Shirt",
    itemPrice: 180,
    itemRating: 4.5,
    discount: 0,
    itemImg: product6,
    ratingCount: 210,
    description:
      "A timeless checkered flannel shirt with a relaxed fit. Versatile enough for casual outings or smart-casual occasions.",
    colors: [ProductColor.RED, ProductColor.NAVY, ProductColor.BLACK],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product6],
  },
  {
    itemId: 7,
    itemName: "Courage Graphic T-shirt",
    itemPrice: 145,
    itemRating: 4.0,
    discount: 0,
    itemImg: product7,
    ratingCount: 188,
    description:
      "A bold colorblock raglan tee with striking sleeve contrast. Crafted from premium cotton for a comfortable, relaxed fit.",
    colors: [ProductColor.ORANGE, ProductColor.BLACK, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product7],
  },
  {
    itemId: 8,
    itemName: "Vertical Striped Shirt",
    itemPrice: 232,
    itemRating: 5.0,
    discount: 20,
    itemImg: product8,
    ratingCount: 275,
    description:
      "A relaxed-fit shirt with vertical stripes that elongate the silhouette. Perfect for both office and weekend wear.",
    colors: [ProductColor.GREEN, ProductColor.OLIVE, ProductColor.NAVY],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product8],
  },
  {
    itemId: 9,
    itemName: "War Courage Graphic T-shirt",
    itemPrice: 135,
    itemRating: 4.0,
    discount: 0,
    itemImg: product9,
    ratingCount: 203,
    description:
      "An expressive graphic tee with vivid artwork. Made from soft cotton blend for comfortable everyday wear.",
    colors: [ProductColor.ORANGE, ProductColor.BLACK, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product9],
  },
  {
    itemId: 10,
    itemName: "Distressed Denim Shorts",
    itemPrice: 95,
    itemRating: 4.0,
    discount: 15,
    itemImg: product10,
    ratingCount: 134,
    description:
      "Casual denim shorts with a distressed finish and relaxed cut. A summer essential for effortless street style.",
    colors: [ProductColor.BLUE, ProductColor.BLACK, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product10],
  },
  {
    itemId: 11,
    itemName: "Black Slim Fit Jeans",
    itemPrice: 240,
    itemRating: 4.5,
    discount: 0,
    itemImg: product11,
    ratingCount: 312,
    description:
      "Sleek black slim fit jeans that transition effortlessly from day to night. Crafted from premium stretch denim.",
    colors: [ProductColor.BLACK, ProductColor.NAVY, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product11],
  },
  {
    itemId: 12,
    itemName: "New Rules Tape Sleeve T-shirt",
    itemPrice: 125,
    itemRating: 5.0,
    discount: 10,
    itemImg: product12,
    ratingCount: 289,
    description:
      "A minimal black tee with subtle branding and tape sleeve detailing. Clean design for a modern, understated look.",
    colors: [ProductColor.BLACK, ProductColor.WHITE, ProductColor.NAVY],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product12],
  },
  {
    itemId: 13,
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
    images: [pdImage1, pdImage2, pdImage5, pdImage6],
  },
]
