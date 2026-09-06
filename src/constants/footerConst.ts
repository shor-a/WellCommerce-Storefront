import visa from "@/assets/images/general/visa.png"
import mastercard from "@/assets/images/general/mastercard.png"
import paypal from "@/assets/images/general/paypal.png"
import applePay from "@/assets/images/general/applepay.png"
import googlePay from "@/assets/images/general/googlepay.png"

import {
  SiFacebook,
  SiX,
  SiGithub,
  SiInstagram,
} from "@icons-pack/react-simple-icons"

export const footerLinks = {
  company: {
    title: "COMPANY",
    links: [
      { label: "About", href: "/" },
      { label: "Features", href: "/" },
      { label: "Works", href: "/" },
      { label: "Career", href: "/" },
    ],
  },
  help: {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/" },
      { label: "Delivery Details", href: "/" },
      { label: "Terms & Conditions", href: "/" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
  faq: {
    title: "FAQ",
    links: [
      { label: "Account", href: "/" },
      { label: "Manage Deliveries", href: "/" },
      { label: "Orders", href: "/" },
      { label: "Payments", href: "/" },
    ],
  },
  resources: {
    title: "RESOURCES",
    links: [
      { label: "Free eBooks", href: "/" },
      { label: "Development Tutorial", href: "/" },
      { label: "How to - Blog", href: "/" },
      { label: "Youtube Playlist", href: "/" },
    ],
  },
}

export const socialLinks = [
  { icon: SiX, label: "X (Twitter)", href: "/" },
  { icon: SiFacebook, label: "Facebook", href: "/" },
  { icon: SiInstagram, label: "Instagram", href: "/" },
  { icon: SiGithub, label: "GitHub", href: "/" },
]

export const paymentMethods = [
  { src: visa, alt: "Visa" },
  { src: mastercard, alt: "Mastercard" },
  { src: paypal, alt: "PayPal" },
  { src: applePay, alt: "Apple Pay" },
  { src: googlePay, alt: "Google Pay" },
]
