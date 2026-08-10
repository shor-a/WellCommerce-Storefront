import { Star, StarHalf } from "lucide-react"

export const Rating = ({
  starValue,
}: {
  starValue: number
}): React.ReactNode => {
  const fullStar = Math.floor(starValue)
  const halfStar = starValue - fullStar

  let stars: React.ReactNode

  switch (fullStar) {
    case 1:
      stars = <Star strokeWidth={1} fill="yellow" className="size-4" />
      break
    case 2:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
        </>
      )
      break
    case 3:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
        </>
      )
      break
    case 4:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
        </>
      )
      break
    case 5:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
          <Star strokeWidth={1} fill="yellow" className="size-4" />
        </>
      )
      break
    default:
      stars = <></>
      break
  }

  if (halfStar > 0) {
    stars = (
      <>
        {stars} <StarHalf strokeWidth={1} fill="yellow" className="size-4" />
      </>
    )
  }

  return (
    <div className="flex items-center">
      {stars} <p className="px-1">{starValue}/5</p>
    </div>
  )
}

export default Rating
