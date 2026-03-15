import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./AdminUpdate.module.css";
import { FiUser, FiPhone, FiMail, FiMapPin, FiClock, FiGlobe, FiTruck, FiInfo, FiSave, FiXCircle } from "react-icons/fi";
import { SiTiktok, SiShopee } from "react-icons/si";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { useNavigate } from "react-router-dom";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import { UpdateSevicesYES__JSON__ADMIN } from "../../../../services/updateApi";
import { ShowToast, ToastType } from "../../../../utils/toast";



export default function AdminUpdateComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        nameLogo: "", contact: "", phone: "", nameAdmin: "",
        address: "", email: "", slogan: "", pageFB: "",
        chotot: "", ticktock: "", shopee: "",
        workingHours: "", partnerDelivery: ""
    });

    useEffect(() => {
        const fetchCurrentData = async () => {
            if (!USER?._id) return;
            setIsLoading(true);
            try {
                const url = `${apiUrl}/api/infomation-Admin/admin-view/6999b03b8ebf1e4f0dd57d18`;
                const response = await GetAPI_Authorization(url);
                if (response?.data?.length > 0) {
                    const d = response.data[0];
                    setFormData({
                        nameLogo: d.nameLogo || "",
                        contact: d.contact || "",
                        phone: d.phone || "",
                        nameAdmin: d.nameAdmin || "",
                        address: d.address || "",
                        email: d.email || "",
                        slogan: d.slogan || "",
                        pageFB: d.pageFB || "",
                        chotot: d.chotot || "",
                        ticktock: d.ticktock || "",
                        shopee: d.shopee || "",
                        workingHours: d.workingHours || "",
                        partnerDelivery: d.partnerDelivery || ""
                    });
                }
            } catch (err) {
                console.error("Lỗi load dữ liệu:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentData();
    }, [apiUrl, USER?._id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const infoId = "699d867e387ccf509fb9e2a0";
            const adminId = "6999b03b8ebf1e4f0dd57d18";
            const url = `${apiUrl}/api/infomation-Admin/update/${infoId}/${adminId}`;
            const response = await UpdateSevicesYES__JSON__ADMIN(url, formData, 'PUT');

            if (response?.status) {
                ShowToast(response.mesage_vn || "Cập nhật thành công", ToastType.success);
                navigate(-1);
            }
        } catch (err) {
            ShowToast(err.mesage_vn || "Lỗi cập nhật", ToastType.error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.adminLayout}>
            <AdminHeader />
            <div className={styles.contentWrapper}>
                <AdminMenu />
                <main className={styles.mainContent}>
                    {isLoading ? <UiLoadingComponent /> : (
                        <form onSubmit={handleSubmit} className={styles.container}>
                            {/* Sticky Header của Form */}
                            <header className={styles.formHeader}>
                                <div className={styles.headerTitle}>
                                    <h1>Cấu hình hệ thống</h1>
                                    <p>Quản lý thông tin thương hiệu và các kết nối mạng xã hội</p>
                                </div>
                                <div className={styles.headerActions}>
                                    <button type="button" className={styles.btnCancel} onClick={() => navigate(-1)}>
                                        <FiXCircle /> Hủy bỏ
                                    </button>
                                    <button type="submit" className={styles.btnSave} disabled={isSaving}>
                                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                                    </button>
                                </div>
                            </header>

                            <div className={styles.card}>
                                {/* Nhóm 1: Thông tin cơ bản */}
                                <section className={styles.formSection}>
                                    <h2 className={styles.sectionHeading}>Thông tin thương hiệu</h2>
                                    <div className={styles.grid}>
                                        <div className={styles.inputGroup}>
                                            <label><FiInfo /> Tên Logo / Thương hiệu</label>
                                            <input name="nameLogo" value={formData.nameLogo} onChange={handleChange} placeholder="Ví dụ: Z Mobile" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><FiUser /> Tên Quản trị viên</label>
                                            <input name="nameAdmin" value={formData.nameAdmin} onChange={handleChange} placeholder="Nhập tên quản trị" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><FiPhone /> Số điện thoại</label>
                                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="090x xxx xxx" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><FiMail /> Email hệ thống</label>
                                            <input name="email" value={formData.email} onChange={handleChange} placeholder="admin@domain.com" />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                            <label><FiMapPin /> Địa chỉ trụ sở</label>
                                            <input name="address" value={formData.address} onChange={handleChange} />
                                        </div>
                                    </div>
                                </section>

                                {/* Nhóm 2: Vận hành */}
                                <section className={styles.formSection}>
                                    <h2 className={styles.sectionHeading}>Vận hành & Giao nhận</h2>
                                    <div className={styles.grid}>
                                        <div className={styles.inputGroup}>
                                            <label><FiClock /> Giờ làm việc</label>
                                            <input name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="8:00 - 22:00" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><FiTruck /> Đối tác vận chuyển</label>
                                            <input name="partnerDelivery" value={formData.partnerDelivery} onChange={handleChange} placeholder="GHTK, Viettel Post..." />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                            <label><FiInfo /> Câu khẩu hiệu (Slogan)</label>
                                            <input name="slogan" value={formData.slogan} onChange={handleChange} placeholder="Uy tín tạo niềm tin" />
                                        </div>
                                    </div>
                                </section>

                                {/* Nhóm 3: Kết nối Social */}
                                <section className={styles.formSection}>
                                    <h2 className={styles.sectionHeading}>Liên kết sàn TMĐT & MXH</h2>
                                    <div className={styles.grid}>
                                        <div className={styles.inputGroup}>
                                            <label><FiGlobe /> Fanpage Facebook</label>
                                            <input name="pageFB" value={formData.pageFB} onChange={handleChange} />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><SiTiktok /> TikTok Shop Link</label>
                                            <input name="ticktock" value={formData.ticktock} onChange={handleChange} />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><SiShopee /> Shopee Mall Link</label>
                                            <input name="shopee" value={formData.shopee} onChange={handleChange} />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><FiInfo /> Chợ tốt Link</label>
                                            <input name="chotot" value={formData.chotot} onChange={handleChange} />
                                        </div>
                                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                            <label><FiInfo /> Ghi chú hỗ trợ</label>
                                            <textarea name="contact" rows="4" value={formData.contact} onChange={handleChange} className={styles.textarea} placeholder="Thông tin hỗ trợ khách hàng..." />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </form>
                    )}
                </main>
            </div>
        </div>
    );
}