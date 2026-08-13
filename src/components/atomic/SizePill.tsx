import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SizePillProps {
  label: string
  isActive: boolean
  className?: string
}

export const SizePill = ({ label, isActive, className }: SizePillProps) => (
  <Button
    type="button"
    aria-pressed={isActive}
    variant={isActive ? "default" : "secondary"}
    className={cn(
      "h-auto rounded-full px-5 py-3 text-base font-normal",
      className
    )}
  >
    {label}
  </Button>
)

export default SizePill
