import { createContext, useEffect, useState } from "react";
import DecodeJWT from "../services/tocken";
import { data, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { ShowToast, ToastType } from "../utils/toast";
export const ThemeContext = createContext(null);
const fetcher = (url) => fetch(url).then((res) => res.json());

export function LocalStorageUserContext({ children }) {
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [USER, SETUSER] = useState(false);
    const navigate = useNavigate();

    const {
        data: DataUser,
        error,
        isLoading: isLoading_User,
        mutate: seloadAPI__USER
    } = useSWR(USER._id ? `${apiUrl}/api/users/view-One/${USER._id}` : null, fetcher);
    const { data: DataAdmin, error: errorAdmin, isLoading: isLoading_Admin } = useSWR(`${apiUrl}/api/infomation-Admin/view`, fetcher);


    useEffect(() => {
        const load = () => {
            const getLocalStorage = localStorage.getItem(KEY_NAME_USER);
            if (!getLocalStorage) return SETUSER(false);
            const handleTocken = DecodeJWT(getLocalStorage);
            SETUSER(handleTocken);
        };

        load();
    }, []);


    const reloading = () => {
        const getLocalStorage = localStorage.getItem(KEY_NAME_USER);
        if (!getLocalStorage) return SETUSER(false);
        const handleTocken = DecodeJWT(getLocalStorage);
        SETUSER(handleTocken);
    };

    const signOutUser = () => {
        localStorage.removeItem(KEY_NAME_USER);
        SETUSER(false);
    };


    // Thanh toán sản phẩm
    const handlePay = (name, price, quantity, activeImg, id) => {
        const dataPay = [
            {
                id,
                name,
                price,
                quantity,
                img: activeImg
            }
        ];

        localStorage.setItem("data-pay", JSON.stringify(dataPay));
        navigate("/pay");
    };

    const handleAddToCart = (name, price, quantity, activeImg, id) => {
        const currentCart = JSON.parse(localStorage.getItem("data-cart")) || [];
        const existingItem = currentCart.find(item => item.id === id);
        let updatedCart;
        if (existingItem) {
            updatedCart = currentCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            const newItem = { name, price, quantity, activeImg, id };
            updatedCart = [...currentCart, newItem];
        }

        localStorage.setItem("data-cart", JSON.stringify(updatedCart));
        navigate("/cart");
        ShowToast('Thêm giỏ hàng thành công', ToastType.success);
    };



    // Hàm lấy dữ liệu giỏ hàng
    const loadingCart = () => {
        const getData = localStorage.getItem("data-cart");
        const data_Json = getData ? JSON.parse(getData) : []; // Tránh lỗi khi null
        return {
            data: data_Json,
            status: data_Json.length > 0,
            count: data_Json.length
        };
    };


    // xoá giỏ hàng
    const removeFromCart = (id) => {
        const currentCart = JSON.parse(localStorage.getItem("data-cart")) || [];
        const updatedCart = currentCart.filter(item => item.id !== id);
        localStorage.setItem("data-cart", JSON.stringify(updatedCart));
    };


    return (
        <ThemeContext.Provider
            value={{
                USER,
                signOutUser,
                reloading,
                handlePay,
                seloadAPI__USER,

                // giỏ hàng
                handleAddToCart,
                loadingCart,
                removeFromCart,


                // Loading User
                DataUser,
                isLoading_User,

                // Loading Admin
                DataAdmin,
                isLoading_Admin
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

