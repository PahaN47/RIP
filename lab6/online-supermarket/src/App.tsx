import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Body } from "./components/Body";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { OrdersPage } from "./pages/OrdersPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body>
          <Routes>
            <Route path="/" />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/product/:id" element={<ProductPage />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </Body>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
