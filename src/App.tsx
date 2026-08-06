import { PageRoutes } from "./config/routes"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.HOME} element={<HomePage />}></Route>
        <Route path={PageRoutes.SHOP} element={<ShopPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
