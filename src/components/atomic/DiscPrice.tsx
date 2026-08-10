import { Badge } from "@/components/ui/badge"

interface DiscProps {
  itemPrice: number
  discount: number
}

const DiscPrice = ({ itemPrice, discount }: DiscProps) => {
  const discountedAmt = discount > 0 ? (discount / 100) * itemPrice : 0
  const priceAftDisc =
    discountedAmt > 0 ? (
      <>
        <p className="text-base font-bold text-primary">
          ${(itemPrice - discountedAmt).toFixed(0)}
        </p>
        <p className="text-base font-bold text-stone-400">${itemPrice}</p>
        <Badge variant="destructive">
          <p className="text-[0.5rem]">{`${discount}%`}</p>
        </Badge>
      </>
    ) : (
      <>
        <p className="text-base font-bold text-primary">${itemPrice}</p>
      </>
    )

  return (
    <>
      <div className="flex items-center gap-1">{priceAftDisc}</div>
    </>
  )
}

export default DiscPrice
