import { useState } from "react"
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
  /** When true, renders as a full-width bar (mobile / desktop inline) */
  fullWidth?: boolean
  /** Optional callback fired when the input loses focus — used to collapse the mobile search panel */
  onBlurClose?: () => void
}

export const NavbarSearchBar = ({
  className,
  fullWidth = false,
  onBlurClose,
}: NavbarSearchBarProps) => {
  const [search, setSearch] = useState<string>("")

  const handleBlur = () => {
    // Small delay so clicking a result fires before the panel closes
    if (onBlurClose) setTimeout(onBlurClose, 200)
  }

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "flex-1", className)}>
      <Command className="h-10 w-full">
        <CommandInput
          placeholder="Search for products..."
          value={search}
          onValueChange={(val) => setSearch(val)}
          onBlur={handleBlur}
        />
        <CommandList
          className={cn(
            search ? "" : "hidden",
            "absolute top-full left-0 z-50 mt-1 w-full rounded-sm border bg-background shadow-lg"
          )}
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Product search results">
            {allProducts.map((product) => (
              <Link
                key={product.itemId}
                to={generatePath(PageRoutes.PRODUCT, {
                  productid: String(product.itemId),
                })}
                onClick={() => setSearch("")}
              >
                <CommandItem className="cursor-pointer">
                  <div className="flex w-full">
                    <div className="-mr-5 flex basis-2/6 justify-start">
                      <img
                        src={product.itemImg}
                        className="size-14"
                        alt={product.itemName}
                      />
                    </div>
                    <div className="flex basis-4/6 flex-col items-start justify-center gap-2">
                      <p>{product.itemName}</p>
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
