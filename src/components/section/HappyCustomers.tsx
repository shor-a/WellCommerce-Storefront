import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import reviews from "@/constants/testimonyConst"
import Rating from "../atomic/Rating"

const HappyCustomers = (): React.ReactNode => {
  const [activeReview, setActiveReview] = useState(2)

  const showPreviousReview = () => {
    setActiveReview((current) => Math.max(0, current - 1))
  }

  const showNextReview = () => {
    setActiveReview((current) => Math.min(reviews.length - 1, current + 1))
  }

  const removeBlur = (): boolean => {
    if (activeReview === 2 || activeReview === reviews.length - 2) {
      return true
    }
    return false
  }

  return (
    <section className="happy-customers w-full bg-background pt-30 pb-20">
      <div className="container mx-auto px-10">
        <header className="mb-10 flex w-full max-w-[1280px] items-end justify-between gap-6 px-6">
          <h2 className="mt-[-1px] text-3xl leading-none font-bold tracking-[0] text-black sm:text-5xl">
            OUR HAPPY CUSTOMERS
          </h2>
          <nav
            aria-label="Customer review carousel controls"
            className="flex items-center gap-[30px]"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showPreviousReview}
              disabled={activeReview === 0}
              aria-label="Show previous customer review"
              className="h-6 w-6 rounded-none p-0 text-black hover:bg-transparent disabled:opacity-40"
            >
              <ArrowLeft className="h-6 w-6 stroke-[1.5]" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showNextReview}
              disabled={activeReview === reviews.length - 1}
              aria-label="Show next customer review"
              className="h-6 w-6 rounded-none p-0 text-black hover:bg-transparent disabled:opacity-40"
            >
              <ArrowRight className="h-6 w-6 stroke-[1.5]" />
            </Button>
          </nav>
        </header>
        <div
          className="flex w-max items-start gap-5 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(50vw - ${activeReview * 420 + 200}px))`,
          }}
        >
          {reviews.map((review, reviewIndex: number) => (
            <Card
              key={`${review.name}-${reviewIndex}`}
              className={`h-[225px] w-[400px] rounded-[20px] border-primary bg-background shadow-none ring-2 ${
                removeBlur() && review.blurred ? "blur-[2px]" : ""
              }`}
            >
              <CardContent className="flex flex-col items-start gap-[10px] px-8 py-3">
                <Rating starValue={5} className="size-5" />
                <div className="flex w-full flex-col items-start gap-3">
                  <div className="inline-flex items-center gap-1">
                    <h3 className="text-xl leading-[22px] font-bold tracking-[0] text-black">
                      {review.name}
                    </h3>
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400 text-white"
                      aria-label="Verified customer"
                    >
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4 stroke-[3]"
                      />
                    </span>
                  </div>
                  <p className="text-base leading-[22px] font-normal tracking-[0] text-[#00000099]">
                    {review.review}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HappyCustomers
