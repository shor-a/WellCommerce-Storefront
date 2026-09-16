import NewsLetter from "./NewsLetter"

import { Separator } from "@/components/ui/separator"
import { paymentMethods } from "@/constants/footerConst"
import { footerLinks, socialLinks } from "@/constants/footerConst"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) => (
  <div className="flex flex-col gap-4">
    <p className="text-sm font-medium tracking-[3px] text-foreground md:text-base">
      {title}
    </p>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export const Footer = ({ className }: FooterProps) => {
  return (
    <>
      {/* Newsletter Section - Positioned to overlap footer */}
      <div className="-mt-5 flex w-full justify-center px-4 sm:px-6 lg:px-10">
        <NewsLetter className="relative top-[90px] z-10" />
      </div>

      {/* Footer */}
      <footer className={cn("w-full bg-secondary", className)}>
        <div className="container mx-auto px-4 pt-28 pb-8 sm:px-6 lg:px-10 lg:pt-36 lg:pb-10">
          {/* Main Footer Content */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
            {/* Brand Section */}
            <div className="flex flex-col gap-5 lg:basis-[20%] lg:pr-6">
              <h2 className="font-heading text-[26px] leading-tight font-bold lg:text-[33px]">
                WELLCOMMERCE
              </h2>
              <p className="max-w-[248px] text-sm leading-relaxed text-muted-foreground">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-foreground hover:text-background"
                    >
                      <Icon className="size-3.5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Footer Links - Grid Layout */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:flex lg:flex-1 lg:justify-between lg:gap-0">
              <FooterLinkColumn {...footerLinks.company} />
              <FooterLinkColumn {...footerLinks.help} />
              <FooterLinkColumn {...footerLinks.faq} />
              <FooterLinkColumn {...footerLinks.resources} />
            </div>
          </div>

          {/* Separator */}
          <Separator className="my-6 lg:my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">
              WellCommerce 2026, All Rights Reserved
            </p>
            <div className="flex gap-3">
              {paymentMethods.map((payment) => (
                <div
                  key={payment.alt}
                  className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background"
                >
                  <img
                    className="h-full w-full object-contain p-1.5"
                    src={payment.src}
                    alt={payment.alt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
