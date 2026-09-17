import { PageRoutes } from "./config/routes/routes"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BrowseCategoryPage from "./pages/BrowseCategoryPage"
import ShoppingCartPage from "./pages/ShoppingCartPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import LoginPage from "./pages/LoginPage"
import ScrollToTop from "./hooks/scrollToTop"
import RegisterPage from "./pages/RegisterPage"
import OrderHistoryPage from "./pages/OrderHistoryPage"
import CheckoutPage from "./pages/CheckoutPage"
import SettingsPage from "./pages/SettingsPage"

import { PrivateRoute } from "./config/routes/PrivateRoute"
import { GuestRoute } from "./config/routes/GuestRoute"
import { CartRoute } from "./config/routes/CartRoute"

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path={PageRoutes.HOME} element={<HomePage />} />
        <Route path={PageRoutes.BROWSE} element={<BrowseCategoryPage />} />
        <Route path={PageRoutes.PRODUCT} element={<ProductDetailPage />} />
        <Route path={PageRoutes.CART} element={<ShoppingCartPage />} />

        {/* Guest-only routes, redirect to home if already logged in */}
        <Route element={<GuestRoute />}>
          <Route path={PageRoutes.LOGIN} element={<LoginPage />} />
          <Route path={PageRoutes.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Auth-required routes, redirect to login if not authenticated */}
        <Route element={<PrivateRoute />}>
          <Route
            path={PageRoutes.ORDER_HISTORY}
            element={<OrderHistoryPage />}
          />
          <Route path={PageRoutes.WISHLIST} element={<OrderHistoryPage />} />
          <Route path={PageRoutes.SETTINGS} element={<SettingsPage />} />

          {/* Also requires non-empty cart, nested so both guards apply */}
          <Route element={<CartRoute />}>
            <Route path={PageRoutes.CHECKOUT} element={<CheckoutPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
