import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ProductSize } from "@/constants/productDetailConst"

interface SizePillProps {
  label: ProductSize
  isActive: boolean
  className?: string
  changeSize: (size: ProductSize) => void
}

export const SizePill = ({
  label,
  isActive,
  className,
  changeSize,
}: SizePillProps) => (
  <Button
    type="button"
    aria-pressed={isActive}
    variant={isActive ? "default" : "secondary"}
    className={cn(
      "h-auto rounded-full px-5 py-3 text-base font-normal",
      className
    )}
    onClick={() => changeSize(label)}
  >
    {label}
  </Button>
)

export default SizePill
