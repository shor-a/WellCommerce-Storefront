import { cn } from "@/lib/utils"
import { Star, StarHalf } from "lucide-react"

export const Rating = ({
  starValue,
  className = "size-4",
  showScale = false,
}: {
  starValue: number
  className?: string
  showScale?: boolean
}): React.ReactNode => {
  const fullStar = Math.floor(starValue)
  const halfStar = starValue - fullStar

  let stars: React.ReactNode

  switch (fullStar) {
    case 1:
      stars = <Star strokeWidth={1} fill="yellow" className={cn(className)} />
      break
    case 2:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
        </>
      )
      break
    case 3:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
        </>
      )
      break
    case 4:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
        </>
      )
      break
    case 5:
      stars = (
        <>
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
          <Star strokeWidth={1} fill="yellow" className={cn(className)} />
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
        {stars} <StarHalf strokeWidth={1} fill="yellow" className={className} />
      </>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {stars} {showScale ? <p className={"px-1"}>{starValue}/5</p> : <></>}
    </div>
  )
}

export default Rating
