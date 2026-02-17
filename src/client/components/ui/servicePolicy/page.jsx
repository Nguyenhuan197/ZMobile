import React from 'react';
import styles from "./servicePolicy.module.css";

const policies = [
    {
        id: 1,
        title: "Đổi trả trong 7 ngày",
        image: "https://cdn-icons-png.flaticon.com/512/3502/3502153.png",
        description: "Lỗi là đổi mới ngay"
    },
    {
        id: 2,
        title: "Bảo hành 6 tháng",
        image: "https://cdn-icons-png.flaticon.com/512/3159/3159614.png",
        description: "Hỗ trợ sửa chữa tận tâm"
    },
    {
        id: 3,
        title: "Giao hàng miễn phí toàn quốc",
        image: "https://cdn-icons-png.flaticon.com/512/2311/2311514.png",
        description: "Cho đơn hàng từ 500k"
    },
    {
        id: 4,
        title: "Thu cũ đổi mới",
        image: "https://cdn-icons-png.flaticon.com/512/2898/2898588.png",
        description: "Trợ giá lên đời cực tốt"
    }
];

export default function ServicePolicy() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>
                    <span className={styles.icon}>🍉 Chính sách ưu đãi</span>
                </h3>
            </div>

            <div className={styles.grid}>
                {policies.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imageBox}>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.name}>{item.title}</h4>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}