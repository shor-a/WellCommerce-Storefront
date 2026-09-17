import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface SortPopoverProps<T extends string> {
  value: T
  options: readonly T[]
  onChange: (option: T) => void
  align?: "start" | "center" | "end"
}

export const SortPopover = <T extends string>({
  value,
  options,
  onChange,
  align = "end",
}: SortPopoverProps<T>) => {
  const [open, setOpen] = useState(false)

  return (
    <span className="flex shrink-0 items-center whitespace-nowrap">
      Sort by:
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="inline-flex h-auto items-center gap-1 rounded px-2 py-1 text-sm font-medium text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`Sort by: ${value}`}
        >
          {value}
          <ChevronDown className="size-4" strokeWidth={1.5} />
        </PopoverTrigger>
        <PopoverContent align={align} side="bottom" className="w-48 p-1">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={cn(
                "w-full cursor-pointer rounded-sm px-3 py-2 text-left text-sm hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none",
                option === value
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </span>
  )
}

export default SortPopover
