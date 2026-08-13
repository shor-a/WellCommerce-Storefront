import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface QuantityStepperProps {
  quantity: number
}

export const QuantityStepper = ({ quantity }: QuantityStepperProps) => (
  <div className="flex h-auto items-center gap-4 rounded-full bg-secondary px-5 py-3">
    <Button
      type="button"
      aria-label="Decrease quantity"
      variant="ghost"
      size="icon-sm"
      className="rounded-full"
    >
      <Minus strokeWidth={2.5} />
    </Button>
    <span className="min-w-[1ch] text-center text-base font-medium">
      {quantity}
    </span>
    <Button
      type="button"
      aria-label="Increase quantity"
      variant="ghost"
      size="icon-sm"
      className="rounded-full"
    >
      <Plus strokeWidth={2.5} />
    </Button>
  </div>
)

export default QuantityStepper
