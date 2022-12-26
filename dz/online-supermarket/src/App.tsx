import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Body } from "./components/Body";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { OrdersPage } from "./pages/OrdersPage";
import { Provider } from "react-redux";
import store from "./store";
import {
  CART_LINK,
  LOGIN_LINK,
  ORDERS_LINK,
  PRODUCTS_LINK,
} from "./constant/links";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body>
          <Routes>
            <Route path={PRODUCTS_LINK} element={<ProductsPage />} />
            <Route path={`${PRODUCTS_LINK}/:id`} element={<ProductPage />} />
            <Route path={ORDERS_LINK} element={<OrdersPage />} />
            <Route path="/orders/product/:id" element={<ProductPage />} />
            <Route path={CART_LINK} element={<CartPage />} />
            <Route path={LOGIN_LINK} element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </Body>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
