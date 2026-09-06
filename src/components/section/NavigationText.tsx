import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavigationCrumb {
  label: string
  href: string | null
}

interface NavigationTextProps {
  className?: string
  crumbs: NavigationCrumb[]
}

export const NavigationText = ({ className, crumbs }: NavigationTextProps) => (
  <nav
    aria-label="Breadcrumb"
    className={cn("w-full bg-background", className)}
  >
    <div className="container mx-auto px-4 pt-4 sm:px-6 lg:px-10">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.label} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 text-muted-foreground"
                  strokeWidth={2}
                />
              )}
              {isLast ? (
                <span className="font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href ?? "#"}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  </nav>
)

export default NavigationText
