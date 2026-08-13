import product1 from "@/assets/images/clothes/image1.webp"
import product2 from "@/assets/images/clothes/image2.webp"
import product3 from "@/assets/images/clothes/image3.webp"
import product4 from "@/assets/images/clothes/image4.webp"
import product5 from "@/assets/images/clothes/image5.webp"
import product6 from "@/assets/images/clothes/image6.webp"
import product7 from "@/assets/images/clothes/image7.webp"
import product8 from "@/assets/images/clothes/image8.webp"

export interface Product {
  itemId: string
  itemName: string
  itemRating: number
  itemPrice: number
  discount: number
  itemImg: string
}

export const arrivals: Product[] = [
  {
    itemId: "1",
    itemName: "T-shirt with Tape Details",
    itemPrice: 120,
    itemRating: 4.5,
    discount: 0,
    itemImg: product1,
  },
  {
    itemId: "2",
    itemName: "Skinny Fit Jeans",
    itemPrice: 260,
    itemRating: 3.5,
    discount: 20,
    itemImg: product2,
  },
  {
    itemId: "3",
    itemName: "Checkered Shirt",
    itemPrice: 180,
    itemRating: 4.5,
    discount: 0,
    itemImg: product3,
  },
  {
    itemId: "4",
    itemName: "Sleeve Stripped T-shirt",
    itemPrice: 160,
    itemRating: 5.0,
    discount: 30,
    itemImg: product4,
  },
  {
    itemId: "5",
    itemName: "Vertical Striped Shirt",
    itemPrice: 232,
    itemRating: 5.0,
    discount: 20,
    itemImg: product5,
  },
  {
    itemId: "6",
    itemName: "Courage Graphic T-shirt",
    itemPrice: 145,
    itemRating: 4.0,
    discount: 0,
    itemImg: product6,
  },
  {
    itemId: "7",
    itemName: "Loose Fit Bermuda Shorts",
    itemPrice: 80,
    itemRating: 3.0,
    discount: 0,
    itemImg: product7,
  },
  {
    itemId: "8",
    itemName: "Faded Skinny Jeans",
    itemPrice: 210,
    itemRating: 4.5,
    discount: 0,
    itemImg: product8,
  },
]
