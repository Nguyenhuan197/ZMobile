import { useState } from "react";
import { FiSearch, FiPackage, FiArrowLeft, FiAlertCircle, FiHash, FiTag, FiTruck, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import { formatPrice } from "../../../../utils/formatPrice.JS";
import styles from "../../Css__Admin.module.css";
import UiLoadingComponent from "../../../../components/loadingComponent";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";

export default function SearchOrderAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();

    const [orderIdInput, setOrderIdInput] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const statusConfig = {
        'Awaiting confirmation': { label: 'Chờ xác nhận', color: '#f39c12', bg: '#fff9db' },
        'Processing': { label: 'Đang xử lý', color: '#3498db', bg: '#e7f5ff' },
        'Shipping': { label: 'Đang vận chuyển', color: '#9b59b6', bg: '#f3f0ff' },
        'Delivered': { label: 'Đã giao hàng', color: '#27ae60', bg: '#ebfbee' },
        'Cancelled': { label: 'Huỷ đơn hàng', color: 'red', bg: '#fff5f5' },
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        const id = orderIdInput.trim();
        if (!id) return;

        setIsLoading(true);
        setError("");
        setOrderData(null);

        try {
            const result = await GetAPI_Authorization(
                `${apiUrl}/api/order/serch-order-item/${id}`
            );

            if (result?.status && result.data) {
                setOrderData(result.data);
            } else {
                setError("Mã đơn hàng không tồn tại hoặc dữ liệu không hợp lệ.");
            }
        } catch (err) {
            setError("Lỗi kết nối hệ thống. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.mainContent}>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />
                <main style={{ flex: 1, padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', transition: '0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
                        >
                            <FiArrowLeft size={20} color="#64748b" />
                        </button>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#1e293b' }}>Tra cứu thông tin đơn hàng</h2>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Nhập mã đơn hàng để truy xuất dữ liệu từ hệ thống</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <FiHash style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="Nhập chính xác mã đơn hàng (ID)..."
                                    value={orderIdInput}
                                    onChange={(e) => setOrderIdInput(e.target.value)}
                                    style={{ width: '100%', height: '54px', paddingLeft: '48px', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none', transition: '0.3s', backgroundColor: '#f8fafc' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{ padding: '0 35px', borderRadius: '14px', border: 'none', background: '#1e293b', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: '0.3s' }}
                            >
                                Truy vấn
                            </button>
                        </form>
                    </div>

                    {/* Content Section */}
                    {isLoading && <UiLoadingComponent />}

                    {error && (
                        <div style={{ padding: '20px', background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '15px', color: '#c53030', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
                            <FiAlertCircle size={22} /> {error}
                        </div>
                    )}

                    {orderData && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '25px', animation: 'fadeIn 0.5s ease' }}>

                            {/* Left Column: Product Image */}
                            <div style={{ background: '#fff', padding: '20px', borderRadius: '25px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                <div style={{ marginBottom: '15px', fontSize: '14px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Ảnh sản phẩm</div>
                                <img
                                    src={orderData.id_product?.img?.secure_url}
                                    style={{ width: '100%', aspectRatio: '1/1', borderRadius: '20px', objectFit: 'cover', border: '4px solid #f8fafc' }}
                                    alt="product"
                                />
                                <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '15px' }}>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>Trạng thái vận chuyển</div>
                                    <div style={{
                                        marginTop: '8px', padding: '8px 15px', borderRadius: '10px', display: 'inline-block', fontWeight: '800', fontSize: '14px',
                                        color: statusConfig[orderData.statusOrder]?.color,
                                        background: statusConfig[orderData.statusOrder]?.bg
                                    }}>
                                        <FiTruck style={{ marginRight: '8px' }} />
                                        {statusConfig[orderData.statusOrder]?.label}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Order Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                {/* General Info Card */}
                                <div style={{ background: '#fff', padding: '30px', borderRadius: '25px', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#1e293b' }}>
                                        <FiInfo size={20} />
                                        <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Thông tin chi tiết</h4>
                                    </div>

                                    <div style={infoRowStyle}>
                                        <span style={labelStyle}>Mã đơn hàng:</span>
                                        <span style={{ fontWeight: '700', color: '#1e293b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontFamily: 'monospace' }}>
                                            {orderData._id}
                                        </span>
                                    </div>

                                    <div style={infoRowStyle}>
                                        <span style={labelStyle}>Tên sản phẩm:</span>
                                        <span style={{ fontWeight: '700', color: '#1e293b', textAlign: 'right' }}>{orderData.id_product?.name}</span>
                                    </div>

                                    <div style={infoRowStyle}>
                                        <span style={labelStyle}>Mã sản phẩm (ID):</span>
                                        <span style={{ color: '#64748b' }}>{orderData.id_product?._id}</span>
                                    </div>

                                    <div style={{ ...infoRowStyle, borderBottom: 'none', marginTop: '10px' }}>
                                        <span style={labelStyle}>Giá bán lúc mua:</span>
                                        <span style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444' }}>
                                            {formatPrice(orderData.priceAtPurchase)}
                                        </span>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '20px', border: '1px solid #dcfce7', display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ background: '#22c55e', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <FiTag />
                                    </div>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#166534', lineHeight: '1.5' }}>
                                        Dữ liệu này được truy xuất trực tiếp từ cơ sở dữ liệu thời gian thực. Đảm bảo bạn đã kiểm tra kỹ mã đơn hàng trước khi hỗ trợ khách hàng.
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}

                    {!orderData && !isLoading && !error && (
                        <div style={{ textAlign: 'center', marginTop: '80px', padding: '40px', border: '2px dashed #e2e8f0', borderRadius: '30px' }}>
                            <FiPackage size={60} color="#cbd5e1" style={{ marginBottom: '20px' }} />
                            <h3 style={{ color: '#94a3b8', margin: '0 0 10px 0' }}>Sẵn sàng tra cứu</h3>
                            <p style={{ color: '#cbd5e1', margin: 0 }}>Nhập mã ID đơn hàng vào ô phía trên để bắt đầu hiển thị thông tin.</p>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

// Tái sử dụng styles để code sạch hơn
const infoRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #f1f5f9'
};

const labelStyle = {
    color: '#64748b',
    fontSize: '15px',
    fontWeight: '500'
};