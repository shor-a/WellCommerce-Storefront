import { PageRoutes } from "./config/routes"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BrowseCategoryPage from "./pages/BrowseCategoryPage"
import ShoppingCartPage from "./pages/ShoppingCartPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import LoginPage from "./pages/LoginPage"
import ScrollToTop from "./hooks/scrollToTop"
import RegisterPage from "./pages/RegisterPage"
import OrderHistoryPage from "./pages/OrderHistoryPage"

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={PageRoutes.HOME} element={<HomePage />} />
        <Route path={PageRoutes.BROWSE} element={<BrowseCategoryPage />} />
        <Route path={PageRoutes.PRODUCT} element={<ProductDetailPage />} />
        <Route path={PageRoutes.CART} element={<ShoppingCartPage />} />
        <Route path={PageRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PageRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={PageRoutes.ORDER_HISTORY} element={<OrderHistoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
