import { ChevronRight } from "lucide-react"

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop/men" },
  { label: "T-shirts", href: null },
]

export const NavigationText = () => (
  <nav aria-label="Breadcrumb" className="w-full bg-background">
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-10">
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
