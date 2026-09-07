import { CreditCard, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PaymentMethodSection } from "@/components/section/PaymentMethodSection"
import { ShippingAddressSection } from "@/components/section/ShippingAddressSection"
import {
  CheckoutTab,
  type PaymentMethod,
  type CardFormValues,
} from "@/constants/checkoutConst"
import { type ShippingAddress } from "@/constants/orderHistoryConst"

interface CheckoutTabsSectionProps {
  className?: string
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
}

export const CheckoutTabsSection = ({
  className,
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
}: CheckoutTabsSectionProps) => {
  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="rounded-[20px] border border-black/10 bg-background">
        <Tabs
          defaultValue={CheckoutTab.PAYMENT}
          orientation="horizontal"
          className="flex w-full flex-col gap-0"
        >
          {/* Tab bar */}
          <div className="border-b border-black/10 px-8 pt-6 pb-0">
            <TabsList
              variant="line"
              className="h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0"
            >
              <TabsTrigger
                value={CheckoutTab.PAYMENT}
                className="mr-8 flex items-center gap-2 rounded-none px-0 pb-3 text-sm font-bold text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none data-active:text-foreground data-active:after:opacity-100"
              >
                <CreditCard className="size-4" strokeWidth={1.5} />
                Payment Method
              </TabsTrigger>

              <TabsTrigger
                value={CheckoutTab.SHIPPING}
                className="flex items-center gap-2 rounded-none px-0 pb-3 text-sm font-bold text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none data-active:text-foreground data-active:after:opacity-100"
              >
                <MapPin className="size-4" strokeWidth={1.5} />
                Shipping Address
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab panels */}
          <TabsContent value={CheckoutTab.PAYMENT} className="mt-0 w-full">
            <PaymentMethodSection
              selectedMethod={selectedMethod}
              cardValues={cardValues}
              submitAttempted={submitAttempted}
              onSelectMethod={onSelectMethod}
              onCardChange={onCardChange}
              className="[&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none"
            />
          </TabsContent>

          <TabsContent value={CheckoutTab.SHIPPING} className="mt-0 w-full">
            <ShippingAddressSection
              shippingValues={shippingValues}
              isEditing={isEditingShipping}
              submitAttempted={submitAttempted}
              onEdit={onEditShipping}
              onSave={onSaveShipping}
              onShippingChange={onShippingChange}
              className="[&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default CheckoutTabsSection
