import { useState, useEffect } from "react";
import styles from "./contactQuickly.module.css";


const fakeOrders = [
    { id: 1, name: "Nguyễn Hương", product: "Oppo A56 5G" },
    { id: 2, name: "Trần Nam", product: "Oppo Reno 6 5G" },
    { id: 3, name: "Anh Tuấn", product: "Realme 10 8/256G" },
    { id: 4, name: "Chị Thảo", product: "Oppo A93 5G" },
    { id: 5, name: "Hoàng Minh", product: "Oppo K9s NEW 99" },
    { id: 6, name: "Khánh Huyền", product: "Oppo Reno 4Z 5G" },
    { id: 7, name: "Lê Văn Tùng", product: "Vivo Y19 Ram 8/256G" },
    { id: 8, name: "Phạm Mỹ Linh", product: "Oppo A97 5G" },
    { id: 9, name: "Đỗ Hùng", product: "Oppo K10X 5G" },
    { id: 10, name: "Minh Thư", product: "Oppo A2X 5G" },
    { id: 11, name: "Văn Thanh", product: "Oppo A56 5G" },
    { id: 12, name: "Thu Trang", product: "Oppo Reno 5 Pro" },
    { id: 13, name: "Nguyễn Bích", product: "Oppo A9 2020" },
    { id: 14, name: "Trần Long", product: "Oppo Reno 6 5G" },
    { id: 15, name: "Bùi Tuyết", product: "Realme 10 8/256G" },
    { id: 16, name: "Hữu Thắng", product: "Oppo K9s NEW 99" },
    { id: 17, name: "Thanh Tâm", product: "Vivo Y19 Ram 8/256G" },
    { id: 18, name: "Quang Huy", product: "Oppo A93 5G" },
    { id: 19, name: "Ngọc Ánh", product: "Oppo A97 5G" },
    { id: 20, name: "Tuấn Kiệt", product: "Oppo K10X 5G" },
    { id: 21, name: "Lan Anh", product: "Oppo A56 5G" },
    { id: 22, name: "Đức Phúc", product: "Oppo Reno 4Z 5G" },
    { id: 23, name: "Hồng Nhung", product: "Oppo A2X 5G" },
    { id: 24, name: "Thế Vinh", product: "Oppo Reno 5 Pro" },
    { id: 25, name: "Mai Phương", product: "Oppo A9 2020" },
    { id: 26, name: "Hoàng Bách", product: "Oppo K9s NEW 99" },
    { id: 27, name: "Thùy Chi", product: "Oppo A93 5G" },
    { id: 28, name: "Quốc Anh", product: "Realme 10 8/256G" },
    { id: 29, name: "Bảo Ngọc", product: "Vivo Y19" },
    { id: 30, name: "Minh Quân", product: "Oppo A97 5G" },
    { id: 31, name: "Cẩm Tú", product: "Oppo Reno 6 5G" },
    { id: 32, name: "Văn Nam", product: "Oppo K10X 5G" },
    { id: 33, name: "Thanh Thảo", product: "Oppo A56 5G" },
    { id: 34, name: "Thành Trung", product: "Oppo Reno 4Z 5G" },
    { id: 35, name: "Kiều Trinh", product: "Oppo A2X 5G" },
    { id: 36, name: "Duy Mạnh", product: "Oppo K9s NEW 99" },
    { id: 37, name: "Hải Yến", product: "Oppo A93 5G" },
    { id: 38, name: "Tuấn Anh", product: "Realme 10 8/256G" },
    { id: 39, name: "Ngọc Diệp", product: "Vivo Y19" },
    { id: 40, name: "Sơn Tùng", product: "Oppo A97 5G" }
];




export default function ContactQuickly() {
    const phone = import.meta.env.VITE_NUMBER_PHONE;
    const [orderIndex, setOrderIndex] = useState(0);
    const [showPop, setShowPop] = useState(false);
    const timeLopp = 17000;

    useEffect(() => {
        const interval = setInterval(() => {
            setShowPop(false); // Ẩn đi để chuẩn bị hiện cái mới

            setTimeout(() => {
                setOrderIndex((prev) => (prev + 1) % fakeOrders.length);
                setShowPop(true); // Hiện cái mới
            }, 500); // Đợi 0.5s cho hiệu ứng ẩn xong rồi mới hiện cái mới

            // Sau 5 giây hiển thị thì tự ẩn đi, chờ đến chu kỳ 10s tiếp theo
            setTimeout(() => setShowPop(false), 5500);

        }, 20000); // Lặp lại mỗi 10 giây

        // Hiển thị lần đầu tiên sau 2s khi load trang
        const firstShow = setTimeout(() => setShowPop(true), timeLopp);

        return () => {
            clearInterval(interval);
            clearTimeout(firstShow);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* Pop-up thông báo đơn hàng */}
            <div className={`${styles.orderNotify} ${showPop ? styles.show : ""}`}>
                <div className={styles.orderAvatar}>
                    {fakeOrders[orderIndex].name.charAt(0)}
                </div>
                <div className={styles.orderText}>
                    <p className={styles.orderName}><strong>{fakeOrders[orderIndex].name}</strong> đã đặt hàng</p>
                    <p className={styles.orderProduct}>{fakeOrders[orderIndex].product}</p>
                </div>
            </div>

            {/* Nút gọi điện cũ của bạn */}
            <div className={styles.contactContainer}>
                <div className={styles.pulseNode}></div>
                <a href={`tel:${phone}`} className={styles.block}>
                    <span className={styles.phoneNumber}>{phone}</span>
                    <div className={styles.iconCircle}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
}