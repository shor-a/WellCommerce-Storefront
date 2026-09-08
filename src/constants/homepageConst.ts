import image15 from "@/assets/images/general/image15.webp"
import image16 from "@/assets/images/general/image16.webp"
import image17 from "@/assets/images/general/image17.webp"
import image18 from "@/assets/images/general/image18.webp"

import vector1 from "@/assets/images/general/vector1.png"
import vector2 from "@/assets/images/general/vector2.png"
import vector3 from "@/assets/images/general/vector3.png"
import vector4 from "@/assets/images/general/vector4.png"
import vector5 from "@/assets/images/general/vector5.png"

export const brandsImage: { src: string; alt: string }[] = [
  { src: vector1, alt: "Versace" },
  { src: vector2, alt: "Zara" },
  { src: vector3, alt: "Gucci" },
  { src: vector4, alt: "Prada" },
  { src: vector5, alt: "Calvin Klein" },
]

export interface DressStyle {
  label: string
  image: string
  wide: boolean
}

export const dressStyles: DressStyle[] = [
  { label: "Casual", image: image15, wide: false }, // row 1 left  — narrow (col-span-1)
  { label: "Formal", image: image16, wide: true }, // row 1 right — wide   (col-span-2)
  { label: "Party", image: image17, wide: true }, // row 2 left  — wide   (col-span-2)
  { label: "Gym", image: image18, wide: false }, // row 2 right — narrow (col-span-1)
]
