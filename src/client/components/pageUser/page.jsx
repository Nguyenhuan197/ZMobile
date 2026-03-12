import React, { useContext, useEffect, useState } from "react";
import styles from "./userComponent.module.css";
import {
    FaUserCircle, FaClipboardList, FaSearchLocation,
    FaUserEdit, FaLock, FaSignOutAlt, FaShoppingBag,
    FaCheckCircle, FaTimesCircle, FaChevronLeft, FaTruck
} from "react-icons/fa";
import { ThemeContext } from "../../../context/useThemeContext";
import UiLoadingComponent from "../../../components/loadingComponent";
import { Link, useNavigate } from "react-router-dom";
import { UpdateSevices } from "../../../services/updateApi";
import { ShowToast, ToastType } from "../../../utils/toast";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());



export default function UserComponent() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER, signOutUser, DataUser, isLoading_User, seloadAPI__USER } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [id_Item, setidItem] = useState('#');

    // API 1: Lấy danh sách đơn hàng
    const { data: dataListOrder, isLoading: isLoadingList } = useSWR(
        USER ? `${apiUrl}/api/order/Admin_viewDetail/${DataUser?.data?._id}` : null,
        fetcher
    );

    // API 2: Lấy chi tiết các sản phẩm trong đơn hàng (Dữ liệu bạn vừa gửi)
    const { data: dataListOrderItem, isLoading: isLoadingDetail } = useSWR(
        id_Item === '#' ? null : `${apiUrl}/api/order/Admin_viewDetail_itemOrder/${id_Item}`,
        fetcher
    );


    const [dataUpdateUser, setDataUpdateUser] = useState({ name: '', phone: '', deliveryAddress: '' });

    useEffect(() => {
        if (DataUser?.data) {
            setDataUpdateUser({
                name: DataUser.data.name || '',
                phone: DataUser.data.phone || '',
                deliveryAddress: DataUser.data.deliveryAddress || '',
            });
        }
    }, [DataUser]);

    const handleUpdateUser = async () => {
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/update-user/${DataUser.data._id}`, dataUpdateUser, "PUT");
        setLoading(false);
        if (result.status) {
            seloadAPI__USER();
            ShowToast(result.mesage_vn, ToastType.success);
            setActiveTab("profile");
        } else {
            ShowToast(result.mesage_vn, ToastType.info);
        }
    };

    if (!USER) return navigate('/login');
    if (loading) return <UiLoadingComponent />;

    const renderMainContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Hồ sơ của tôi</h2>
                            <p>Thông tin chi tiết tài khoản cá nhân</p>
                        </div>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoBox}><label>Họ và tên</label><div className={styles.infoValue}>{DataUser?.data?.name}</div></div>
                            <div className={styles.infoBox}><label>Email</label><div className={styles.infoValue}>{DataUser?.data?.email}</div></div>
                            <div className={styles.infoBox}><label>Số điện thoại</label><div className={styles.infoValue}>{DataUser?.data?.phone}</div></div>
                            <div className={styles.infoBox}><label>Địa chỉ</label><div className={styles.infoValue}>{DataUser?.data?.deliveryAddress}</div></div>
                        </div>
                        <div className={styles.actionArea}>
                            <button className={styles.primaryBtn} onClick={() => setActiveTab("edit-profile")}>
                                <FaUserEdit /> Chỉnh sửa hồ sơ
                            </button>
                        </div>
                    </div>
                );

            case "edit-profile":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Cập nhật thông tin</h2>
                            <p>Thay đổi thông tin cá nhân của bạn</p>
                        </div>
                        <div className={styles.editGrid}>
                            <div className={styles.infoBox}>
                                <label>Họ và tên</label>
                                <input type="text" className={styles.infoInput} value={dataUpdateUser.name}
                                    onChange={(e) => setDataUpdateUser({ ...dataUpdateUser, name: e.target.value })} />
                            </div>
                            <div className={styles.infoBox}>
                                <label>Số điện thoại</label>
                                <input type="text" className={styles.infoInput} value={dataUpdateUser.phone}
                                    onChange={(e) => setDataUpdateUser({ ...dataUpdateUser, phone: e.target.value })} />
                            </div>
                            <div className={`${styles.infoBox} ${styles.infoBoxFull}`}>
                                <label>Địa chỉ giao hàng</label>
                                <textarea className={styles.infoTextarea} value={dataUpdateUser.deliveryAddress}
                                    onChange={(e) => setDataUpdateUser({ ...dataUpdateUser, deliveryAddress: e.target.value })} />
                            </div>
                        </div>
                        <div className={styles.actionAreaGroup}>
                            <button onClick={handleUpdateUser} className={styles.saveBtn}><FaCheckCircle /> Lưu cập nhật</button>
                            <button className={styles.cancelBtn} onClick={() => setActiveTab("profile")}><FaTimesCircle /> Hủy bỏ</button>
                        </div>
                    </div>
                );


            case "orders":

                if (id_Item !== '#') {
                    return (
                        <div className={styles.tabContent}>
                            <div className={styles.detailHeader}>
                                <div
                                    className={styles.backLink}
                                    onClick={() => setidItem('#')}
                                >
                                    <FaChevronLeft className={styles.backIcon} />
                                    <span>Quay lại danh sách</span>
                                </div>

                                <h3>Chi tiết đơn hàng</h3>
                            </div>

                            {isLoadingDetail ? <UiLoadingComponent /> : (
                                <div className={styles.orderDetailWrapper}>

                                    {dataListOrderItem?.data?.map((item) => (
                                        <div key={item._id} className={styles.productCard}>
                                            <img
                                                src={item.id_product.img.secure_url}
                                                alt={item.id_product.name}
                                                className={styles.productImage}
                                            />

                                            <div className={styles.productContent}>
                                                <h4>{item.id_product.name}</h4>
                                                <p className={styles.variant}>
                                                    Phân loại: {item.variant || "Mặc định"}
                                                </p>
                                                <div className={styles.qtyPrice}>
                                                    <span>x{item.quantity}</span>
                                                    <span className={styles.price}>
                                                        {item.priceAtPurchase.toLocaleString()}₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className={styles.orderSummary}>
                                        <div className={styles.summaryRow}>
                                            <span>Tổng thanh toán</span>
                                            <span className={styles.totalPrice}>
                                                {dataListOrderItem?.data
                                                    ?.reduce((acc, curr) =>
                                                        acc + (curr.priceAtPurchase * curr.quantity), 0
                                                    )
                                                    .toLocaleString()}₫
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Đơn hàng của bạn</h2>
                            <p>Theo dõi trạng thái và chi tiết đơn mua</p>
                        </div>

                        {isLoadingList ? <UiLoadingComponent /> : (

                            dataListOrder?.data?.length > 0 ? (

                                <div className={styles.orderList}>
                                    {dataListOrder.data.map((order) => (
                                        <div
                                            key={order._id}
                                            className={styles.orderCard}
                                            onClick={() => setidItem(order._id)}
                                        >

                                            <div className={styles.orderTop}>
                                                <div className={styles.orderCode}>
                                                    Mã đơn: {order._id}
                                                </div>

                                                <div className={styles.statusBadge}>
                                                    {order.statusOrder}
                                                </div>
                                            </div>

                                            <div className={styles.orderMiddle}>
                                                <FaTruck className={styles.truckIcon} />
                                                <span>{order.shippingInfo.address}</span>
                                            </div>

                                            <div className={styles.orderBottom}>
                                                <div className={styles.totalLabel}>
                                                    Tổng thanh toán
                                                </div>
                                                <div className={styles.totalMoney}>
                                                    {order.totalPrice.toLocaleString()}₫
                                                </div>
                                            </div>

                                        </div>

                                    ))}
                                </div>

                            ) : (

                                <div className={styles.emptyState}>
                                    <FaShoppingBag size={70} />
                                    <p>Bạn chưa có đơn hàng nào</p>
                                    <Link to="/" className={styles.shopBtn}>
                                        Mua sắm ngay
                                    </Link>
                                </div>

                            )
                        )}
                    </div>
                );


            case "password":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Bảo mật tài khoản</h2>
                            <p>Thay đổi mật khẩu định kỳ để tăng tính bảo mật</p>
                        </div>
                        <div className={styles.passwordBox}>
                            <div className={styles.inputGroup}>
                                <label>Mật khẩu mới</label>
                                <input type="password" className={styles.passwordInput} placeholder="Nhập mật khẩu mới" />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Xác nhận mật khẩu</label>
                                <input type="password" className={styles.passwordInput} placeholder="Nhập lại mật khẩu" />
                            </div>
                            <button className={styles.passwordSubmitBtn}><FaLock /> Cập nhật mật khẩu mới</button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className={styles.wrapper}>
            {isLoading_User ? <UiLoadingComponent /> :
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.avatarContainer}>
                                <img src={`${apiUrl}/${DataUser?.data?.image}`} alt="Avatar" className={styles.userImg} />
                            </div>
                            <h3>{DataUser?.data?.name}</h3>
                            <p className={styles.userEmail}>{DataUser?.data?.email}</p>
                        </div>
                        <nav className={styles.navMenu}>
                            <div className={`${styles.navItem} ${activeTab === "profile" || activeTab === "edit-profile" ? styles.active : ""}`}
                                onClick={() => setActiveTab("profile")}>
                                <FaUserCircle /> Hồ sơ cá nhân
                            </div>

                            <div className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
                                onClick={() => { setActiveTab("orders"); setidItem('#'); }}>
                                <FaClipboardList /> Quản lý đơn hàng
                            </div>

                            <Link to='/orderLookup' className={styles.navItem}><FaSearchLocation /> Tra cứu đơn hàng</Link>
                            <hr className={styles.divider} />

                            <div className={`${styles.navItem} ${activeTab === "password" ? styles.active : ""}`}
                                onClick={() => setActiveTab("password")}>
                                <FaLock /> Đổi mật khẩu
                            </div>

                            <button className={`${styles.navItem} ${styles.logout}`} onClick={() => signOutUser()}>
                                <FaSignOutAlt /> Đăng xuất
                            </button>
                        </nav>
                    </aside>
                    <main className={styles.mainContent}>{renderMainContent()}</main>
                </div>
            }
        </div>
    );
}