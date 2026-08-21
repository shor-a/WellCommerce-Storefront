import { ProductColor } from "@/constants/colorConst"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ColorSwatchProps {
  colorId: string
  hex: string
  label: string
  isActive: boolean
  size?: "sm" | "lg"
  setColor?: (colorId: string) => void
}

export const ColorSwatch = ({
  colorId,
  hex,
  label,
  isActive,
  size = "sm",
  setColor,
}: ColorSwatchProps) => (
  <button
    type="button"
    aria-label={`Select color ${label}`}
    aria-pressed={isActive}
    className={cn(
      "inline-flex items-center justify-center rounded-full border-2 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      size === "lg" ? "size-9" : "size-6",
      isActive ? "border-foreground" : "border-foreground/15"
    )}
    style={{ backgroundColor: hex }}
    onClick={() => setColor?.(colorId)}
  >
    {isActive && (
      <Check
        className={cn(
          size === "lg" ? "size-4" : "size-3",
          colorId === ProductColor.WHITE.colorId ? "text-black" : "text-white"
        )}
        strokeWidth={2.5}
      />
    )}
  </button>
)

export default ColorSwatch
