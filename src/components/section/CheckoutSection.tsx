import { cn } from "@/lib/utils"
import { CheckoutTabsSection } from "@/components/section/CheckoutTabsSection"
import { CheckoutOrderSummary } from "@/components/subsection/CheckoutOrderSummary"
import {
  DELIVERY_FEE,
  DISCOUNT_RATE,
  type PaymentMethod,
  type CardFormValues,
} from "@/constants/checkoutConst"
import type { ShippingAddress } from "@/constants/orderHistoryConst"
import type { Cart } from "@/constants/cartConst"

interface CheckoutSectionProps {
  className?: string
  cart: Cart[]
  selectedMethod: PaymentMethod
  cardValues: CardFormValues
  shippingValues: ShippingAddress
  isEditingShipping: boolean
  submitAttempted: boolean
  onSelectMethod: (method: PaymentMethod) => void
  onCardChange: (field: keyof CardFormValues, value: string | boolean) => void
  onShippingChange: (field: keyof ShippingAddress, value: string) => void
  onEditShipping: () => void
  onSaveShipping: () => void
  onPayNow: () => void
}

export const CheckoutSection = ({
  className,
  cart,
  selectedMethod,
  cardValues,
  shippingValues,
  isEditingShipping,
  submitAttempted,
  onSelectMethod,
  onCardChange,
  onShippingChange,
  onEditShipping,
  onSaveShipping,
  onPayNow,
}: CheckoutSectionProps) => (
  <main className={cn("w-full bg-background", className)}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <h1 className="mb-6 text-3xl lg:text-3xl">Checkout</h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="lg:basis-7/12">
          <CheckoutTabsSection
            selectedMethod={selectedMethod}
            cardValues={cardValues}
            shippingValues={shippingValues}
            isEditingShipping={isEditingShipping}
            submitAttempted={submitAttempted}
            onSelectMethod={onSelectMethod}
            onCardChange={onCardChange}
            onShippingChange={onShippingChange}
            onEditShipping={onEditShipping}
            onSaveShipping={onSaveShipping}
          />
        </div>

        <div className="lg:basis-5/12">
          <CheckoutOrderSummary
            items={cart}
            discountRate={DISCOUNT_RATE}
            deliveryFee={DELIVERY_FEE}
            onPayNow={onPayNow}
          />
        </div>
      </div>
    </div>
  </main>
)

export default CheckoutSection
