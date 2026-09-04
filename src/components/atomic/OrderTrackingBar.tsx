import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TrackingStep, trackingSteps } from "@/constants/orderHistoryConst"

interface OrderTrackingBarProps {
  currentStep: TrackingStep
}

export const OrderTrackingBar = ({ currentStep }: OrderTrackingBarProps) => {
  const currentIndex = trackingSteps.indexOf(currentStep)

  return (
    <div className="relative flex items-start justify-between">
      {/* connecting line — sits behind the dots */}
      <div className="absolute top-4 right-[18px] left-[18px] h-0.5 bg-border" />
      <div
        className="absolute top-4 left-[18px] h-0.5 bg-foreground transition-all duration-300"
        style={{
          width:
            currentIndex === 0
              ? "0%"
              : `${(currentIndex / (trackingSteps.length - 1)) * 100}%`,
        }}
      />

      {trackingSteps.map((step, i) => {
        const isCompleted = i <= currentIndex
        const isCurrent = i === currentIndex

        return (
          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
            {/* dot */}
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-all duration-150",
                isCompleted
                  ? "bg-foreground text-background"
                  : "border-2 border-border bg-background",
                isCurrent &&
                  "ring-4 ring-background shadow-[0_0_0_4px_theme(colors.background)]",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isCompleted && (
                <CheckIcon className="size-4 stroke-[2.5]" />
              )}
            </div>

            {/* label */}
            <span
              className={cn(
                "text-center text-[10px] leading-[15px]",
                isCompleted ? "font-bold text-foreground" : "font-normal text-muted-foreground",
              )}
            >
              {step === TrackingStep.ORDER_PLACED ? (
                <>
                  Order
                  <br />
                  Placed
                </>
              ) : step === TrackingStep.OUT_FOR_DELIVERY ? (
                <>
                  Out for
                  <br />
                  Delivery
                </>
              ) : (
                step
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default OrderTrackingBar
