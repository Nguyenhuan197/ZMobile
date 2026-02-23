// utils/toast.js
import { toast, Bounce } from 'react-toastify';

// "Enum" giả cho type
export const ToastType = {
    success: "success",
    error: "error",
    warn: "warn",
    info: "info"
};

// Hàm showToast
export function ShowToast(content, type) {
    if (!ToastType[type]) type = ToastType.info; // default nếu type sai

    toast[type](content, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
