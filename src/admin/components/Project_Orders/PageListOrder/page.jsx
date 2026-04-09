import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import { FiSearch, FiEye, FiCopy, FiPackage, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import { formatPrice } from "../../../../utils/formatPrice.JS";
import styles from "../../Css__Admin.module.css";
import UiLoadingComponent from "../../../../components/loadingComponent";
import { ShowToast, ToastType } from "../../../../utils/toast";
import { UpdateSevicesNo__JSON__ADMIN } from "../../../../services/updateApi";



export default function ListOrderAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { DataUser } = useContext(ThemeContext);
    const navigate = useNavigate();

    // --- STATES ---
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState('All');
    const [hoveredRow, setHoveredRow] = useState(null);

    // Quản lý hiển thị Update
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const statusConfig = {
        'All': { label: 'Tất cả đơn', color: '#1a1a1a', bg: '#f1f3f5' },
        'Awaiting confirmation': { label: 'Chờ xác nhận', color: '#f39c12', bg: '#fff9db' },
        'Processing': { label: 'Đang xử lý', color: '#3498db', bg: '#e7f5ff' },
        'Shipping': { label: 'Đang vận chuyển', color: '#9b59b6', bg: '#f3f0ff' },
        'Delivered': { label: 'Đã giao hàng', color: '#27ae60', bg: '#ebfbee' },
        'Cancelled': { label: 'Huỷ đơn hàng', color: 'red', bg: '#fff5f5' },
    };


    const loadOrders = useCallback(async () => {
        if (!DataUser?.data?._id) return;
        setIsLoading(true);
        try {
            const result = await GetAPI_Authorization(`${apiUrl}/api/order/Admin-viewAll/${DataUser.data._id}?statusOrder=${status}`);
            if (result?.status) {
                setOrders(result.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng:", error);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, DataUser?.data?._id, status]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);


    const handleUpdateStatus = async (newStatus) => {
        if (!selectedOrder) return;
        setIsLoading(true);

        try {
            const result = await UpdateSevicesNo__JSON__ADMIN(`${apiUrl}/api/order/Admin-state-Transition/6999b03b8ebf1e4f0dd57d18/${selectedOrder?._id}?statusOrder=${newStatus}`, 'PUT');
            if (result?.status) {
                ShowToast("Chuyển đổi trạng thái thành công", ToastType.success);
                setDisplayUpdate(false);
                loadOrders();
            } else {
                ShowToast(result?.message || "Chuyển đổi trạng thái thất bại", ToastType.error);
            }

        } catch (error) {
            ShowToast("Lỗi hệ thống", ToastType.error);

        } finally {
            setIsLoading(false);
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(item => {
            const search = searchTerm.toLowerCase();
            const productName = item.id_product?.name?.toLowerCase() || "";
            const orderId = item._id.toLowerCase();
            return productName.includes(search) || orderId.includes(search);
        });
    }, [orders, searchTerm]);


    const handleCopyId = (id) => {
        navigator.clipboard.writeText(id);
        ShowToast("Sao chép mã thành công", ToastType.success);
    };

    return (
        <div className={styles.mainContent}>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main style={{ flex: 1, padding: '30px', maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                            {displayUpdate ? "Chỉnh sửa trạng thái" : `Đơn hàng (${orders.length})`}
                        </h3>
                        {!displayUpdate && (
                            <button onClick={loadOrders} style={primaryBtnStyle}>Tải lại dữ liệu</button>
                        )}
                    </div>

                    {displayUpdate ? (
                        /* ================= KHU VỰC UPDATE ================= */
                        <div style={containerStyle}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <p style={{ color: '#64748b', fontSize: '14px' }}>Đang thực hiện cho mã đơn:</p>
                                <h4 style={{ fontSize: '20px', color: '#1e293b' }}>#{selectedOrder?._id.toUpperCase()}</h4>
                                <p style={{ fontWeight: '600', color: '#334155' }}>Sản phẩm: {selectedOrder?.id_product?.name}</p>
                            </div>

                            <div style={gridStatusStyle}>
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    key !== 'All' && (
                                        <button
                                            key={key}
                                            onClick={() => handleUpdateStatus(key)}
                                            style={{
                                                ...statusOptionBtn,
                                                backgroundColor: value.bg,
                                                color: value.color,
                                                border: selectedOrder?.statusOrder === key ? `2px solid ${value.color}` : '2px solid transparent'
                                            }}
                                        >
                                            {value.label}
                                        </button>
                                    )
                                ))}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button onClick={() => setDisplayUpdate(false)} style={cancelBtnStyle}>
                                    <FiArrowLeft /> Quay lại danh sách
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ================= KHU VỰC DANH SÁCH ================= */

                        <>
                            {/* Bộ lọc Tab */}
                            <div style={tabContainerStyle}>
                                {Object.entries(statusConfig).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setStatus(key)}
                                        style={{
                                            ...tabBtnStyle,
                                            backgroundColor: status === key ? value.color : '#fff',
                                            color: status === key ? '#fff' : '#64748b',
                                            border: status === key ? `1px solid ${value.color}` : '1px solid #e2e8f0',
                                        }}
                                    >
                                        {value.label}
                                    </button>
                                ))}
                            </div>

                            {/* Ô tìm kiếm */}
                            <div style={{ position: 'relative', marginBottom: '30px' }}>
                                <FiSearch style={searchIconStyle} size={20} />
                                <input
                                    type="text"
                                    placeholder="Tìm theo mã hoặc tên sản phẩm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={inputSearchStyle}
                                />
                            </div>

                            {/* Bảng dữ liệu */}
                            <div style={tableWrapperStyle}>
                                {isLoading ? <UiLoadingComponent /> : (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead style={{ backgroundColor: '#f8fafc' }}>
                                            <tr>
                                                <th style={headerCellStyle}>Sản phẩm</th>
                                                <th style={headerCellStyle}>Mã Đơn</th>
                                                <th style={headerCellStyle}>Copy mã đơn</th>
                                                <th style={headerCellStyle}>Giá trị</th>
                                                <th style={headerCellStyle}>Trạng thái</th>
                                                <th style={{ ...headerCellStyle, textAlign: 'center' }}>Xem</th>
                                                <th style={{ ...headerCellStyle, textAlign: 'center' }}>Đổi trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredOrders.map((item, index) => (
                                                <tr
                                                    key={item._id}
                                                    onMouseEnter={() => setHoveredRow(index)}
                                                    onMouseLeave={() => setHoveredRow(null)}
                                                    style={{ backgroundColor: hoveredRow === index ? '#f8fafc' : 'transparent', borderBottom: '1px solid #f1f5f9' }}
                                                >
                                                    <td style={bodyCellStyle}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <img src={item.id_product?.img?.secure_url} style={imgStyle} alt="" />
                                                            <div style={{ fontWeight: '700', color: '#334155' }}>{item.id_product?.name}</div>
                                                        </div>
                                                    </td>
                                                    <td style={bodyCellStyle}>#{item.shippingCode}</td>
                                                    <td onClick={() => handleCopyId(item._id)}
                                                        style={{ padding: '5px 10px', color: '#0f8031', cursor: 'pointer', fontSize: '16px' }}
                                                    >
                                                        Sao chép
                                                    </td>
                                                    <td style={{ ...bodyCellStyle, color: 'red', fontWeight: '800' }}>{formatPrice(item.id_product?.price)}</td>
                                                    <td style={bodyCellStyle}>
                                                        <span style={{
                                                            padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                                                            backgroundColor: statusConfig[item.statusOrder]?.bg, color: statusConfig[item.statusOrder]?.color
                                                        }}>
                                                            {statusConfig[item.statusOrder]?.label}
                                                        </span>
                                                    </td>
                                                    <td style={{ ...bodyCellStyle, textAlign: 'center' }}>
                                                        <div onClick={() => navigate(`/admin/order-detail/${item._id}`)}
                                                            style={{
                                                                color: 'white', fontSize: '15px',
                                                                width: 'auto', textAlign: 'center',
                                                                background: 'green  ', padding: '6px 10px',
                                                                borderRadius: '4px', cursor: 'pointer'
                                                            }}
                                                        >
                                                            Xem chi tiết
                                                        </div>
                                                    </td>
                                                    <td style={{ ...bodyCellStyle, textAlign: 'center' }}>
                                                        <button
                                                            onClick={() => { setSelectedOrder(item); setDisplayUpdate(true); }}
                                                            style={actionUpdateBtnStyle}
                                                        >
                                                            Chuyển đổi
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {!isLoading && filteredOrders.length === 0 && (
                                    <div style={{ padding: '60px', textAlign: 'center' }}><FiPackage size={40} /><p>Trống</p></div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

// --- STYLES ---
const headerCellStyle = { padding: '18px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' };
const bodyCellStyle = { padding: '16px 24px' };
const containerStyle = { backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const gridStatusStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' };
const statusOptionBtn = { padding: '20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '800', transition: '0.2s', fontSize: '14px' };
const primaryBtnStyle = { backgroundColor: '#037e22', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' };
const cancelBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' };
const tabContainerStyle = { display: 'flex', gap: '8px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px' };
const tabBtnStyle = { padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap' };
const inputSearchStyle = { width: '100%', maxWidth: '500px', height: '48px', paddingLeft: '50px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' };
const searchIconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' };
const tableWrapperStyle = { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' };
const imgStyle = { width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' };
const eyeBtnStyle = { background: '#1e293b', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' };
const actionUpdateBtnStyle = { background: 'tomato', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' };