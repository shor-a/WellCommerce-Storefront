import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NewsProp {
  className: string
}

export const NewsLetter = ({ className }: NewsProp) => {
  return (
    <Card
      className={cn(
        className,
        `w-full max-w-[950px] overflow-hidden rounded-[20px] border-0 bg-black text-white shadow-none`
      )}
    >
      <CardContent className="flex flex-col gap-7 px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-10 md:px-16">
        <h2 className="text-xl leading-[35px] font-bold tracking-[0] md:max-w-[551px] lg:text-[32px]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form
          className="flex w-full shrink-0 flex-col gap-3.5 md:max-w-[349px]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Enter your email address
          </label>
          <div className="flex h-10 items-center gap-3 rounded-[62px] bg-white px-4 lg:h-12">
            <Mail
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-black/40"
              strokeWidth={1.75}
            />
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              className="h-20 border-0 bg-transparent text-base font-normal text-black placeholder:text-[#00000066] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button
            type="submit"
            className="h-10 w-full rounded-[62px] bg-white px-4 text-base font-medium text-black hover:bg-white/90 lg:h-12"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewsLetter
