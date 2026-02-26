import { createContext, useEffect, useState } from "react";
import DecodeJWT from "../services/tocken";
import { useNavigate } from "react-router-dom";
export const ThemeContext = createContext(null);


export function LocalStorageUserContext({ children }) {
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [USER, SETUSER] = useState(false);
    const navigate = useNavigate();

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

    // Mua nhanh
    const handlePage = (name, price, quantity, activeImg) => {
        const dataPay = { name, price, quantity, activeImg }
        localStorage.setItem("data-pay", JSON.stringify(dataPay));
        navigate("/pay");
    }


    return (
        <ThemeContext.Provider
            value={{
                USER,
                signOutUser,
                reloading,
                handlePage
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

