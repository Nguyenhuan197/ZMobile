import { Routes, Route } from "react-router-dom";
import Home from "./client/page/home";
import About from "./client/page/about";
import Contact from "./client/page/contact";
import Cart from "./client/page/cart";
import ProductDetail from "./client/page/productDetail";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />

    </Routes>
  );
}

export default App;
