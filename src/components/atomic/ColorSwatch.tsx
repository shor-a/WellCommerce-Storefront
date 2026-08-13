import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ColorSwatchProps {
  hex: string
  label: string
  isActive: boolean
}

export const ColorSwatch = ({ hex, label, isActive }: ColorSwatchProps) => (
  <button
    type="button"
    aria-label={`Select color ${label}`}
    aria-pressed={isActive}
    className={cn(
      "inline-flex size-9 items-center justify-center rounded-full border-2 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      isActive ? "border-foreground" : "border-transparent"
    )}
    style={{ backgroundColor: hex }}
  >
    {isActive && <Check className="size-4 text-white" strokeWidth={2.5} />}
  </button>
)

export default ColorSwatch
