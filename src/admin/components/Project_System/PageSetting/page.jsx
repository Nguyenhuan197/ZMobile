import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./AdminProfile.module.css";
import { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiShoppingBag, FiTruck, FiUser, FiInfo, FiHash } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { Link } from "react-router-dom";
import { UpdateSevicesNo__JSON__ADMIN } from "../../../../services/updateApi";
import { ShowToast, ToastType } from "../../../../utils/toast";



export default function AdminProfileComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const [adminInfo, setAdminInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const fetchAdminInfo = async () => {
        if (!USER?._id) return;
        setIsLoading(true);
        try {
            const url = `${apiUrl}/api/infomation-Admin/admin-view/6999b03b8ebf1e4f0dd57d18`;
            const response = await GetAPI_Authorization(url);
            if (response?.data?.length > 0) {
                setAdminInfo(response.data[0]);
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminInfo();
    }, [USER?._id]);


    const toggleStatus = async (status) => {
        setIsLoading(true);
        const statusCheck = !status;

        try {
            const response = await UpdateSevicesNo__JSON__ADMIN(
                `${apiUrl}/api/infomation-Admin/handle-state-transition/699d867e387ccf509fb9e2a0/6999b03b8ebf1e4f0dd57d18?status=${statusCheck}`,
                'PUT'
            );

            if (response.status) {
                ShowToast(response.mesage_vn || "Cập nhật thành công", ToastType.success);
                fetchAdminInfo();
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />
                <main className={styles.mainContent}>
                    <div className={styles.headerPage}>
                        <h1>Hồ sơ hệ thống</h1>
                    </div>

                    {isLoading ? <UiLoadingComponent /> : adminInfo && (
                        <div className={styles.profileCard}>
                            {/* Banner Section */}
                            <div className={styles.cardBanner}>
                                <div className={styles.brandMain}>
                                    <h2>{adminInfo.nameLogo}</h2>
                                    <p>"{adminInfo.slogan}"</p>
                                </div>
                                <Link to='/admin-zmobile-2026/system/settings/update' className={styles.btnEdit}>
                                    Chỉnh sửa hệ thống
                                </Link>
                            </div>

                            <div className={styles.gridContent}>
                                {/* Nhóm 1: Thông tin quản trị */}
                                <div className={styles.sectionTitle}>Thông tin định danh</div>
                                <div className={styles.infoBox}>
                                    <label><FiUser /> Quản trị viên</label>
                                    <span>{adminInfo.nameAdmin}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiInfo /> Câu khẩu hiệu (Slogan)</label>
                                    <span>{adminInfo.slogan}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiHash /> ID Hệ thống</label>
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{adminInfo._id}</span>
                                </div>

                                {/* Nhóm 2: Liên hệ & Vận hành */}
                                <div className={styles.sectionTitle}>Liên hệ & Vận hành</div>
                                <div className={styles.infoBox}>
                                    <label><FiPhone /> Hotline</label>
                                    <span>{adminInfo.phone}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiMail /> Email</label>
                                    <span>{adminInfo.email}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiClock /> Giờ làm việc</label>
                                    <span>{adminInfo.workingHours}</span>
                                </div>
                                <div className={`${styles.infoBox} ${styles.fullWidth}`} style={{ gridColumn: 'span 3' }}>
                                    <label><FiMapPin /> Địa chỉ trụ sở</label>
                                    <span>{adminInfo.address}</span>
                                </div>

                                {/* Nhóm 3: Kênh truyền thông & Bán hàng */}
                                <div className={styles.sectionTitle}>Kênh truyền thông & Đối tác</div>
                                <div className={styles.infoBox}>
                                    <label><FiFacebook color="#1877F2" /> Facebook Page</label>
                                    <a href={adminInfo.pageFB} target="_blank" rel="noreferrer">Xem trang Fanpage</a>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><SiTiktok /> TikTok Shop</label>
                                    <a href={adminInfo.ticktock} target="_blank" rel="noreferrer">@zmobile.vn</a>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiShoppingBag color="#EE4D2D" /> Shopee Mall</label>
                                    <a href={adminInfo.shopee} target="_blank" rel="noreferrer">Ghé thăm gian hàng</a>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiUser color="#ff8200" /> Chợ Tốt</label>
                                    <span>{adminInfo.chotot}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiTruck color="#ed1c24" /> Đối tác vận chuyển</label>
                                    <span>{adminInfo.partnerDelivery}</span>
                                </div>
                                <div className={styles.infoBox}>
                                    <label><FiInfo /> Ghi chú hỗ trợ</label>
                                    <span>{adminInfo.contact}</span>
                                </div>
                            </div>

                            {/* Footer với Nút gạt trạng thái */}
                            <div className={styles.statusFooter}>
                                <div className={styles.toggleWrapper}>
                                    <div>
                                        <strong style={{ display: 'block', color: '#1e293b' }}>Trạng thái tài khoản</strong>
                                        <small style={{ color: '#64748b' }}>Tắt để tạm ngưng mọi giao dịch trên hệ thống</small>
                                    </div>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={adminInfo.accountStatus}
                                            onChange={() => toggleStatus(adminInfo.accountStatus)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>

                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    background: adminInfo.accountStatus ? '#dcfce7' : '#fee2e2',
                                    color: adminInfo.accountStatus ? '#166534' : '#991b1b'
                                }}>
                                    {adminInfo.accountStatus ? "ĐANG HOẠT ĐỘNG" : "ĐANG TẠM KHÓA"}
                                </span>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}