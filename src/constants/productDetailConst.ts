import { allProducts, type Product } from "@/constants/productConst"

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
import pdImage6 from "@/assets/images/productdetail/image6.webp"
import {
  ProductColor,
  type ProductColor as ProductColorType,
} from "./colorConst"

import { ProductSize, type ProductSize as ProductSizeType } from "./sizeConst"

import { SortOption, type SortOption as SortOptionType } from "./categoryConst"

export interface ProductDetail extends Product {
  ratingCount: number
  description: string
  colors: ProductColorType[]
  sizes: ProductSizeType[]
  images: string[]
  category?: string
  dressStyle?: string
}

export const populateFilteredProducts = (
  selectedColor: string[],
  selectedSize: string[],
  sliderRange: [number, number],
  products: ProductDetail[],
  selectedCategory?: string[],
  selectedDressStyle?: string[],
  sortOption?: SortOptionType
): ProductDetail[] => {
  const filtered = products
    .filter((p) =>
      selectedColor.length === 0
        ? true
        : p.colors.some((c) => selectedColor.includes(c.colorId))
    )
    .filter((p) =>
      selectedSize.length === 0
        ? true
        : p.sizes.some((size) => selectedSize.includes(size))
    )
    .filter(
      (p) => p.itemPrice >= sliderRange[0] && p.itemPrice <= sliderRange[1]
    )
    .filter((p) =>
      !selectedCategory || selectedCategory.length === 0
        ? true
        : p.category != null && selectedCategory.includes(p.category)
    )
    .filter((p) =>
      !selectedDressStyle || selectedDressStyle.length === 0
        ? true
        : p.dressStyle != null && selectedDressStyle.includes(p.dressStyle)
    )

  if (!sortOption || sortOption === SortOption.MOST_POPULAR) return filtered

  return [...filtered].sort((a, b) => {
    switch (sortOption) {
      case SortOption.PRICE_LOW_HIGH:
        return a.itemPrice - b.itemPrice
      case SortOption.PRICE_HIGH_LOW:
        return b.itemPrice - a.itemPrice
      case SortOption.TOP_RATED:
        return b.itemRating - a.itemRating
      case SortOption.NEWEST:
        // Higher itemId = newer product in this dataset
        return b.itemId - a.itemId
      default:
        return 0
    }
  })
}

export const allProductDetails: ProductDetail[] = [
  {
    ...allProducts[0],
    ratingCount: 120,
    category: "T-shirts",
    dressStyle: "Casual",
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
    ...allProducts[1],
    ratingCount: 156,
    category: "T-shirts",
    dressStyle: "Formal",
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
    ...allProducts[2],
    ratingCount: 75,
    category: "T-shirts",
    dressStyle: "Casual",
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
    ...allProducts[3],
    ratingCount: 340,
    category: "T-shirts",
    dressStyle: "Gym",
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
    ...allProducts[4],
    ratingCount: 98,
    category: "Jeans",
    dressStyle: "Casual",
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
    ...allProducts[5],
    ratingCount: 210,
    category: "Long Sleeved",
    dressStyle: "Casual",
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
    ...allProducts[6],
    ratingCount: 188,
    category: "T-shirts",
    dressStyle: "Casual",
    description:
      "A bold colorblock raglan tee with striking sleeve contrast. Crafted from premium cotton for a comfortable, relaxed fit.",
    colors: [ProductColor.GREEN, ProductColor.BLACK, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product7],
  },
  {
    ...allProducts[7],
    ratingCount: 275,
    category: "Long Sleeved",
    dressStyle: "Formal",
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
    ...allProducts[8],
    ratingCount: 203,
    category: "T-shirts",
    dressStyle: "Party",
    description:
      "An expressive graphic tee with vivid artwork. Made from soft cotton blend for comfortable everyday wear.",
    colors: [ProductColor.NAVY, ProductColor.BLACK, ProductColor.WHITE],
    sizes: [
      ProductSize.SMALL,
      ProductSize.MEDIUM,
      ProductSize.LARGE,
      ProductSize.X_LARGE,
    ],
    images: [product9],
  },
  {
    ...allProducts[9],
    ratingCount: 134,
    category: "Shorts",
    dressStyle: "Casual",
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
    ...allProducts[10],
    ratingCount: 312,
    category: "Jeans",
    dressStyle: "Formal",
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
    ...allProducts[11],
    ratingCount: 289,
    category: "T-shirts",
    dressStyle: "Party",
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
    ...allProducts[12],
    ratingCount: 451,
    category: "T-shirts",
    dressStyle: "Casual",
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
  },
]
