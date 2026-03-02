import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import InventoryPageOne from "./features/inventory/inventoryPageOne";
import ProductsPageOne from "./features/products/productsPageOne";
import StockPageOne from "./features/stockTransfer/stockpageOne";
import Layout from "./pages/Layout";
import { ProtectedRoute } from "./routes/protectedRoutes";
import { PublicRoutes } from "./routes/publicRoutes";
import { Login } from "./features/auth/pages/Login";


function App() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      } />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} /> 
          <Route path="home" element={<Home />} />
          <Route path="inventory" element={<InventoryPageOne />} />
          <Route path="products" element={<ProductsPageOne />} />
          <Route path="stock-transfer" element={<StockPageOne />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;