import React from 'react';
import styles from './Recruitment.module.css';
import {
    IoWalletOutline,
    IoCubeOutline,
    IoCalendarClearOutline,
    IoLogoFacebook,
    IoPeopleOutline,
    IoSyncOutline,
    IoCallOutline,
    IoPersonCircleOutline,
    IoDocumentTextOutline
} from "react-icons/io5";

export default function RecruitmentComponent() {
    const benefits = [
        { icon: <IoWalletOutline />, title: "Hoa hồng cao", desc: "Mức chiết khấu hấp dẫn trên mỗi đơn hàng." },
        { icon: <IoCubeOutline />, title: "Sản phẩm ổn định", desc: "Nguồn hàng dồi dào, mẫu mã hot trend." },
        { icon: <IoCalendarClearOutline />, title: "Độ tuổi trên 14", desc: "Phù hợp cho học sinh, sinh viên, mẹ bỉm." },
        { icon: <IoLogoFacebook />, title: "Kỹ năng Fb", desc: "Biết sử dụng Facebook để đăng bài bán hàng." },
        { icon: <IoPeopleOutline />, title: "Số lượng: 20", desc: "Ưu tiên những bạn đăng ký sớm nhất." },
        { icon: <IoSyncOutline />, title: "Cập nhật liên tục", desc: "Sản phẩm mới được update mỗi ngày." },
    ];

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>CHƯƠNG TRÌNH TUYỂN CỘNG TÁC VIÊN</h1>
                <p className={styles.subTitle}>
                    Hợp tác cùng <strong>Z Mobile</strong> — Giải pháp kinh doanh không vốn, lợi nhuận bền vững.
                </p>

                <div style={{ marginTop: 30 }}>
                    <div className={styles.badge}><a href="#">LH 0369 594 026</a></div>
                    <div className={styles.badge}><a href="#">Xem Mô tả công việc</a></div>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                {/* LEFT: Benefits & Info */}
                <section className={styles.benefitsSection}>
                    <h2 className={styles.sectionTitle}>Quyền Lợi & Điều Kiện</h2>
                    <div className={styles.grid}>
                        {benefits.map((item, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.iconBox}>{item.icon}</div>
                                <div>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <p className={styles.cardDesc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>



                </section>

                {/* RIGHT: Registration Form */}
                <section className={styles.formSection}>
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Ứng Tuyển Ngay</h2>
                        <p className={styles.formSub}>Vui lòng điền chính xác thông tin để chúng tôi liên hệ.</p>


                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <label>Họ và tên</label>
                                <input type="text" placeholder="Nguyễn Văn A" required />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label>Giới tính</label>
                                    <select>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Tuổi</label>
                                    <input type="number" placeholder="18" min="14" required />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Thành phố</label>
                                <input type="text" placeholder="Hà Nội, TP.HCM..." required />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Số điện thoại (Zalo)</label>
                                <input type="tel" placeholder="0369 xxx xxx" required />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                GỬI HỒ SƠ ỨNG TUYỂN
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}