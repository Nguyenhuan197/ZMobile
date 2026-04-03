import React, { useState } from 'react';
import styles from "./orderLookup.module.css";
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiPackage } from 'react-icons/fi'; // Thêm icon cho đẹp



export default function ProjectOrderLookup() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [orderId, setOrderId] = useState('');
    const [orderInfo, setOrderInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;
        setLoading(true);


        try {
            const response = await fetch(`${apiUrl}/api/order/serch-order-item/${orderId.trim()}`);
            const result = await response.json();

            if (result.status && result.data) {
                setOrderInfo(result.data);
            } else {
                alert("Không tìm thấy đơn hàng!");
                setOrderInfo(null);
            }
        } catch (error) {
            console.error("Lỗi tra cứu:", error);
            alert("Có lỗi xảy ra khi kết nối máy chủ!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Link to={'/user'} className={styles.backBtn}>
                <FiArrowLeft /> Quay lại tài khoản
            </Link>

            <div className={styles.searchBox}>
                <h2 className={styles.title}>Tra cứu đơn hàng</h2>
                <p className={styles.subtitle}>Nhập mã đơn hàng để kiểm tra thông tin sản phẩm và trạng thái mua hàng</p>
                <form onSubmit={handleSearch} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Nhập mã đơn hàng (VD: 69ce23...)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.searchBtn} disabled={loading}>
                        {loading ? 'Đang tìm...' : 'Tra cứu ngay'}
                    </button>
                </form>
            </div>

            {orderInfo && (
                <div className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                        <div className={styles.headerTitle}>
                            <FiPackage className={styles.packageIcon} />
                            <h3>Thông tin sản phẩm đã mua</h3>
                        </div>
                        <span className={styles.statusBadge}>Giao dịch thành công</span>
                    </div>

                    <div className={styles.productMainInfo}>
                        <img
                            src={orderInfo.id_product?.img?.secure_url}
                            alt={orderInfo.id_product?.name}
                            className={styles.productImg}
                        />
                        <div className={styles.productTexts}>
                            <h4 className={styles.productName}>{orderInfo.id_product?.name}</h4>
                            <p className={styles.orderIdText}>Mã đơn: {orderInfo._id}</p>
                        </div>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Giá lúc mua:</span>
                            <span className={`${styles.value} ${styles.price}`}>
                                {orderInfo.priceAtPurchase?.toLocaleString()}đ
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Giá hiện tại:</span>
                            <span className={styles.value}>
                                {orderInfo.id_product?.price?.toLocaleString()}đ
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Trạng thái:</span>
                            <span className={`${styles.value} ${styles.warrantyActive}`}>
                                Đã xác nhận hệ thống
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}