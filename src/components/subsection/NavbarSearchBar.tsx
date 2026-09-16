import { useState, useRef, useEffect } from "react"
import { generatePath, Link } from "react-router-dom"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { PageRoutes } from "@/config/routes"
import { allProducts } from "@/constants/productConst"
import Rating from "@/components/atomic/Rating"

interface NavbarSearchBarProps {
  className?: string
  /**
   * When true (mobile panel), the dropdown uses `fixed` positioning so it
   * escapes the sticky header + overflow-hidden wrapper that would clip it.
   */
  fullWidth?: boolean
  /** Fired on input blur — used to collapse the mobile search row */
  onBlurClose?: () => void
}

export const NavbarSearchBar = ({
  className,
  fullWidth = false,
  onBlurClose,
}: NavbarSearchBarProps) => {
  const [search, setSearch] = useState<string>("")
  const [dropdownTop, setDropdownTop] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // For the mobile fixed dropdown: measure the bottom of the sticky header
  // so the results panel sits right below it regardless of whether
  // the OfferNavbar is visible or not.
  useEffect(() => {
    if (!fullWidth) return

    const measure = () => {
      const header = document.querySelector("header")
      if (header) setDropdownTop(header.getBoundingClientRect().bottom)
    }

    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true })
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
    }
  }, [fullWidth])

  const handleBlur = () => {
    if (onBlurClose) setTimeout(onBlurClose, 200)
  }

  const filtered = search.trim()
    ? allProducts.filter((p) =>
        p.itemName.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts

  const hasResults = search.trim().length > 0

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", fullWidth ? "w-full" : "flex-1", className)}
    >
      <Command shouldFilter={false} className="h-10 w-full">
        <CommandInput
          placeholder="Search for products..."
          value={search}
          onValueChange={(val) => setSearch(val)}
          onBlur={handleBlur}
        />
        <CommandList
          className={cn(
            hasResults ? "" : "hidden",
            // Desktop: absolute, anchored to the bar
            // Mobile: fixed, anchored just below the header via inline style
            fullWidth
              ? "fixed right-0 left-0 z-50 mx-4 sm:mx-6"
              : "absolute top-full right-0 z-50 mt-1 w-max max-w-sm min-w-full",
            "max-h-72 overflow-y-auto rounded-sm border bg-background shadow-lg"
          )}
          style={fullWidth ? { top: dropdownTop } : undefined}
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Product search results">
            {filtered.map((product) => (
              <Link
                key={product.itemId}
                to={generatePath(PageRoutes.PRODUCT, {
                  productid: String(product.itemId),
                })}
                onClick={() => setSearch("")}
              >
                <CommandItem
                  value={product.itemId}
                  className="cursor-pointer px-3 py-2"
                >
                  <div className="flex w-full items-center gap-3">
                    <img
                      src={product.itemImg}
                      className="size-14 shrink-0 rounded object-contain"
                      alt={product.itemName}
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="truncate text-sm leading-tight font-medium">
                        {product.itemName}
                      </p>
                      <Rating
                        starValue={product.itemRating}
                        className="size-3"
                      />
                    </div>
                  </div>
                </CommandItem>
              </Link>
            ))}
            <CommandSeparator />
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export default NavbarSearchBar
