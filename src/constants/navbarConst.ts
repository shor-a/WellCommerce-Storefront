import { PageRoutes } from "@/config/routes"

export interface NavLink {
  id: string
  label: string
  to: string
}

export interface NavDropdownLink {
  id: string
  label: string
  trigger: string
  items: NavLink[]
}

export const navDropdownLinks: NavDropdownLink[] = [
  {
    id: "browse",
    label: "Browse Collections",
    trigger: "Browse Collections",
    items: [
      { id: "tshirts", label: "Fancy T-Shirts", to: PageRoutes.BROWSE },
      { id: "pants", label: "Sports Pants", to: PageRoutes.BROWSE },
      { id: "shorts", label: "Unique Shorts", to: PageRoutes.BROWSE },
    ],
  },
] as const satisfies NavDropdownLink[]

export const navLinks: NavLink[] = [
  { id: "sale", label: "On Sale", to: PageRoutes.BROWSE },
  { id: "arrivals", label: "New Arrivals", to: PageRoutes.BROWSE },
  { id: "brands", label: "Brands", to: PageRoutes.BROWSE },
] as const satisfies NavLink[]

// Mobile drawer nav — flat list combining all links for the hamburger menu
export const mobileNavLinks: NavLink[] = [
  { id: "browse-tshirts", label: "Fancy T-Shirts", to: PageRoutes.BROWSE },
  { id: "browse-pants", label: "Sports Pants", to: PageRoutes.BROWSE },
  { id: "browse-shorts", label: "Unique Shorts", to: PageRoutes.BROWSE },
  { id: "sale", label: "On Sale", to: PageRoutes.BROWSE },
  { id: "arrivals", label: "New Arrivals", to: PageRoutes.BROWSE },
  { id: "brands", label: "Brands", to: PageRoutes.BROWSE },
] as const satisfies NavLink[]
