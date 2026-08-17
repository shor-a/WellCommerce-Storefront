import { ListFilter, ChevronDown } from "lucide-react"

import ReviewCard from "@/components/atomic/ReviewCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { productReviews } from "@/constants/reviewConst"

export const MultiMenuSection = () => (
  <section
    aria-label="Product information tabs"
    className="w-full bg-background"
  >
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <Tabs defaultValue="rating-reviews" className="w-full flex-col">
        {/* Tabs bar */}
        <TabsList
          variant="line"
          className="h-auto w-full rounded-none p-0 [&>*]:flex-1"
        >
          <TabsTrigger
            value="product-details"
            className="py-4 text-base font-normal"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger value="rating-reviews" className="py-4 text-base">
            Rating &amp; Reviews
          </TabsTrigger>
          <TabsTrigger value="faqs" className="py-4 text-base font-normal">
            FAQs
          </TabsTrigger>
        </TabsList>

        <Separator />

        {/* ── Product Details ── */}
        <TabsContent value="product-details" className="pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            This graphic t-shirt is perfect for any occasion. Crafted from a
            soft and breathable fabric, it offers superior comfort and style.
          </p>
        </TabsContent>

        {/* ── Rating & Reviews ── */}
        <TabsContent value="rating-reviews" className="pt-8">
          {/* Header row */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                All Reviews
              </h2>
              <span className="text-base text-muted-foreground">(451)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                aria-label="Filter reviews"
                className="size-12 rounded-full"
              >
                <ListFilter className="size-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="gap-2 rounded-full"
                aria-label="Sort by latest"
              >
                Latest
                <ChevronDown className="size-4" />
              </Button>

              <Button variant="default" size="lg" className="rounded-full px-6">
                Write a Review
              </Button>
            </div>
          </div>

          {/* Reviews 2-col grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {productReviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </div>

          {/* Load more */}
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full px-16">
              Load More Reviews
            </Button>
          </div>
        </TabsContent>

        {/* ── FAQs ── */}
        <TabsContent value="faqs" className="pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Frequently asked questions will appear here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  </section>
)

export default MultiMenuSection
