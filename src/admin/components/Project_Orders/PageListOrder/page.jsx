import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiSearch, FiEye, FiPackage, FiTruck, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UiLoadingComponent from '../../../../components/loadingComponent';

export default function ListOrderAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");



    // Hàm lấy danh sách đơn hàng
    const loadOrders = useCallback(async () => {
        if (!USER?._id) return;
        setIsLoading(true);
        try {
            // Sử dụng API viewAll
            const response = await fetch(`${apiUrl}/api/order/Admin__viewAll`, {
                method: 'GET', // Hoặc POST tùy theo Backend của bạn quy định cho endpoint này
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            if (result && result.data) {
                setOrders(result.data);
            }
        } catch (err) {
            console.error("Lỗi lấy danh sách đơn hàng:", err);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, USER?._id]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    // Định dạng tiền tệ VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Hàm xử lý hiển thị Label trạng thái
    const renderStatusBadge = (status) => {
        const statusMap = {
            "Awaiting confirmation": { text: "Chờ xác nhận", color: "#f39c12", bg: "#fef5e7" },
            "Processing": { text: "Đang xử lý", color: "#3498db", bg: "#ebf5fb" },
            "Shipped": { text: "Đang giao", color: "#9b59b6", bg: "#f5eef8" },
            "Delivered": { text: "Đã giao", color: "#27ae60", bg: "#e9f7ef" },
            "Cancelled": { text: "Đã hủy", color: "#e74c3c", bg: "#fdedec" }
        };
        const config = statusMap[status] || { text: status, color: "#7f8c8d", bg: "#f2f4f4" };

        return (
            <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: config.color,
                backgroundColor: config.bg,
                border: `1px solid ${config.color}40`
            }}>
                {config.text}
            </span>
        );
    };

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />
                <main className={styles.mainContent}>
                    {isLoading ? <UiLoadingComponent /> : (
                        <>
                            <div className={styles.headerPage}>
                                <h1>Quản lý đơn hàng</h1>
                                <div className={styles.filterSection}>
                                    <div className={styles.searchBox}>
                                        <FiSearch className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Tìm mã đơn, tên, SĐT..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.tableResponsive}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th>Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Tổng tiền</th>
                                            <th>Thanh toán</th>
                                            <th>Trạng thái</th>
                                            <th style={{ textAlign: 'center' }}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td><span style={{ fontWeight: '600', fontSize: '12px' }}>#{order._id.toUpperCase()}</span></td>
                                                <td>{order.shippingInfo.recipientName}</td>
                                                <td>{order.shippingInfo.phone}</td>
                                                <td style={{ color: '#ee4d2d', fontWeight: 'bold' }}>{formatPrice(order.totalPrice)}</td>
                                                <td><small>{order.paymentMethod}</small></td>
                                                <td>{renderStatusBadge(order.statusOrder)}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => navigate(`/admin/order-detail/${order._id}`)}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            padding: '6px 12px',
                                                            backgroundColor: '#1a1a1a',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px',
                                                            transition: '0.3s'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ee4d2d'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                                                    >
                                                        <FiEye /> Xem chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}