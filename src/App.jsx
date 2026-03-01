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
import { useContext, useEffect, useState } from "react";
import ProductAdmin from "./admin/page/Product";
import CategoryAdmin from "./admin/page/Category";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import User from "./client/page/user";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./context/useThemeContext";
import useSWR from "swr";
import UiLoadingComponent from "./components/loadingComponent";
import Trademark from "./client/page/trademark";
import ContactQuickly from "./client/components/ui/contact/page";
import ScrollToTop from "./scrollToTop";
const fetcher = (url) => fetch(url).then((res) => res.json());


function App() {
  const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
  const [statusUser, setStatusUser] = useState("Cline");
  const { USER, signOutUser } = useContext(ThemeContext);
  const { data, error, isLoading } = useSWR(USER._id ? `${apiUrl}/api/users/view-One/${USER._id}` : null, fetcher);




  useEffect(() => {
    const checks = () => {
      if (USER._id) {
        if (data) {
          if (data.data.role === 'Admin') {
            setStatusUser(data.data.role)
          } else {
            setStatusUser('Cline');
          }
        }

      } else {
        setStatusUser('Cline');
      }
    }

    checks();


  }, [USER, data]);


  if (isLoading) return <UiLoadingComponent />

  return (
    <>
      <ScrollToTop />

      <ToastContainer
        position="top-left"
        autoClose={3000}
        style={{ top: '120px', marginRight: "10px" }}
      />

      <ContactQuickly />

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

        {/* Admin Routes (Chỉ Admin mới xem được) */}
        <Route element={<ProtectedRoute isAllowed={statusUser === "Admin"} />}>
          <Route path="/admin-zmobile-2026/product" element={<ProductAdmin />} />
          <Route path="/admin-zmobile-2026/category" element={<CategoryAdmin />} />
        </Route>

        {/* Trang Login cho Admin */}
        <Route path="/login-admin" element={<LoginAdmin />} />
      </Routes>
    </>



  );
}

export default App;
