import { PageRoutes } from "@/config/routes/routes"
import {
  Shirt,
  ShoppingBag,
  Tag,
  Sparkles,
  Gem,
  type LucideIcon,
} from "lucide-react"
import {
  LongSleevedIcon,
  ShortsIcon,
  JeansIcon,
  HoodieIcon,
} from "@/components/atomic/ClothingIcons"
import type { SVGProps } from "react"

import { Package, Heart, Settings } from "lucide-react"

// Shared icon component type  covers both Lucide icons and custom SVG icons
export type IconComponent =
  | LucideIcon
  | ((
      props: SVGProps<SVGSVGElement> & { className?: string }
    ) => React.ReactNode)

export const NavFilterParam = {
  CATEGORY: "category",
  DRESS_STYLE: "style",
  SORT: "sort",
} as const

export interface NavLink {
  id: string
  label: string
  to: string
  icon: IconComponent
  activeParam?: { key: string; value: string }
}

// Dropdown items are grouped into named sections for the panel
export interface NavDropdownSection {
  sectionId: string
  heading: string
  items: NavLink[]
}

export interface NavDropdownLink {
  id: string
  trigger: string
  icon: IconComponent
  sections: NavDropdownSection[]
}

const browseWith = (key: string, value: string) =>
  `${PageRoutes.BROWSE}?${key}=${encodeURIComponent(value)}`

export const navDropdownLinks: NavDropdownLink[] = [
  {
    id: "browse",
    trigger: "Browse Collections",
    icon: ShoppingBag,
    sections: [
      {
        sectionId: "tops",
        heading: "Tops",
        items: [
          {
            id: "tshirts",
            label: "T-Shirts",
            icon: Shirt,
            to: browseWith(NavFilterParam.CATEGORY, "T-shirts"),
            activeParam: { key: NavFilterParam.CATEGORY, value: "T-shirts" },
          },
          {
            id: "shirts",
            label: "Long Sleeved",
            icon: LongSleevedIcon,
            to: browseWith(NavFilterParam.CATEGORY, "Long Sleeved"),
            activeParam: {
              key: NavFilterParam.CATEGORY,
              value: "Long Sleeved",
            },
          },
          {
            id: "hoodies",
            label: "Hoodies",
            icon: HoodieIcon,
            to: browseWith(NavFilterParam.CATEGORY, "Hoodie"),
            activeParam: { key: NavFilterParam.CATEGORY, value: "Hoodie" },
          },
        ],
      },
      {
        sectionId: "bottoms",
        heading: "Bottoms",
        items: [
          {
            id: "shorts",
            label: "Shorts",
            icon: ShortsIcon,
            to: browseWith(NavFilterParam.CATEGORY, "Shorts"),
            activeParam: { key: NavFilterParam.CATEGORY, value: "Shorts" },
          },
          {
            id: "jeans",
            label: "Jeans",
            icon: JeansIcon,
            to: browseWith(NavFilterParam.CATEGORY, "Jeans"),
            activeParam: { key: NavFilterParam.CATEGORY, value: "Jeans" },
          },
        ],
      },
    ],
  },
]

export const navLinks: NavLink[] = [
  {
    id: "sale",
    label: "On Sale",
    icon: Tag,
    to: browseWith(NavFilterParam.SORT, "Price: Low to High"),
    activeParam: { key: NavFilterParam.SORT, value: "Price: Low to High" },
  },
  {
    id: "arrivals",
    label: "New Arrivals",
    icon: Sparkles,
    to: browseWith(NavFilterParam.SORT, "Newest"),
    activeParam: { key: NavFilterParam.SORT, value: "Newest" },
  },
  {
    id: "brands",
    label: "Brands",
    icon: Gem,
    to: PageRoutes.BROWSE,
  },
]

export interface MobileNavSection {
  sectionId: string
  heading: string
  items: NavLink[]
}

export const mobileNavSections: MobileNavSection[] = [
  {
    sectionId: "collections",
    heading: "Collections",
    items: [
      {
        id: "tshirts",
        label: "T-Shirts",
        icon: Shirt,
        to: browseWith(NavFilterParam.CATEGORY, "T-shirts"),
        activeParam: { key: NavFilterParam.CATEGORY, value: "T-shirts" },
      },
      {
        id: "shirts",
        label: "Long Sleeved",
        icon: LongSleevedIcon,
        to: browseWith(NavFilterParam.CATEGORY, "Long Sleeved"),
        activeParam: { key: NavFilterParam.CATEGORY, value: "Long Sleeved" },
      },
      {
        id: "hoodies",
        label: "Hoodies",
        icon: HoodieIcon,
        to: browseWith(NavFilterParam.CATEGORY, "Hoodie"),
        activeParam: { key: NavFilterParam.CATEGORY, value: "Hoodie" },
      },
      {
        id: "shorts",
        label: "Shorts",
        icon: ShortsIcon,
        to: browseWith(NavFilterParam.CATEGORY, "Shorts"),
        activeParam: { key: NavFilterParam.CATEGORY, value: "Shorts" },
      },
      {
        id: "jeans",
        label: "Jeans",
        icon: JeansIcon,
        to: browseWith(NavFilterParam.CATEGORY, "Jeans"),
        activeParam: { key: NavFilterParam.CATEGORY, value: "Jeans" },
      },
    ],
  },
  {
    sectionId: "discover",
    heading: "Discover",
    items: [
      {
        id: "sale",
        label: "On Sale",
        icon: Tag,
        to: browseWith(NavFilterParam.SORT, "Price: Low to High"),
        activeParam: { key: NavFilterParam.SORT, value: "Price: Low to High" },
      },
      {
        id: "arrivals",
        label: "New Arrivals",
        icon: Sparkles,
        to: browseWith(NavFilterParam.SORT, "Newest"),
        activeParam: { key: NavFilterParam.SORT, value: "Newest" },
      },
      {
        id: "brands",
        label: "Brands",
        icon: Gem,
        to: PageRoutes.BROWSE,
      },
    ],
  },
]

export interface NavbarUserIconProps {
  className?: string
}

export const authMenuItems = [
  {
    id: "orders",
    label: "Order History",
    icon: Package,
    to: PageRoutes.ORDER_HISTORY,
  },
  {
    id: "wishlist",
    label: "My Wishlist",
    icon: Heart,
    to: PageRoutes.WISHLIST,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    to: PageRoutes.SETTINGS,
  },
] as const
