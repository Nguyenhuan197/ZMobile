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
import { useEffect, useState } from "react";
import ProductAdmin from "./admin/page/Product";
import CategoryAdmin from "./admin/page/Category";
import NumberOfProductsSold from "./admin/page/PageNumberOfProductsSold";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import User from "./client/page/user";
import { ToastContainer } from "react-toastify";
import Trademark from "./client/page/trademark";
import ScrollToTop from "./scrollToTop";
import UiLoadingComponent from "./components/loadingComponent";
import PageSaleAdmin from "./admin/page/Sale";
import AddNewProductAdmin from "./admin/page/AddNewProduct";
import PagecSlideAdmin from "./admin/page/Slide";
import UpdateProductAdmin from "./admin/page/UpdateProduct";
import ListUserAdmin from "./admin/page/ListUsers";
import Recruitment from "./client/page/recruitment";



function App() {
  const keyRoleAdmin = import.meta.env.VITE_KEY_NAME_CHECK_ROLE_ADMIN
  const [statusUser, setStatusUser] = useState(null);

  useEffect(() => {
    if (!keyRoleAdmin) {
      setStatusUser("Cline");
      return;
    }

    const getRole = localStorage.getItem(keyRoleAdmin);

    if (getRole === "Admin") {
      setStatusUser("Admin");
    } else {
      setStatusUser("Cline");   // 👈 BẮT BUỘC PHẢI CÓ
    }
  }, []);


  if (statusUser === null) return <UiLoadingComponent />;

  return (
    <>
      <ScrollToTop />

      <ToastContainer
        position="top-left"
        autoClose={3000}
        style={{ top: '120px', marginRight: "10px" }}
      />

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
        <Route path="/trademark-product/:id" element={<Trademark />} />
        <Route path="/trademark-product" element={<Trademark />} />
        <Route path="/recruitment" element={<Recruitment />} />



        {/* Admin Routes (Chỉ Admin mới xem được) */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route element={<ProtectedRoute isAllowed={statusUser === "Admin"} />}>
          <Route path="/admin-zmobile-2026/product/list" element={<ProductAdmin />} />
          <Route path="/admin-zmobile-2026/product/sale" element={<PageSaleAdmin />} />
          <Route path="/admin-zmobile-2026/product/numberOfProductsSold" element={<NumberOfProductsSold />} />
          <Route path="/admin-zmobile-2026/product/addNew" element={<AddNewProductAdmin />} />
          <Route path="/admin-zmobile-2026/product/slide" element={<PagecSlideAdmin />} />
          <Route path="/admin-zmobile-2026/product/update/:id" element={<UpdateProductAdmin />} />
          <Route path="/admin-zmobile-2026/category" element={<CategoryAdmin />} />
          <Route path="/admin-zmobile-2026/users/list" element={<ListUserAdmin />} />

        </Route>

      </Routes>
    </>



  );
}

export default App;
