

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Thêm hiệu ứng cuộn mượt
        });
    }, [pathname]); // Hàm này sẽ chạy mỗi khi pathname thay đổi

    return null; // Component này không hiển thị gì cả
};

export default ScrollToTop;