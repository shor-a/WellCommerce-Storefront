import { PageRoutes } from "./config/routes"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.HOME} element={<HomePage />}></Route>
        <Route path={PageRoutes.SHOP} element={<ProductDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
