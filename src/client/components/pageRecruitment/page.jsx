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
import { Helmet } from 'react-helmet-async';



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



    const shareProduct = (platform) => {
        const currentUrl = window.location.href;
        const shareTitle = "Cơ hội việc làm hấp dẫn tại Z Mobile!";
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                break;
            case "messenger":
                // Messenger yêu cầu app_id nếu dùng link trực tiếp, 
                // đơn giản nhất là dùng facebook sharer hoặc send link
                shareUrl = `fb-messenger://share/?link=${encodeURIComponent(currentUrl)}`;
                // Nếu trên web, dùng link chuyển hướng
                if (!/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                    shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(currentUrl)}`;
                }
                break;
            case "zalo":
                shareUrl = `https://sp.zalo.me/share_inline?url=${encodeURIComponent(currentUrl)}`;
                break;
            case "copy":
                navigator.clipboard.writeText(currentUrl);
                ShowToast("Đã sao chép liên kết tuyển dụng!", ToastType.success);
                return;
            default:
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
        }
    };


    return (
        <div className={styles.container}>

            <Helmet>
                <title>Tuyển Cộng Tác Viên Kinh Doanh | Z Mobile</title>
                <meta name="description" content="Kinh doanh không vốn cùng Z Mobile. Hoa hồng cao, nguồn hàng ổn định, hỗ trợ cập nhật hàng ngày." />

                {/* Facebook & Zalo (Open Graph) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="TUYỂN CỘNG TÁC VIÊN KINH DOANH - Z MOBILE" />
                <meta property="og:description" content="Cơ hội thu nhập hấp dẫn, không cần vốn, không ôm hàng. Đăng ký ngay!" />
                {/* Thay link ảnh dưới đây bằng ảnh banner tuyển dụng của bạn */}
                <meta property="og:image" content="https://yourdomain.com/path-to-your-recruitment-banner.jpg" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Zalo Specific */}
                <meta property="zalo:title" content="TUYỂN CỘNG TÁC VIÊN KINH DOANH - Z MOBILE" />
                <meta property="zalo:description" content="Kinh doanh 0đ vốn, thu nhập bền vững cùng Z Mobile." />
            </Helmet>


            <header className={styles.header}>
                <div onClick={() => shareProduct('facebook')} className={styles.topBadge}>Chia sẻ công việc</div>
                <h1 className={styles.mainTitle}>TUYỂN CỘNG TÁC VIÊN</h1>
                <p className={styles.subTitle}>
                    Kinh doanh không vốn cùng <strong>Z Mobile</strong>
                    <p> Lợi nhuận bền vững.</p>
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