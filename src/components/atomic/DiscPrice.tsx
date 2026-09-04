import { Badge } from "@/components/ui/badge"

interface DiscProps {
  itemPrice: number
  discount: number
  fontSize?: string
}

const DiscPrice = ({
  itemPrice,
  discount,
  fontSize = "text-base",
}: DiscProps) => {
  const discountedAmt = discount > 0 ? (discount / 100) * itemPrice : 0
  const priceAftDisc =
    discountedAmt > 0 ? (
      <>
        <p className={`${fontSize} pr-2 font-bold text-primary`}>
          ${(itemPrice - discountedAmt).toFixed(0)}
        </p>
        <p className={`${fontSize} font-bold text-stone-400 line-through`}>
          ${itemPrice}
        </p>
        <Badge variant="destructive">
          <p className="text-[0.5rem]">{`${discount}%`}</p>
        </Badge>
      </>
    ) : (
      <>
        <p className={`${fontSize} font-bold text-primary`}>${itemPrice}</p>
      </>
    )

  return (
    <>
      <div className="flex items-center gap-1">{priceAftDisc}</div>
    </>
  )
}

export default DiscPrice
