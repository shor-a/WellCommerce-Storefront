import { useRef, useState, useCallback, useEffect } from "react"

import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import Rating from "../atomic/Rating"
import type { Testimony } from "@/constants/testimonyConst"

interface HappyCustomersProps {
  className?: string
  testimonies: Testimony[]
}

export const HappyCustomers = ({ testimonies }: HappyCustomersProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const CARD_WIDTH = 376 // card width + gap

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    return () => el.removeEventListener("scroll", updateScrollState)
  }, [updateScrollState])

  const handlePrev = () => {
    trackRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" })
  }

  const handleNext = () => {
    trackRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" })
  }

  return (
    <section className={cn("w-full bg-background pt-12 lg:pt-16")}>
      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-[100px]">
        {/* Header row with prev/next buttons */}
        <div className="flex items-center justify-between">
          <h1 className="text-left font-heading text-3xl font-bold text-foreground lg:text-5xl">
            OUR HAPPY CUSTOMERS
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous testimonials"
              aria-pressed={false}
              disabled={!canScrollLeft}
              onClick={handlePrev}
              className="size-9 rounded-full border border-border disabled:opacity-30"
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next testimonials"
              aria-pressed={false}
              disabled={!canScrollRight}
              onClick={handleNext}
              className="size-9 rounded-full border border-border disabled:opacity-30"
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Scrollable card track */}
        <div
          ref={trackRef}
          className="flex scrollbar-none gap-4 overflow-x-auto pb-2 lg:gap-5"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonies.map((testimony) => (
            <Card
              key={testimony.name}
              className="w-[360px] shrink-0 rounded-[20px] border border-border bg-card shadow-none md:w-[400px]"
            >
              <CardContent className="flex flex-col gap-4 p-7">
                <Rating
                  starValue={testimony.starValue ?? 5}
                  className="size-5"
                />
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-foreground">
                    {testimony.name}
                  </span>
                  {testimony.verified && (
                    <BadgeCheck
                      className="size-5 text-[#01AB31]"
                      aria-label="Verified buyer"
                    />
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {testimony.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HappyCustomers
