import { Navigate, Outlet } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"
import { useCartStore } from "@/hooks/cartStores"

/** Redirects to cart if cart is empty, guards the checkout page */
export const CartRoute = () => {
  const cart = useCartStore((state) => state.cart)

  if (cart.length === 0) {
    return <Navigate to={PageRoutes.CART} replace />
  }

  return <Outlet />
}

export default CartRoute
