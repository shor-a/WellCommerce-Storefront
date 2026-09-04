import { Pencil } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BillingAddressSectionProps {
  className?: string
  sameAsShipping: boolean
  onEdit: () => void
}

export const BillingAddressSection = ({
  className,
  sameAsShipping,
  onEdit,
}: BillingAddressSectionProps) => {
  const handleEdit = () => onEdit()

  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="flex items-center justify-between rounded-[20px] border border-black/10 bg-background p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">Billing Address</h2>
          <p className="text-sm text-muted-foreground">
            {sameAsShipping ? "Same as shipping address" : "Custom billing address"}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Edit billing address"
          onClick={handleEdit}
          className="shrink-0 transition-all duration-150 hover:bg-secondary active:scale-95"
        >
          <Pencil className="size-4 text-foreground" strokeWidth={1.5} />
        </Button>
      </div>
    </section>
  )
}

export default BillingAddressSection
