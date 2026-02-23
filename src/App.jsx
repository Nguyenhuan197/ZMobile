import { Routes, Route } from "react-router-dom";
import Home from "./client/page/home";
import About from "./client/page/about";
import Contact from "./client/page/contact";
import Cart from "./client/page/cart";
import ProductDetail from "./client/page/productDetail";
import Pay from "./client/page/pay";
import OrderLookup from "./client/page/orderLookup";
import Register from "./client/page/register";
import Login from "./client/page/login";
import Search from "./client/page/search";
import LoginAdmin from "./client/page/loginAdmin";
import { useState } from "react";
import ProductAdmin from "./admin/page/Product";
import CategoryAdmin from "./admin/page/Category";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import User from "./client/page/user";



function App() {
  const [statusUser, setStatusUser] = useState("Admin");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/orderLookup" element={<OrderLookup />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/user" element={<User />} />



      {/* Admin Routes (Chỉ Admin mới xem được) */}
      <Route element={<ProtectedRoute isAllowed={statusUser === "Admin"} />}>
        <Route path="/admin-zmobile-2026/product" element={<ProductAdmin />} />
        <Route path="/admin-zmobile-2026/category" element={<CategoryAdmin />} />
      </Route>

      {/* Trang Login cho Admin */}
      <Route path="/login-admin" element={<LoginAdmin />} />
    </Routes>
  );
}

export default App;
