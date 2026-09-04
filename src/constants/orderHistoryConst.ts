import { allProductDetails } from "@/constants/productDetailConst"

export const OrderStatus = {
  ALL: "All Orders",
  ACTIVE: "Active",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURNS: "Returns",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  RETURNED: "Returned",
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export const orderStatusFilters: OrderStatus[] = [
  OrderStatus.ALL,
  OrderStatus.ACTIVE,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
  OrderStatus.RETURNS,
]

export const TrackingStep = {
  ORDER_PLACED: "Order Placed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
} as const

export type TrackingStep = (typeof TrackingStep)[keyof typeof TrackingStep]

export const trackingSteps: TrackingStep[] = [
  TrackingStep.ORDER_PLACED,
  TrackingStep.PROCESSING,
  TrackingStep.SHIPPED,
  TrackingStep.OUT_FOR_DELIVERY,
  TrackingStep.DELIVERED,
]

export interface OrderItem {
  itemId: number
  itemName: string
  size: string
  color: string
  quantity: number
  price: number
  itemImg: string
}

export interface ShippingAddress {
  name: string
  line1: string
  city: string
  country: string
  phone: string
}

export interface PaymentMethod {
  brand: string
  last4: string
  note: string
}

export interface Order {
  orderId: string
  status: OrderStatus
  placedDate: string
  total: number
  items: OrderItem[]
  currentStep: TrackingStep
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}

const defaultShipping: ShippingAddress = {
  name: "John Doe",
  line1: "123 Fashion Ave, Apt 4B",
  city: "New York, NY 10001",
  country: "United States",
  phone: "+1 (555) 123-4567",
}

const defaultPayment: PaymentMethod = {
  brand: "VISA",
  last4: "4242",
  note: "Billing address same as shipping",
}

const fromProduct = (
  productIndex: number,
  colorIndex: number,
  sizeIndex: number,
  quantity: number
): OrderItem => {
  const p = allProductDetails[productIndex]
  return {
    itemId: p.itemId,
    itemName: p.itemName,
    size: p.sizes[sizeIndex],
    color: p.colors[colorIndex].label,
    quantity,
    price: p.itemPrice,
    itemImg: p.itemImg ?? "",
  }
}

export const orderHistory: Order[] = [
  {
    orderId: "well-k7m2p9",
    status: OrderStatus.DELIVERED,
    placedDate: "Dec 15, 2024",
    currentStep: TrackingStep.DELIVERED,
    shippingAddress: defaultShipping,
    paymentMethod: defaultPayment,
    items: [fromProduct(6, 0, 1, 1), fromProduct(0, 1, 2, 1)],
    get total() {
      return this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  {
    orderId: "well-r4n8j1",
    status: OrderStatus.SHIPPED,
    placedDate: "Dec 12, 2024",
    currentStep: TrackingStep.SHIPPED,
    shippingAddress: defaultShipping,
    paymentMethod: defaultPayment,
    items: [fromProduct(5, 1, 0, 1)],
    get total() {
      return this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  {
    orderId: "well-b2x5w6",
    status: OrderStatus.PROCESSING,
    placedDate: "Dec 16, 2024",
    currentStep: TrackingStep.PROCESSING,
    shippingAddress: defaultShipping,
    paymentMethod: defaultPayment,
    items: [fromProduct(10, 0, 1, 1)],
    get total() {
      return this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  {
    orderId: "well-h9q3t7",
    status: OrderStatus.CANCELLED,
    placedDate: "Nov 28, 2024",
    currentStep: TrackingStep.ORDER_PLACED,
    shippingAddress: defaultShipping,
    paymentMethod: defaultPayment,
    items: [fromProduct(4, 1, 1, 1)],
    get total() {
      return this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  {
    orderId: "well-f6d1y4",
    status: OrderStatus.RETURNED,
    placedDate: "Oct 15, 2024",
    currentStep: TrackingStep.DELIVERED,
    shippingAddress: defaultShipping,
    paymentMethod: defaultPayment,
    items: [fromProduct(11, 1, 2, 1), fromProduct(9, 0, 2, 1)],
    get total() {
      return this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
]

export const ORDERS_PER_PAGE = 3

export const OrderSortOption = {
  NEWEST: "Newest",
  OLDEST: "Oldest",
  HIGHEST_TOTAL: "Highest Total",
  LOWEST_TOTAL: "Lowest Total",
} as const

export type OrderSortOption =
  (typeof OrderSortOption)[keyof typeof OrderSortOption]

export const orderSortOptions: OrderSortOption[] = [
  OrderSortOption.NEWEST,
  OrderSortOption.OLDEST,
  OrderSortOption.HIGHEST_TOTAL,
  OrderSortOption.LOWEST_TOTAL,
]
