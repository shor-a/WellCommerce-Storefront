import { Eye, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { SettingsPersonalInfoForm } from "@/components/subsection/SettingsPersonalInfoForm"
import { SettingsChangePasswordForm } from "@/components/subsection/SettingsChangePasswordForm"
import { SettingsShippingAddressForm } from "@/components/subsection/SettingsShippingAddressForm"

interface SettingsSectionProps {
  className?: string
}

const Card = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-5 rounded-2xl border border-border bg-background px-6 py-6">
    <div className="flex items-center gap-2">
      <Icon strokeWidth={1.75} className="size-5 text-foreground" />
      <h2 className="text-base font-bold text-foreground">{title}</h2>
    </div>
    <Separator />
    {children}
  </div>
)

export const SettingsSection = ({ className }: SettingsSectionProps) => (
  <section
    aria-label="Account settings"
    className={cn("w-full bg-background", className)}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Settings
        </h1>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left — Personal Info + Change Password */}
        <div className="flex flex-col gap-6 lg:basis-1/2">
          <Card icon={User} title="Personal Information">
            <SettingsPersonalInfoForm />
          </Card>
          <Card icon={Eye} title="Change Password">
            <SettingsChangePasswordForm />
          </Card>
        </div>

        {/* Right — Shipping Address */}
        <div className="lg:sticky lg:top-8 lg:basis-1/2">
          <Card icon={MapPin} title="Shipping Address">
            <SettingsShippingAddressForm />
          </Card>
        </div>
      </div>
    </div>
  </section>
)

export default SettingsSection
