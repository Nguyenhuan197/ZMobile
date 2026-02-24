import { createContext, useEffect, useState } from "react";
import DecodeJWT from "../services/tocken";
export const ThemeContext = createContext(null);


export function LocalStorageUserContext({ children }) {
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [USER, SETUSER] = useState(false);

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

    return (
        <ThemeContext.Provider
            value={{
                USER,
                signOutUser,
                reloading
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

