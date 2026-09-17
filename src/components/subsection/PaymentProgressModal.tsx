import { useEffect, useRef, type ReactNode } from "react"
import {
  CheckCircle,
  Circle,
  CreditCard,
  Loader,
  Package,
  ShoppingBag,
} from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PageRoutes } from "@/config/routes/routes"
import { PaymentStep } from "@/constants/checkoutConst"
import type { PaymentStep as PaymentStepType } from "@/constants/checkoutConst"

interface StepConfig {
  label: string
  icon: ReactNode
  activeIcon: ReactNode
}

const steps: StepConfig[] = [
  {
    label: "Validating",
    icon: <CreditCard className="size-4" strokeWidth={1.5} />,
    activeIcon: <CreditCard className="size-4" strokeWidth={2} />,
  },
  {
    label: "Processing",
    icon: <Loader className="size-4" strokeWidth={1.5} />,
    activeIcon: <Loader className="size-4 animate-spin" strokeWidth={2} />,
  },
  {
    label: "Confirmed",
    icon: <CheckCircle className="size-4" strokeWidth={1.5} />,
    activeIcon: <CheckCircle className="size-4" strokeWidth={2} />,
  },
  {
    label: "Complete",
    icon: <Package className="size-4" strokeWidth={1.5} />,
    activeIcon: <Package className="size-4" strokeWidth={2} />,
  },
]

interface PaymentProgressModalProps {
  isOpen: boolean
  currentStep: PaymentStepType
  orderTotal: number
  onClose: () => void
}

export const PaymentProgressModal = ({
  isOpen,
  currentStep,
  onClose,
}: PaymentProgressModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  const isComplete = currentStep === PaymentStep.COMPLETE

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isComplete) onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, isComplete, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const progressPercent = (currentStep / (steps.length - 1)) * 100

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Payment progress"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={isComplete ? onClose : undefined}
      />

      <div
        ref={dialogRef}
        className="relative z-10 flex w-full max-w-md flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-xl"
      >
        {isComplete ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary">
              <CheckCircle
                className="size-8 text-primary-foreground"
                strokeWidth={2}
              />
            </div>
            <h2 className="font-heading text-2xl font-bold">Order Placed!</h2>
            <p className="text-sm text-muted-foreground">
              Your payment was successful.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-border">
              <Loader
                className="size-8 animate-spin text-foreground"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="font-heading text-2xl font-bold">
              Processing Payment
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we process your payment securely.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="relative">
            <div className="absolute top-4 right-0 left-0 h-0.5 bg-secondary" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="relative flex items-start justify-between">
              {steps.map((step, index) => {
                const isDone = index < currentStep
                const isActive = index === currentStep
                const isPending = index > currentStep

                return (
                  <div
                    key={step.label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={cn(
                        "relative z-10 flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isDone &&
                          "border-primary bg-primary text-primary-foreground",
                        isActive &&
                          "border-primary bg-background text-foreground",
                        isPending &&
                          "border-border bg-secondary text-muted-foreground"
                      )}
                    >
                      {isDone ? (
                        <CheckCircle className="size-4" strokeWidth={2} />
                      ) : isActive ? (
                        step.activeIcon
                      ) : (
                        <Circle className="size-4" strokeWidth={1.5} />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors duration-300",
                        isDone && "text-foreground",
                        isActive && "text-foreground",
                        isPending && "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="flex flex-col gap-10">
            <Link to={PageRoutes.ORDER_HISTORY} onClick={onClose}>
              <Button
                variant="default"
                size="lg"
                className="w-full rounded-full font-bold"
              >
                View My Orders
              </Button>
            </Link>
            <Link to={PageRoutes.BROWSE} onClick={onClose}>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full font-bold"
              >
                <ShoppingBag className="size-4" strokeWidth={2} />
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentProgressModal
