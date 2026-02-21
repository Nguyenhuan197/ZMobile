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



function App() {
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
      <Route path="/login-admin" element={<LoginAdmin />} />






    </Routes>
  );
}

export default App;
