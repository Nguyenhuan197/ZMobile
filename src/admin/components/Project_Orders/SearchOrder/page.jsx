import { useState } from "react";
import { FiSearch, FiPackage, FiArrowLeft, FiAlertCircle, FiHash, FiTruck, FiUser, FiMapPin, FiPhone, FiMail, FiCalendar, FiCheckCircle, FiClock, FiShield, FiShoppingBag } from "react-icons/fi";
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
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const statusConfig = {
        'Awaiting confirmation': { label: 'Chờ xác nhận', color: '#f39c12', bg: '#fff9db', icon: <FiClock /> },
        'Processing': { label: 'Đang xử lý', color: '#3498db', bg: '#e7f5ff', icon: <FiShield /> },
        'Shipping': { label: 'Đang vận chuyển', color: '#9b59b6', bg: '#f3f0ff', icon: <FiTruck /> },
        'Delivered': { label: 'Đã giao hàng', color: '#27ae60', bg: '#ebfbee', icon: <FiCheckCircle /> },
        'Cancelled': { label: 'Huỷ đơn hàng', color: '#e74c3c', bg: '#fff5f5', icon: <FiAlertCircle /> },
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        const id = orderIdInput.trim();
        if (!id) return;

        setIsLoading(true);
        setError("");
        setOrderData(null);
        setUserData(null);

        try {
            const userId = "6999b03b8ebf1e4f0dd57d18";
            const result = await GetAPI_Authorization(`${apiUrl}/api/order/Admin-serch-order-item/${userId}/${id}`);

            if (result?.status && result.data) {
                setOrderData(result.data.dataOrder);
                setUserData(result.data.dataUser);
            } else {
                setError("Mã đơn hàng không tồn tại trên hệ thống ZMobile.");
            }
        } catch (err) {
            setError("Lỗi kết nối Server hoặc phiên làm việc hết hạn.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.mainContent}>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
                <AdminMenu />
                <main style={{ flex: 1, padding: '30px 40px', maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={headerContainer}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <button onClick={() => navigate(-1)} style={backBtnStyle}><FiArrowLeft /></button>
                            <div>
                                <h1 style={titleStyle}>Tra cứu vận đơn chuyên sâu</h1>
                                <p style={subTitleStyle}>Quản lý và truy xuất dữ liệu đơn hàng thời gian thực</p>
                            </div>
                        </div>
                    </div>

                    <div style={searchCardStyle}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <FiSearch style={searchIconInner} />
                                <input
                                    type="text"
                                    placeholder="Nhập chính xác mã mục đơn hàng (e.g. 26040391061...)"
                                    value={orderIdInput}
                                    onChange={(e) => setOrderIdInput(e.target.value)}
                                    style={inputSearchStyle}
                                />
                            </div>
                            <button type="submit" style={btnSearchStyle}>
                                <FiShield style={{ marginRight: '8px' }} /> Kiểm tra & Tìm kiếm đơn hàng
                            </button>
                        </form>
                    </div>

                    {isLoading && <UiLoadingComponent />}
                    {error && <div style={errorBanner}><FiAlertCircle size={20} /> {error}</div>}

                    {orderData && (
                        <div style={gridMain}>
                            <div style={columnStyle}>
                                <section style={cardContainer}>
                                    <div style={cardHeader}><FiShoppingBag color="#3b82f6" /> Sản phẩm & Trạng thái</div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={imageWrapper}>
                                            <img src={orderData.id_product?.img?.secure_url} style={imgStyle} alt="product" />
                                        </div>
                                        <div style={{
                                            ...statusBadge,
                                            color: statusConfig[orderData.statusOrder]?.color,
                                            backgroundColor: statusConfig[orderData.statusOrder]?.bg
                                        }}>
                                            {statusConfig[orderData.statusOrder]?.icon}
                                            <span>{statusConfig[orderData.statusOrder]?.label}</span>
                                        </div>

                                        <div style={infoList}>
                                            <div style={infoItemInline}>
                                                <span style={textLabel}>Mã vận đơn:</span>
                                                <span style={textValueMono}>{orderData._id}</span>
                                            </div>

                                            <div style={infoItemInline}>
                                                <span style={textLabel}>Cập nhật cuối:</span>
                                                <span style={textValue}>{new Date(userData.updatedAt).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* COLUMN 2: ORDER DETAILS */}
                            <div style={columnStyle}>
                                <section style={cardContainer}>
                                    <div style={cardHeader}><FiPackage color="#8b5cf6" /> Chi tiết giao dịch</div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={detailRow}>
                                            <p style={textLabel}>Tên mặt hàng</p>
                                            <p style={productNameText}>{orderData.id_product?.name}</p>
                                            <p>Giá bán {formatPrice(orderData.id_product.price)} </p>
                                            <p>Phí vận chuyển {formatPrice(30000)} </p>
                                        </div>

                                        <div style={paymentCard}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: '600' }}>Thanh toán:</span>
                                                <span style={payMethodTag}>{orderData.id_order?.paymentMethod}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <span style={textLabel}>Tổng cộng:</span>
                                                <span style={priceLarge}>{formatPrice(orderData.priceAtPurchase + 30000)}</span>
                                            </div>
                                        </div>

                                        <div style={divider}></div>

                                        <div style={infoList}>
                                            <div style={infoItemInline}>
                                                <span style={textLabel}><FiHash /> ID Đơn tổng:</span>
                                                <span style={{ fontSize: '12px', color: '#64748b' }}>{orderData.id_order?._id}</span>
                                            </div>
                                            <div style={infoItemInline}>
                                                <span style={textLabel}><FiCalendar /> Ngày tạo:</span>
                                                <span style={textValue}>12/03/2026</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* COLUMN 3: CUSTOMER INTELLIGENCE */}
                            <div style={columnStyle}>
                                <section style={cardContainer}>
                                    <div style={cardHeader}><FiUser color="#10b981" /> Thông tin khách hàng</div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={userHeader}>
                                            <div style={avatarCircle}>{userData?.name?.charAt(0)}</div>
                                            <div>
                                                <h3 style={userNameDisplay}>{userData?.name}</h3>
                                                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Customer ID: {userData?._id}</p>
                                            </div>
                                        </div>

                                        <div style={contactGrid}>
                                            <a href={`tel:${userData?.phone}`} style={contactTile}>
                                                <FiPhone /> <span>{userData?.phone}</span>
                                            </a>
                                            <div style={contactTile}>
                                                <FiMail /> <span style={{ fontSize: '12px' }}>{userData?.email}</span>
                                            </div>
                                        </div>

                                        <div style={addressBoxPro}>
                                            <div style={addressHeader}>
                                                <FiMapPin /> ĐỊA CHỈ GIAO HÀNG
                                            </div>
                                            <p style={addressText}>{userData?.deliveryAddress}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    )}

                    {!orderData && !isLoading && !error && (
                        <div style={emptyContainer}>
                            <div style={emptyIllustration}>
                                <FiSearch size={40} color="#6366f1" />
                            </div>
                            <h3>Hệ thống sẵn sàng</h3>
                            <p>Vui lòng nhập mã vận đơn để bắt đầu kiểm tra luồng dữ liệu.</p>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

// --- STYLING SYSTEM ---
const headerContainer = { marginBottom: '30px' };
const titleStyle = { margin: 0, fontSize: '28px', fontWeight: '850', color: '#1e293b', letterSpacing: '-0.5px' };
const subTitleStyle = { margin: 0, color: '#64748b', fontSize: '15px' };

const backBtnStyle = {
    width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0',
    background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '20px', color: '#475569', transition: 'all 0.2s'
};

const searchCardStyle = {
    background: '#fff', padding: '12px', borderRadius: '18px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)', marginBottom: '35px',
    border: '1px solid rgba(226, 232, 240, 0.8)'
};

const inputSearchStyle = {
    width: '100%', height: '54px', paddingLeft: '50px', borderRadius: '14px',
    border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none',
    backgroundColor: '#f8fafc', transition: 'border 0.2s'
};

const btnSearchStyle = {
    padding: '0 30px', borderRadius: '14px', border: 'none',
    background: 'tomato', color: '#fff', fontWeight: '700',
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    fontSize: '16px'
};

const searchIconInner = { position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' };

const gridMain = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', animation: 'fadeIn 0.5s ease-out' };
const columnStyle = { display: 'flex', flexDirection: 'column' };

const cardContainer = {
    background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
    height: '100%', overflow: 'hidden'
};

const cardHeader = {
    padding: '18px 24px', background: '#fff', borderBottom: '1px solid #f1f5f9',
    fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px'
};

const imageWrapper = {
    padding: '10px', background: '#f8fafc', borderRadius: '20px', marginBottom: '20px',
    border: '1px solid #f1f5f9'
};

const imgStyle = { width: '70%', marginLeft: '15%', aspectRatio: '1/1', borderRadius: '16px', objectFit: 'cover' };

const statusBadge = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding: '12px', borderRadius: '14px', fontWeight: '850', fontSize: '14px', textTransform: 'uppercase'
};

const infoList = { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' };
const infoItemInline = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const textLabel = { fontSize: '13px', color: '#94a3b8', fontWeight: '600' };
const textValue = { fontSize: '14px', color: '#1e293b', fontWeight: '700' };
const textValueMono = { fontSize: '13px', color: '#4f46e5', fontWeight: '700', fontFamily: 'monospace', background: '#eef2ff', padding: '2px 8px', borderRadius: '6px' };

const detailRow = { marginBottom: '20px' };
const productNameText = { fontSize: '17px', fontWeight: '800', color: '#1e293b', lineHeight: '1.4', margin: '5px 0 0 0' };

const paymentCard = {
    background: '#1e293b', padding: '20px', borderRadius: '20px', color: '#fff',
    boxShadow: '0 10px 20px rgba(30, 41, 59, 0.2)', marginBottom: '20px'
};

const payMethodTag = { background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' };
const priceLarge = { fontSize: '28px', fontWeight: '900', color: '#fbbf24' };
const divider = { height: '1px', background: '#f1f5f9', width: '100%' };

const userHeader = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' };
const avatarCircle = {
    width: '56px', height: '56px', borderRadius: '18px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px', fontWeight: '800'
};
const userNameDisplay = { margin: 0, fontSize: '19px', fontWeight: '850', color: '#1e293b' };

const contactGrid = { display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '20px' };
const contactTile = {
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px',
    background: '#f8fafc', borderRadius: '14px', color: '#475569', fontWeight: '700',
    fontSize: '14px', textDecoration: 'none', border: '1px solid #f1f5f9'
};

const addressBoxPro = {
    padding: '20px', background: 'linear-gradient(to bottom right, #fffcf0, #fff9e6)',
    borderRadius: '18px', border: '1px solid #fef3c7'
};
const addressHeader = { fontSize: '11px', fontWeight: '800', color: '#d97706', letterSpacing: '1px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' };
const addressText = { margin: 0, fontSize: '14px', color: '#92400e', fontWeight: '600', lineHeight: '1.6' };

const errorBanner = { padding: '16px 24px', background: '#fef2f2', color: '#dc2626', borderRadius: '16px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', border: '1px solid #fecaca' };
const emptyContainer = { textAlign: 'center', padding: '100px 0', color: '#94a3b8' };
const emptyIllustration = { width: '80px', height: '80px', background: '#eef2ff', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' };