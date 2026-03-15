import React, { useState } from 'react';
import styles from './Recruitment.module.css';
import {
    IoWalletOutline,
    IoCubeOutline,
    IoCalendarClearOutline,
    IoLogoFacebook,
    IoPeopleOutline,
    IoSyncOutline,
    IoBriefcaseOutline,
    IoRocketOutline,
    IoCheckmarkCircleOutline
} from "react-icons/io5";
import { UpdateSevices } from '../../../services/updateApi';
import { ShowToast, ToastType } from '../../../utils/toast';



export default function RecruitmentComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [formData, setFormData] = useState({ name: '', sex: 'Nam', age: '', phone: '', city: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const benefits = [
        { icon: <IoWalletOutline />, title: "Hoa hồng cao", desc: "Mức chiết khấu hấp dẫn trên mỗi đơn hàng." },
        { icon: <IoCubeOutline />, title: "Sản phẩm ổn định", desc: "Nguồn hàng dồi dào, mẫu mã hot trend." },
        { icon: <IoCalendarClearOutline />, title: "Độ tuổi trên 14", desc: "Phù hợp cho học sinh, sinh viên, mẹ bỉm." },
        { icon: <IoLogoFacebook />, title: "Kỹ năng Fb", desc: "Biết sử dụng Facebook để đăng bài bán hàng." },
        { icon: <IoPeopleOutline />, title: "Số lượng: 20", desc: "Ưu tiên những bạn đăng ký sớm nhất." },
        { icon: <IoSyncOutline />, title: "Cập nhật liên tục", desc: "Sản phẩm mới được update mỗi ngày." },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const result = await UpdateSevices(`${apiUrl}/api/recruitment/add-new`, formData, "POST");
            if (result.status) {
                ShowToast(result.mesage_vn, ToastType.success);
                setFormData({ name: '', sex: 'Nam', age: '', phone: '', city: '' });
                setStatus({ type: 'success', message: result.mesage_vn });
            } else {
                ShowToast(result.mesage_vn, ToastType.error);
                setStatus({ type: 'error', message: result.mesage_vn });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.topBadge}>Join Our Team</div>
                <h1 className={styles.mainTitle}>TUYỂN CỘNG TÁC VIÊN</h1>
                <p className={styles.subTitle}>
                    Kinh doanh không vốn cùng <strong>Z Mobile</strong> — Lợi nhuận bền vững.
                </p>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.leftCol}>
                    <section className={styles.jobDescription}>
                        <div className={styles.sectionHeader}>
                            <IoBriefcaseOutline className={styles.sectionIcon} />
                            <h2 className={styles.sectionTitle}>Mô tả công việc</h2>
                        </div>

                        <div className={styles.descCard}>
                            <p className={styles.introText}>
                                Kinh doanh online đa nền tảng với danh mục sản phẩm phong phú từ hệ sinh thái của <strong>Z Mobile</strong>.
                            </p>
                            <ul className={styles.descList}>
                                <li>
                                    <IoCheckmarkCircleOutline className={styles.checkIcon} />
                                    <div><strong>Tự do tài chính:</strong> Thu nhập theo năng lực, không áp KPI doanh số.</div>
                                </li>
                                <li>
                                    <IoCheckmarkCircleOutline className={styles.checkIcon} />
                                    <div><strong>Linh hoạt:</strong> Tự chủ thời gian, làm việc mọi lúc mọi nơi.</div>
                                </li>
                                <li>
                                    <IoCheckmarkCircleOutline className={styles.checkIcon} />
                                    <div><strong>Hỗ trợ:</strong> Hệ thống cập nhật hàng hóa và hoa hồng tự động hàng ngày.</div>
                                </li>
                                <li>
                                    <IoCheckmarkCircleOutline className={styles.checkIcon} />
                                    <div><strong>0đ Vốn:</strong> Không rủi ro, không ôm hàng, không phí nhập kho.</div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className={styles.benefitsSection}>
                        <div className={styles.sectionHeader}>
                            <IoRocketOutline className={styles.sectionIcon} />
                            <h2 className={styles.sectionTitle}>Quyền Lợi</h2>
                        </div>
                        <div className={styles.grid}>
                            {benefits.map((item, index) => (
                                <div key={index} className={styles.card}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        <p className={styles.cardDesc}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className={styles.formSection}>
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Đăng Ký Ứng Tuyển</h2>
                        <p className={styles.formSub}>Khởi đầu sự nghiệp kinh doanh chỉ với 30 giây.</p>

                        {status && (
                            <div className={`${styles.alert} ${status.type === 'success' ? styles.success : styles.error}`}>
                                {status.message}
                            </div>
                        )}

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label>Họ và tên</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nguyễn Văn A" required />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label>Giới tính</label>
                                    <select name="sex" value={formData.sex} onChange={handleChange}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Tuổi</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="18" min="14" required />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Thành phố</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Hà Nội, TP.HCM..." required />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Số điện thoại (Zalo)</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0369 xxx xxx" required />
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'ĐANG XỬ LÝ...' : 'GỬI ĐĂNG KÝ NGAY'}
                            </button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    );
}