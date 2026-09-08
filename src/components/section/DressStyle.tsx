import type { DressStyle } from "@/constants/homepageConst"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes"

interface BrowseStyleSectionProps {
  styles: DressStyle[]
}

export const BrowseStyleSection = ({ styles }: BrowseStyleSectionProps) => (
  <section className={cn("w-full bg-background py-12 lg:py-16")}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-[100px]">
      {/* Outer rounded container matching Lunacy's bg-secondary rounded-[40px] */}
      <div className="flex flex-col gap-8 rounded-[40px] bg-secondary px-8 py-10 lg:px-16 lg:py-[70px]">
        <h1 className="text-left font-heading text-3xl font-bold text-foreground lg:text-5xl">
          BROWSE BY DRESS STYLE
        </h1>

        {/* 3-col grid: narrow=1col, wide=2col — two rows */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {styles.map((style) => (
            <Link
              key={style.label}
              to={PageRoutes.BROWSE}
              className={cn(
                "group relative overflow-hidden rounded-[20px] bg-background",
                // wide cards span 2 columns on lg, narrow span 1
                style.wide ? "lg:col-span-2" : "lg:col-span-1"
              )}
            >
              {/* fixed height container — image fills it */}
              <div className="relative h-[190px] w-full overflow-hidden md:h-[230px] lg:h-[289px]">
                <img
                  src={style.image}
                  alt={style.label}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* label top-left */}
                <span className="absolute top-6 left-6 font-heading text-2xl font-bold text-foreground lg:text-[36px]">
                  {style.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default BrowseStyleSection
