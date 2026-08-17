import { BadgeCheck, Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Rating from "@/components/atomic/Rating"

export interface ReviewCardData {
  reviewId: string
  reviewerName: string
  starValue: number
  reviewText: string
  postedDate: string
  verified?: boolean
}

interface ReviewCardProps {
  review: ReviewCardData
}

export const ReviewCard = ({ review }: ReviewCardProps) => (
  <Card className="rounded-[20px] border border-border bg-card ring-0">
    <CardContent className="flex flex-col gap-4 p-7">
      <div className="flex items-start justify-between">
        <Rating starValue={review.starValue} className="size-5" />
        <Button
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="size-6 text-muted-foreground"
        >
          <Ellipsis className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <span className="text-base font-bold text-foreground">
            {review.reviewerName}
          </span>
          {review.verified && (
            <BadgeCheck
              className="size-5 text-[#01AB31]"
              aria-label="Verified buyer"
            />
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {review.reviewText}
        </p>
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        Posted on {review.postedDate}
      </p>
    </CardContent>
  </Card>
)

export default ReviewCard
