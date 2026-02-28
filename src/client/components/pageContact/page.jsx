import { useContext } from "react";
import styles from "./contact.module.css";
import { ThemeContext } from "../../../context/useThemeContext";

export default function ProjectContacts() {
    const { DataAdmin, isLoading_Admin } = useContext(ThemeContext);
    if (isLoading_Admin) return <div className={styles.loading}>Đang tải...</div>;
    const admin = DataAdmin?.data[0];


    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>

                <h1 className={styles.title}>Liên Hệ Với Chúng Tôi</h1>
                <p className={styles.subtitle}>
                    {admin?.nameLogo || "Z Mobile"} luôn sẵn sàng hỗ trợ và tư vấn cho bạn.
                </p>

                <div className={styles.content}>
                    <div className={styles.info}>
                        <h3>Thông tin liên hệ</h3>
                        <p><strong>Hotline:</strong> {admin?.phone || "Đang cập nhật"}</p>
                        <p><strong>Email:</strong> {admin?.email || "Đang cập nhật"}</p>
                        <p><strong>Địa chỉ CS1:</strong> {admin?.address || "Đang cập nhật"}</p>
                        <p><strong>Địa chỉ CS2:</strong> 200 Trần Thị Hè Hiệp Thành Q12 HCM</p>
                        <p>
                            Chúng tôi hoạt động: <strong>{admin?.workingHours}</strong>
                        </p>
                    </div>

                    {/* Form bên phải */}
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Họ và tên" required />
                        <input type="email" placeholder="Email" required />
                        <input type="tel" placeholder="Số điện thoại" required />
                        <textarea placeholder="Nội dung liên hệ" rows="5" required />
                        <button type="submit">Gửi Tin Nhắn</button>
                    </form>

                </div>
            </div>
        </div>
    );
}