import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import Register from "./pages/Register";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (token && location.pathname === "/") {
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        {token ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
