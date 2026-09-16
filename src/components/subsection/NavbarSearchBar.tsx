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
  const [dropdownRect, setDropdownRect] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const wrapperRef = useRef<HTMLDivElement>(null)

  // For the fixed dropdown: measure both the header bottom AND the wrapper's
  // left/width so the results panel aligns exactly with the search bar.
  useEffect(() => {
    if (!fullWidth) return

    const measure = () => {
      const header = document.querySelector("header")
      const wrapper = wrapperRef.current
      if (!header || !wrapper) return
      const headerBottom = header.getBoundingClientRect().bottom
      const wRect = wrapper.getBoundingClientRect()
      setDropdownRect({
        top: headerBottom,
        left: wRect.left,
        width: wRect.width,
      })
    }

    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true })
    window.visualViewport?.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
      window.visualViewport?.removeEventListener("resize", measure)
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
            // Mobile/collapsed: fixed, sized to match the search bar exactly
            fullWidth
              ? "fixed z-50"
              : "absolute top-full right-0 z-50 mt-1 w-max max-w-sm min-w-full",
            "max-h-72 overflow-y-auto rounded-sm border bg-background shadow-lg"
          )}
          style={
            fullWidth
              ? {
                  top: dropdownRect.top,
                  left: dropdownRect.left,
                  width: dropdownRect.width,
                }
              : undefined
          }
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
                  value={String(product.itemId)}
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
