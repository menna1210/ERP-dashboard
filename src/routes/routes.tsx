import { createBrowserRouter} from "react-router-dom";

import Error from "../pages/Error";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import InventoryPageOne from "../features/inventory/inventoryPageOne";
import StockPageOne from "../features/stockTransfer/stockpageOne";
import ProductsPageOne from "../features/products/productsPageOne";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./protectedRoutes";
import PublicRoutes from "./publicRoutes"
export const routes = createBrowserRouter([
  {
 
    path: "/login",
    element: (
    <PublicRoutes >
    <Login />
     </PublicRoutes >
  )},
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
       </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "inventory",
        element: <InventoryPageOne />,
       
         
      
      },
      {
        path: "products",
        element: <ProductsPageOne />,
        
      },
      {
        path: "stock-transfer",
        element: <StockPageOne />,
        
      },
    ],
  },
  { path: "*", element: <Error /> },
]);