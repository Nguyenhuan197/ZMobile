import React, { useState } from 'react';
import styles from "./orderLookup.module.css";
import { Link } from 'react-router-dom'; // 1. Import hook
import { FiArrowLeft } from 'react-icons/fi'; // Import icon mũi tên



export default function ProjectOrderLookup() {
    const [orderId, setOrderId] = useState('');
    const [orderInfo, setOrderInfo] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (orderId.trim() === "DH123") {
            setOrderInfo({
                productName: "iPhone 15 Pro Max 256GB",
                customer: "Nguyễn Văn A",
                date: "15/02/2026",
                quantity: 1,
                price: "28.990.000đ",
                status: "Đang giao hàng",
                warrantyStatus: "Còn hạn bảo hành (đến 15/02/2027)",
                isWarrantyValid: true
            });
        } else {
            alert("Không tìm thấy đơn hàng! Thử nhập: DH123");
            setOrderInfo(null);
        }
    };

    return (
        <div className={styles.container}>
            <Link to={'/user'} className={styles.backBtn}>
                <FiArrowLeft /> Quay lại
            </Link>


            <div className={styles.searchBox}>
                <h2 className={styles.title}>Tra cứu đơn hàng</h2>
                <form onSubmit={handleSearch} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nhập mã đơn hàng (Ví dụ: DH123)..."
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.searchBtn}>Tra cứu</button>
                </form>
            </div>

            {orderInfo && (
                <div className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                        <h3>Thông tin chi tiết đơn hàng</h3>
                        <span className={styles.statusBadge}>{orderInfo.status}</span>
                    </div>

                    <div className={styles.infoGrid}>
                        {/* ... Giữ nguyên các infoItem của bạn ... */}
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Tên sản phẩm:</span>
                            <span className={styles.value}>{orderInfo.productName}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Người mua:</span>
                            <span className={styles.value}>{orderInfo.customer}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Ngày mua:</span>
                            <span className={styles.value}>{orderInfo.date}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Số lượng:</span>
                            <span className={styles.value}>{orderInfo.quantity}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Giá cả:</span>
                            <span className={styles.value + " " + styles.price}>{orderInfo.price}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Trạng thái bảo hành:</span>
                            <span className={`${styles.value} ${orderInfo.isWarrantyValid ? styles.warrantyActive : styles.warrantyExpired}`}>
                                {orderInfo.warrantyStatus}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}